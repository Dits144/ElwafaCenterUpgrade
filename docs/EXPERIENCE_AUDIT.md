# Experience audit — Elwafa Center (incremental upgrade)

## Confirmed from repository
- Vite + React 18 + TypeScript + Tailwind 3 + Framer Motion; hash-based public pages (`beranda`, `program`, `tentang`, `kegiatan`, `artikel`, `kontak`, `login`). No Next.js migration warranted merely for an aesthetic upgrade.
- Public home already has hero, registration path, program selector, director welcome, process, programs, FAQ, and footer. Existing `Hero.tsx` carries simulator / bento content; retain it while changing art direction.
- Dashboard applicant/program/article data and role switching still use localStorage demo state. Only Inbox Tim has a separate Node/SQLite API and separate admin login. Do **not** describe other dashboards as database-backed or authenticated.
- Prior colors are teal/ocean/gold. New request changes to emerald/ivory/muted gold; implement in layers, without breaking old components. User-visible official affiliation, fees, quotas, and testimonials need institutional validation.
- Existing testimonials component contains attributed named quotes but is not mounted on HomePage. Do not mount until consent and authenticity are verified.
- Program images are currently local archived assets. Generative-image tooling not confirmed; do not claim AI generation.

## This increment
- Add a first-visit decorative intro (session once, skip reduced motion, no pointer interception), editorial heading and CTA in hero, warm ivory/geometric styling, typography/motion tokens.
- Preserve existing hero simulator, bento sections, routes, forms, and admin/student business workflows.

## Unverified / approval needed
- Official institutional affiliation, program requirements, prices, dates, capacity, names and photos need review by authorized Elwafa staff.
- Full production auth/database, image upload and full CMS entities (gallery/organization) are outside this visual increment and must not be presented as completed.
- AI-generated assets require a licensed image-generation capability and editorial approval before replacing historical assets.

## Next increments
1. Cohesive palette rollout across public sections and dashboards; measure accessibility contrast and layout.
2. Student/admin dashboard motion and hierarchy without changing state semantics.
3. Documented asset generation and replacement workflow; verify ownership/rights.
4. Real backend migration and permissions as a separate data-preserving project with backups and migration tests.
