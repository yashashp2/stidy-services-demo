# Stidy Services — independent website concept

Live demo: https://yashashp2.github.io/stidy-services-demo/

Repository: https://github.com/yashashp2/stidy-services-demo

A complete React / TypeScript / Vite demo for an Ilford cleaning business, using Tailwind CSS, Lucide and Framer Motion. Six pages, responsive navigation, self-hosted images and fonts, and accessible demonstration forms.

**Independent website redesign concept — not affiliated with or endorsed by Stidy Services Ltd.** This is not the official business website. No invented reviews, ratings, insurance, guarantees, prices or company history are included.

## Local setup

Use Node.js 24 LTS and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To verify and preview production:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

The test command uses Node 24's native TypeScript support. `npm run build` also runs the TypeScript compiler. Commit `package-lock.json` and use `npm ci` for repeatable builds.

Run `npm run test:e2e` after building for Playwright browser checks (local Google Chrome required; install via `npx playwright install chrome` if missing). Tests start and stop their own production preview server, exercise navigation and both forms, check all six pages at 320/390/768/1024/1440px, detect console errors and broken images, and save visual-review screenshots under `test-results/`.

### Dependency audit note

At delivery, `npm audit --omit=dev` reports **zero vulnerabilities**. The full audit reports 10 high-severity entries sharing one cause: the build/lint tooling's transitive `picomatch` dependency. The [upstream advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) affects versions through 4.0.7 and lists no patched release as of 17 November 2026; `npm audit fix` does not resolve it. It is not shipped in the static browser bundle. Keep build inputs trusted, keep the local dev server on loopback, and update the tooling when an upstream patch becomes available.

## Edit the demo

- `src/data/business.ts`: public contacts, business information, service descriptions, task examples, benefits and proposed process.
- `src/pages/`: home, domestic, commercial, about, careers and contact page layouts and supporting editorial copy.
- `src/components/`: reusable layout, UI and demo form.
- `src/data/validation.ts`: shared validation, covered by `tests/validation.test.mjs`.
- `src/index.css`: responsive design system, typography, colours and reduced-motion support; Tailwind utilities are also available. Brand palette: white `#FFFFFF`, navy `#173B52`, teal `#298FA3`, mint `#71C8B8`, pale mint `#E8F5F1`. Small text links use a darker teal `#24768B` for contrast on white and pale mint.
- `src/assets/`: locally bundled fonts and SIL Open Font License notices.
- `public/images/`: locally hosted illustrative stock photography.

Routes use `HashRouter` (`/#/domestic`, `/#/contact`) so direct links and refreshes work on static hosting without rewrite rules. The home services link scrolls within the page. Unknown routes offer a working route home.

## Form behaviour and privacy boundary

Both forms validate in the browser, focus the first invalid field, associate error messages with inputs, and focus a clear demonstration confirmation after success. Successful submissions clear the values. Optional date and message fields can be blank. Telephone and UK postcode validation checks format, not whether a number or address exists.

**No form content is transmitted, emailed, logged or persisted.** Entries exist only in React's in-memory state until cleared, unmounted or refreshed. There is no backend, analytics, cookies, local storage or session storage. Please use sample details in presentations. Browsers and password managers can have their own autofill behaviour; `autocomplete="off"` is requested.

Phone, email, WhatsApp and source links are real external links using the reported public contact details. Clicking them opens the relevant app/site; the demo does not initiate a call or send a message itself. WhatsApp account availability is unverified.

For a real backend, replace the explicitly marked boundary in `DemoForm.tsx` with an authenticated or appropriately abuse-protected endpoint, server validation and explicit error/loading/success states. Confirm privacy wording, retention, lawful basis, recipient routing, security and consent requirements before collecting personal information. Never put service credentials in a Vite client environment variable.

## GitHub Pages

1. Create a GitHub repository named **`stidy-services-demo`** and push this folder to its `main` branch.
2. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. The included workflow installs locked dependencies, runs lint/tests, builds and deploys `dist`.
4. The workflow sets `GITHUB_PAGES=true`; Vite then uses `/stidy-services-demo/` as the asset base. The site URL will be `https://YOUR-USERNAME.github.io/stidy-services-demo/`.

For a different repository name, update the Pages base in `vite.config.ts`. For a custom domain served at its root, remove the Pages environment flag. Manual Pages build in PowerShell:

```powershell
$env:GITHUB_PAGES = 'true'
npm run build
Remove-Item Env:GITHUB_PAGES
```

## Vercel

1. Import the repository into Vercel.
2. Select Vite, build command `npm run build`, output directory `dist`, Node.js 24.x.
3. Leave `GITHUB_PAGES` unset so assets use `/`.
4. Deploy. `vercel.json` supplies the build configuration and `X-Robots-Tag` header. Hash routes need no server rewrites.

No accounts, credentials or environment secrets are needed by this demo. GitHub Actions publishes the demo to GitHub Pages when changes are pushed to `main`. Vercel remains an optional alternative.

## Indexing and metadata

The HTML includes `noindex, nofollow`, Open Graph metadata and a custom SVG favicon. `robots.txt` disallows crawling; Vercel also returns `X-Robots-Tag`. These are crawler instructions, not access control. Use host access protection if the proposal must be private. The Open Graph image uses the absolute GitHub Pages image URL; update it if moving to a different host. Keep the concept notice and indexing safeguards for this demo.

## Evidence and asset provenance

Business name, Ilford location, telephone, email and historical recruitment were checked on 17 November 2026 against the [Nextdoor profile](https://nextdoor.co.uk/pages/stidy-services-ltd-domestic-commercial-cleaning/). The recruitment post is dated **9 November 2025**; it does not establish current vacancies or business age. Contact ownership and current service details still need owner confirmation. Service tasks, process, positioning and benefits are clearly labelled proposals.

Photography is downloaded from Unsplash and used under the [Unsplash licence](https://unsplash.com/license). These interiors illustrate the design; they do not show Stidy staff or completed jobs. Original image sources:

- Living room: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- Workspace: https://images.unsplash.com/photo-1497366754035-f200968a6e72
- Interior detail: https://images.unsplash.com/photo-1600607687939-ce8a6c25118c

Fonts: DM Sans and DM Serif Display, obtained from Google Fonts and bundled locally under the SIL Open Font License (included with assets). No third-party font or image requests are made by the finished site.

## Confirm with the owner before a real launch

- Permission to represent the company; legal company name, registration details and approved brand identity.
- Current phone/email ownership, WhatsApp availability, service area and operating/contact hours.
- Exact domestic/commercial services, exclusions, equipment, products, frequencies and access arrangements.
- Pricing/quoting process, availability, booking, payment and cancellation terms.
- Evidence for any future insurance, qualifications, guarantees, ratings or other trust claims.
- Approved copy, photographs, permissions and any genuine reviews.
- Current recruitment needs, eligibility, work status, pay and how applications should be handled.
- Form destination, privacy notice, retention, security, data-processing responsibilities and required legal information.
- Domain/hosting ownership, maintenance responsibilities, and acceptance of the final site.

The £350–£450 proposal scope should be agreed separately; this demo makes no commercial promise on the company's behalf.
