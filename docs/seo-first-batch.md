# SEO first batch

Based on company main `329f192f5d52c4f26c1b8b869c4a3c712cc26a68`, inspected October 7, 2026. Work is prepared for review; none of these checklist tasks is marked complete before production checks.

- SEO 1: central replacement page with a real portfolio image, roof systems, repair comparison, occupied-property planning, county links and the existing saved-lead form. Menu, footer, services, repair, portfolio and local pages link to it.
- SEO 2: server-rendered, numbered archive. All 77 retained articles are linked across seven pages; archive pages have self canonicals and sitemap entries. `/target-news/page/1` redirects to `/target-news`; invalid page 8 is 404. No article URL is removed.
- SEO 3: three summary entries rewritten as dated, explicitly new guides: commercial contractor selection, roof checkups and four rainy-season preparation steps. This is not recovery of historical originals. 62 entries remain summaries; recover original WordPress export or archived HTML, then review historic clicks/referring links before merging or removing URLs. Historical company news, awards and the code-rule explainer need evidence rather than invented expansion.
- SEO 4: commercial/HOA repair diagnosis, compatible systems, occupied-building coordination, and links to maintenance and replacement. Qualified the unverified response-time and blanket one-year repair warranty claims throughout the repair page, including its metadata and Service schema.
- SEO 5: distinct planning copy on each existing city hub and service route, with resources for Lee, Collier, Charlotte and Sarasota counties. No new offices, completed-project details or availability guarantees added. More city-specific project evidence remains a later improvement.
- Tracking 2: saved chat lead ID now reaches the widget for one conversion per saved row; first tagged attribution is preserved and stored with the chat request. Notification errors preserve a successful save with a call fallback. GA accepts labels rather than raw inquiry fields or referrer URLs. Phone clicks remain separate from saved inquiries.
- Tracking 1: intentionally deferred until company Analytics/Search Console account ownership is known. No property or account is created.

## Validation

Production build passes. 25 local behavior/security tests pass. An isolated combined release with PR 4 also builds and passes all 48 form, SEO and security tests. Read-only HTTP crawl verifies 77 article URLs return 200, all are linked from the seven archive pages, and canonicals/sitemap entries are correct. The second review also checks all 40 city/service routes, three updated guides, 77 internal link destinations and 34 anchors. The replacement form reaches Reroofing selection and rejects an empty submission without saving or sending. Earlier desktop and 390px mobile checks passed; the second review's browser check measured 736px with no horizontal overflow. Its viewport override did not apply, so it is not a fresh 390px check.

The repository already skips type validation during builds. Standalone `tsc --noEmit` still reports its existing `src/components/AnimateIn.tsx:79` TS2590 error. Targeted lint and `git diff --check` pass. These checks do not prove Google indexing, analytics receipt, live database behavior or actual mailbox delivery.

## Release and remaining evidence

The existing form-routing PR 4 is separate and must be reconciled before release. It changes Free Estimate contact links and notification delivery reporting. Preserve its estimate intent when combining the archive change; the archive CTA moved into `src/components/NewsArchive.tsx`. After combining, rerun build, form checks and this crawl against the release preview. Neither PR should silently replace the other's fixes.

The Oct 7 second review found and corrected the shared inline form's repair-only confirmation: it now confirms a saved request without promising a response time. If the server reports notification failure, it preserves the saved confirmation and provides the phone fallback. The archive estimate CTA now preserves PR 4's `/contact?service=free-estimate` intent. PR 4's news-page conflict must retain this PR's server wrapper and moved archive component.

This conflict was resolved and validated in an isolated local combined branch. The public PRs remain separate and unmerged. The combined release patch is a prepared review artifact, not a deployed change.

After deployment, repeat the crawl on the deployed URL and do uniquely labeled inquiries through contact, estimate, softwash, cleaning estimate, intake and completed chat. Check saved IDs and fields, expected recipient inbox, reply destination, failure handling and first staff response. Once Analytics access is recovered, confirm each saved test lead produces one generate_lead event and no phone click is counted as an answered call. No test inquiries were submitted to production during this SEO batch.

Before completing SEO 3, obtain original article content and historic URL value. Before completing the broader content tasks, confirm project details, warranty terms and emergency availability with the business. Casey's Google Business Profile task 6 remains his requested responsibility.

## Editorial resources

The local planning links point to current official resources, with address-specific requirements left to the responsible authority:

- [Lee County application and information center](https://www.leegov.com/dcd/appinfocenter)
- [Collier County roof application requirements](https://www.collier.gov/Business-Resources/Building-Permits-Construction/Application-Requirements/PRRF)
- [Charlotte County forms and checklists](https://www.charlottecountyfl.gov/departments/community-development/forms.stml)
- [Sarasota County building resources](https://www.scgov.net/government/planning-and-development-services/building) — search-index content was accessible; direct automated retrieval returned 403.
- [NRCA consumer information](https://nrca.net/roofing-guidelines/consumer-information) and [contractor selection](https://www.nrca.net/roofing-guidelines/selecting-a-contractor), linked as further reading.

Company project names/categories and the Willow Glen image are from the retained website repository; no system, scope, date, area or outcome is assigned to those projects.
