export const CHAT_GREETING = 'Welcome to Target Roofing! How can we help with your roof today?'

export const PHONE_OPTION = 'Prefer to speak with our team directly? Call Target Roofing at [239-332-5707](tel:+12393325707).'

const PHONE_LINK = '[239-332-5707](tel:+12393325707)'
const PHONE_NUMBER = /(?:\+?1[\s().-]*)?\(?239\)?[\s().-]*332[\s().-]*5707/i
const PHONE_NUMBER_GLOBAL = /(?:\+?1[\s().-]*)?\(?239\)?[\s().-]*332[\s().-]*5707/g
const TARGET_TEL = /tel:\+?1?239[\s().-]*332[\s().-]*5707/i
const TARGET_TEL_GLOBAL = /tel:\+?1?239[\s().-]*332[\s().-]*5707/gi
const CALL_LANGUAGE = /\b(?:call|phone|reach|speak|talk)\b/i

function normalizePhoneLinks(text: string): string {
  const links: string[] = []
  let protectedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label: string, href: string) => {
    links.push(PHONE_NUMBER.test(label) || TARGET_TEL.test(href) ? PHONE_LINK : match)
    return `\u0000${links.length - 1}\u0000`
  })
  protectedText = protectedText.replace(TARGET_TEL_GLOBAL, () => {
    links.push(PHONE_LINK)
    return `\u0000${links.length - 1}\u0000`
  })
  return protectedText
    .replace(PHONE_NUMBER_GLOBAL, PHONE_LINK)
    .replace(/\u0000(\d+)\u0000/g, (_, index: string) => links[Number(index)])
}

export function withEarlyPhoneOption(reply: string, previousSubstantiveReplies: number): string {
  const answer = reply.trim()
  if (!answer) return answer
  if (previousSubstantiveReplies >= 2) return normalizePhoneLinks(answer)

  // If the model already used our exact footer, place it after the answer once.
  if (answer.includes(PHONE_OPTION)) {
    const body = answer.replace(PHONE_OPTION, '').trim()
    return body ? `${normalizePhoneLinks(body)}\n\n${PHONE_OPTION}` : PHONE_OPTION
  }

  const body: string[] = []
  const callOptions: string[] = []
  for (const paragraph of answer.split(/\n\s*\n/)) {
    const sentences = paragraph.trim().split(/(?<=[.!?])\s+(?=[A-Z(])/)
    const keep: string[] = []
    for (const sentence of sentences) {
      if ((PHONE_NUMBER.test(sentence) || TARGET_TEL.test(sentence)) && CALL_LANGUAGE.test(sentence)) {
        // Keep the model's wording, but move its call option into a separate final paragraph.
        const preference = keep.at(-1)
        if (preference && /\bprefer\b.*\b(?:speak|talk|call)\b/i.test(preference)) {
          keep.pop()
          callOptions.push(`${preference} ${sentence}`)
        } else {
          callOptions.push(sentence)
        }
      } else {
        keep.push(sentence)
      }
    }
    if (keep.length) body.push(keep.join(' ').trim())
  }

  const mainAnswer = normalizePhoneLinks(body.join('\n\n'))
  const footer = callOptions.length ? normalizePhoneLinks(callOptions.join(' ')) : PHONE_OPTION
  return mainAnswer ? `${mainAnswer}\n\n${footer}` : footer
}
