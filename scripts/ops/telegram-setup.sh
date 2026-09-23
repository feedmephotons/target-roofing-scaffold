#!/usr/bin/env bash
# One-time Telegram bot hookup for the Target admin assistant.
# Usage: scripts/ops/telegram-setup.sh <BOT_TOKEN_FROM_BOTFATHER>
# Reads TELEGRAM_WEBHOOK_SECRET / TELEGRAM_LINK_CODE from ~/.config/target-ops/secrets.env,
# stores the token in Vercel, redeploys production, and registers the webhook + commands.
set -euo pipefail
TOKEN="${1:?usage: telegram-setup.sh <bot token>}"
set -a; . "$HOME/.config/target-ops/secrets.env"; set +a
VT="${VERCEL_TOKEN:?add VERCEL_TOKEN to ~/.config/target-ops/secrets.env}"; TEAM=team_pDgXgDsHuhMVoCuP6bTLofwL; P=prj_JwtZMwFpgDY8Kec90ERWp4IzVsQf
SITE=https://targetroofing.vercel.app

ME=$(curl -s "https://api.telegram.org/bot$TOKEN/getMe")
USERNAME=$(echo "$ME" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['result']['username'] if d.get('ok') else '')")
[ -n "$USERNAME" ] || { echo "Token rejected by Telegram: $ME"; exit 1; }
echo "Bot: @$USERNAME"

setenv() { curl -s -X POST "https://api.vercel.com/v10/projects/$P/env?teamId=$TEAM&upsert=true" -H "Authorization: Bearer $VT" -H "Content-Type: application/json" \
  -d "{\"key\":\"$1\",\"value\":\"$2\",\"type\":\"$3\",\"target\":[\"production\",\"preview\"]}" >/dev/null && echo "env $1 set"; }
setenv TELEGRAM_BOT_TOKEN "$TOKEN" sensitive
setenv TELEGRAM_BOT_USERNAME "$USERNAME" plain
setenv NEXT_PUBLIC_TELEGRAM_BOT_USERNAME "$USERNAME" plain

# Redeploy the current production build so the new env is live.
DEP=$(curl -s "https://api.vercel.com/v6/deployments?projectId=$P&teamId=$TEAM&target=production&limit=1" -H "Authorization: Bearer $VT" | python3 -c "import sys,json;print(json.load(sys.stdin)['deployments'][0]['uid'])")
NEW=$(curl -s -X POST "https://api.vercel.com/v13/deployments?teamId=$TEAM&forceNew=1" -H "Authorization: Bearer $VT" -H "Content-Type: application/json" \
  -d "{\"name\":\"targetroofing\",\"deploymentId\":\"$DEP\",\"target\":\"production\"}" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id',''))")
echo "Redeploying ($NEW)..."
for i in $(seq 1 40); do
  S=$(curl -s "https://api.vercel.com/v13/deployments/$NEW?teamId=$TEAM" -H "Authorization: Bearer $VT" | python3 -c "import sys,json;print(json.load(sys.stdin).get('readyState',''))")
  [ "$S" = READY ] && break; [ "$S" = ERROR ] && { echo "deploy failed"; exit 1; }; sleep 10
done
echo "Deploy $S"

curl -s "https://api.telegram.org/bot$TOKEN/setWebhook" -H "Content-Type: application/json" \
  -d "{\"url\":\"$SITE/api/telegram/webhook\",\"secret_token\":\"$TELEGRAM_WEBHOOK_SECRET\",\"allowed_updates\":[\"message\",\"edited_message\"],\"drop_pending_updates\":true}"; echo
curl -s "https://api.telegram.org/bot$TOKEN/setMyCommands" -H "Content-Type: application/json" -d '{"commands":[
 {"command":"tasks","description":"My open tasks"},
 {"command":"iam","description":"Tell me who you are: /iam Casey"},
 {"command":"meeting","description":"Pull tasks from a transcript, voice note or recording"},
 {"command":"link","description":"Connect this chat (needs the code)"},
 {"command":"help","description":"What I can do"}]}'; echo
echo
echo "Done. In each chat (DM or group): /link $TELEGRAM_LINK_CODE   then each person: /iam <name>"
echo "For groups: in @BotFather run /setprivacy -> @$USERNAME -> Disable, or just mention @$USERNAME / reply to it."
