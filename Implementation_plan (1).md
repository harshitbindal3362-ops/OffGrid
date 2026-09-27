# IMPLEMENTATION PLAN — "OFFGRID" Streetwear/Thrift E-Commerce Website

> **How to use this document:** This is a complete, self-contained build spec. Hand this entire file to an AI coding agent (or a human dev) as the single source of truth. It defines the product, the exact visual language (based on approved reference screenshots), the tech stack, the data model, every page (public + admin), every API route, and the quality bar. Follow it section by section, in order. Do not skip the QA/verification section — it is not optional polish, it is part of "done."

---

## 0. PROJECT SUMMARY

**Product:** OFFGRID — a streetwear e-commerce brand that sells two kinds of inventory in one store:
1. **Thrifted** — secondhand, hand-picked, one-of-one (1/1) vintage pieces. Once sold, that exact listing is gone forever (no restock).
2. **New / In-house** — the brand's own heavyweight basics (hoodies, tees, cargos), made in small runs, available in a size range (S–XXL) and restocked.

The brand has a physical store (Hauz Khas Village, New Delhi) in addition to the online shop, so the site must also sell the "come visit us" experience, not just be a pure e-commerce checkout funnel.

**Tone:** Raw, street, editorial, slightly aggressive — NOT a soft polished corporate SaaS look. Think zine/streetwear-drop-culture, not "generic Shopify theme." This tone must carry through copy, spacing, and motion, not just color.

**Two audiences for this build:**
- **Customers** — browse, filter, view product detail, add to bag, checkout, track order, join the mailing list.
- **Brand owner/admin (internal staff)** — log in to a separate admin dashboard to add/edit/delete products, upload and reorder product photos, manage stock (critical for 1/1 thrifted items — once sold, it must be auto-hidden or auto-marked SOLD OUT everywhere instantly), manage orders, view basic analytics, edit the marquee ticker text, and edit store hours/address.

---

## 1. TECH STACK (use exactly this unless a listed fallback is required)

### 1.1 Frontend
- **Framework:** Next.js 14+ (App Router), TypeScript throughout — no `.js`/`.jsx` files.
- **Styling:** Tailwind CSS, configured with **custom design tokens** (see Section 3) — do not use Tailwind's default color palette or default font stack for any visible UI. Every color/spacing/font value used must trace back to the design tokens file.
- **Component primitives:** shadcn/ui (Radix-based) for accessible primitives (dialog, select, dropdown, toast, tabs) — but every component must be **re-skinned** with the OFFGRID design tokens. Do not ship default shadcn styling (rounded-xl gray cards, default blue focus rings, Inter font, etc.) — that is exactly the "looks AI-generated" failure mode this plan exists to prevent.
- **State/data:** TanStack Query (React Query) for all server data fetching, caching, and mutations (add to bag, checkout, admin CRUD).
- **Client cart state:** Zustand store (`useCartStore`) — persisted to `localStorage` for guest carts, synced to DB for logged-in users.
- **Forms:** React Hook Form + Zod schemas (shared schema types between client validation and API route validation — one Zod schema per entity, imported both places, not duplicated).
- **Animation:** Framer Motion — used sparingly and purposefully (marquee ticker, hover states, page transitions, filter chip active state) — never used for decoration that has no functional meaning.

### 1.2 Backend
- **Runtime:** Next.js Route Handlers (`app/api/**/route.ts`) for all API logic — no separate Express server needed for v1.
- **Language:** TypeScript, strict mode on (`"strict": true` in tsconfig, no `any` without an explicit justifying comment).
- **ORM:** Prisma.
- **Database:** PostgreSQL (hosted on Neon or Supabase — use Neon for this build; it's the simplest serverless Postgres to provision).
- **File/image storage:** Cloudflare R2 (S3-compatible) for all product photography and admin-uploaded assets. Never store binary image data in Postgres.
- **Image delivery/optimization:** Next.js `<Image>` component pointed at the R2 bucket, with a remote pattern configured in `next.config.js`.

### 1.3 Auth
- **Customer auth:** Auth.js (NextAuth) — email/password + Google OAuth. Guest checkout must also be supported (do not force account creation to buy).
- **Admin auth:** Separate, hardened admin login at `/admin/login`, using Auth.js with a distinct `role: "ADMIN"` field on the `User` model. Admin routes must be protected server-side via middleware, not just hidden client-side — a customer manually navigating to `/admin/*` while logged in as a non-admin must get redirected/403'd server-side, every time.

### 1.4 Payments
- **Provider:** Stripe (Checkout + Webhooks). Support INR currency (site uses ₹ throughout reference screenshots).
- Webhook handler must update order status in DB (`PENDING` → `PAID` → `FULFILLED`) and must be idempotent (verify Stripe signature, dedupe by event id).

### 1.5 Email
- **Transactional:** Resend — order confirmation, shipping update, "back in stock" alert, newsletter opt-in confirmation.

### 1.6 Hosting/Infra
- **App hosting:** Vercel.
- **DB hosting:** Neon (serverless Postgres, branchable for staging).
- **Storage:** Cloudflare R2.
- **DNS/CDN:** Cloudflare.
- **Error tracking:** Sentry (both client and server).
- **Analytics:** PostHog (product analytics — funnel from product view → add to bag → checkout; also used for the admin dashboard's basic stats).

### 1.7 Testing
- **Unit/integration:** Vitest + React Testing Library.
- **End-to-end:** Playwright — this is mandatory, not optional (see Section 8).

### 1.8 Tooling
- ESLint + Prettier, enforced via a pre-commit hook (husky + lint-staged).
- `zod` shared validation as described above.
- Environment variables validated at boot with a `env.ts` (using `@t3-oss/env-nextjs` or equivalent) so a missing `STRIPE_SECRET_KEY` etc. fails the build loudly instead of failing silently in production.

---

## 2. INFORMATION ARCHITECTURE — FULL SITE MAP

### 2.1 Public site
| Route | Purpose |
|---|---|
| `/` | Home — hero, stats bar, "Two Ways to Wear It" split, "This Week's Picks" (featured products), "Come Dig" (physical store CTA), footer |
| `/shop` | "The Rail" — full product grid with Condition + Category filters and Sort |
| `/shop/[slug]` | Product detail page (PDP) |
| `/store` | Store-only page (map, hours, address, photos of the physical shop — expands on the "Come Dig" section) |
| `/about` | Brand story page |
| `/bag` | Cart/bag drawer or full page — line items, quantity, remove, subtotal, checkout CTA |
| `/checkout` | Stripe-hosted checkout redirect (or embedded Stripe Elements — pick embedded for a more on-brand feel; fallback to Stripe Checkout if time-constrained) |
| `/checkout/success` | Order confirmation |
| `/account` | Order history, saved details (only for logged-in users) |
| `/account/orders/[id]` | Single order status/tracking |
| `/login`, `/register` | Customer auth |
| `/legal/*` | Shipping policy, returns policy, privacy policy, terms — thrifted/1-of-1 goods need an explicit "final sale on thrifted items" or similarly clear returns policy since each piece is unique inventory |

### 2.2 Admin panel (internal, `/admin/*`, auth-gated)
| Route | Purpose |
|---|---|
| `/admin/login` | Separate admin login |
| `/admin` | Dashboard — today's orders, low-stock/near-sold-out 1-of-1 alerts, revenue snapshot (PostHog or simple SQL aggregate), quick links |
| `/admin/products` | Product list table — search, filter by condition/category/status, bulk actions |
| `/admin/products/new` | Create product form |
| `/admin/products/[id]/edit` | Edit product — including **drag-to-reorder image gallery uploader**, price, compare-at price, condition (Thrifted/New), category, sizes, stock/uniqueness flag, description, "1 OF 1" toggle, publish/unpublish toggle |
| `/admin/orders` | Order list — filter by status, search by customer/order id |
| `/admin/orders/[id]` | Order detail — items, customer info, update fulfillment status (this must trigger a Resend email to the customer) |
| `/admin/collections` | Manage homepage featured picks ("This Week's Picks") — pick which products show, in what order |
| `/admin/site-settings` | Edit marquee ticker text, store address/hours, hero copy, announcement bar — so brand owner never needs a developer to change copy |
| `/admin/customers` | Basic customer list (for support lookups) |

**Non-negotiable admin rule:** Every field the marketing screenshots show as dynamic content (ticker text, stats like "12K+ pieces rehomed", store hours, hero headline/subhead, product badges, prices, stock) must be editable from `/admin`, not hardcoded in the frontend. If the brand owner has to ask a developer to change a number, that's a spec violation.

---

## 3. DESIGN SYSTEM (derived from the approved reference screenshots — match this exactly, do not "interpret" or default to a generic look)

### 3.1 Color tokens
Define these as CSS variables / Tailwind theme extension, name them semantically, not just as raw hex:

```
--color-cream:        #F5F0E1   /* primary background */
--color-cream-dark:   #E8E2CE   /* secondary panel background (e.g. hero band under nav) */
--color-ink:          #1A1712   /* near-black text / dark section backgrounds */
--color-ink-warm:     #211D14   /* dark hero/footer background — warm black, not pure #000 */
--color-yellow:       #F2C511   /* signature accent — badges, CTAs, ticker background */
--color-yellow-dark:  #D4A70A   /* hover/active state of yellow elements */
--color-white:        #FFFFFF
--color-muted:        #8A8574   /* secondary/meta text (size, category labels) */
```
Do not introduce blue, purple, or default Tailwind gray as primary UI colors anywhere. The palette is strictly cream / warm black / signature yellow, with muted taupe-gray for secondary text only.

### 3.2 Typography
- **Display/heading font:** a bold, condensed, slightly aggressive grotesk (reference look = Anton, Archivo Black, or Bebas-adjacent condensed weight). Headlines are set in ALL CAPS, tight tracking, heavy weight. Load via `next/font` (self-hosted, not a render-blocking Google Fonts `<link>`).
- **Body/UI font:** a clean grotesk sans (e.g. Inter or Helvetica Now-style) at regular/medium weight for prices, descriptions, nav, buttons — this is intentionally different from the display font to create the same two-tier hierarchy seen in the screenshots (huge condensed headline vs. small clean label text).
- Never fall back to system-ui or the browser default sans — this is one of the biggest "looks AI-generated" tells.
- Buttons and small labels (SHOP, ADD TO BAG, size/category text) are uppercase with slight letter-spacing.

### 3.3 Layout & spacing
- Max content width ~1280–1440px, generous side padding (not edge-to-edge cramped content).
- Section rhythm: large vertical spacing between major sections (hero, picks, split panel, store, footer) — the reference screenshots show confident whitespace, not a dense dashboard feel.
- Product grid: 3-column on desktop, 2-column tablet, 1-column mobile. Square-ish product photography with a solid dark backdrop (near-black), consistent across all product photos (this is a brand photography style requirement to pass to whoever shoots/sources product images, and the admin uploader should crop/preview at this aspect ratio).

### 3.4 Signature components (build these as reusable, named components — do not inline one-off markup for each)

1. **`<Navbar>`** — logo wordmark "OFFGRID" (bold condensed caps) left, nav links (SHOP / STORE / ABOUT) center-right, "BAG (n)" pill button far right with a live item count, bordered box style (thin 1–2px border, sharp corners — **no rounded corners anywhere in this design system**, that's a deliberate brand choice visible in every screenshot).
2. **`<MarqueeTicker>`** — full-width yellow background band, infinitely auto-scrolling horizontal text (`FREE SHIPPING OVER ₹1499 · NEW THRIFT DROP EVERY FRIDAY 6PM · ONE PIECE, ONE OWNER ★ ...`), built with CSS animation (translateX loop) or Framer Motion — must be seamless/looping with no visible jump cut, must pause on hover for accessibility, and text must come from `/admin/site-settings`, not be hardcoded.
3. **`<Badge>`** — small sharp-cornered label, two variants: yellow-bg/black-text (`THRIFTED`, `NEW`) and black-bg/white-text pill for uniqueness (`1 OF 1`, `IN-HOUSE`). Positioned absolute top-left/top-right over the product image.
4. **`<ProductCard>`** — dark image panel with badges overlaid, product photo, below it: product name (bold caps), size/category meta line in muted color, price row (strike-through compare-at price + current price when discounted, as seen in "FADED TOUR TEE '98" ₹899 ~~₹1499~~), and a full-width bordered "ADD TO BAG" button. When `stock <= 0`, the image is dimmed/overlaid with a large "SOLD OUT" wordmark and the Add to Bag button is disabled and relabeled "SOLD OUT" — it must never be clickable/enabled when out of stock.
5. **`<SplitPromo>`** ("Two Ways to Wear It") — two side-by-side bordered panels, one cream (Thrifted), one yellow (New), each with a heading, description, and CTA button, linking to pre-filtered `/shop?condition=thrifted` and `/shop?condition=new`.
6. **`<StatStrip>`** — the "12K+ / 1/1 / 48H" trio with yellow numerals and small muted caption underneath, values editable from admin.
7. **`<FilterBar>`** — Condition (ALL / THRIFTED / NEW) and Category (ALL / TEES / OUTERWEAR / BOTTOMS / KNITWEAR) as bordered toggle-button groups, black-filled when active/white-filled when inactive exactly as shown; a Sort `<select>` on the right; a live "`N` PIECES" counter above the grid that updates instantly (client-side, no full page reload) as filters change.
8. **`<StoreCallout>`** ("Come Dig") — image left, copy + address + "HOURS & DIRECTIONS" button right, reusable on both home and `/store`.
9. **`<Footer>`** — dark background, second marquee ticker strip above it (different message — "ONE PIECE · ONE OWNER · BUY LESS · WEAR LONGER"), 3-column layout (brand blurb + email signup / Shop links / Find Us contact+socials), copyright line.

### 3.5 Interaction/motion details that must be implemented (not just described)
- Hover states on all buttons and cards (subtle scale or invert, consistent across the whole site — define once in the design tokens, reuse everywhere).
- The yellow ticker scrolls continuously and smoothly at all viewport widths.
- Add to Bag gives immediate visible feedback (bag count increments, small toast or bag icon pulse) — never a silent no-op click.
- All CTAs actually navigate/act. See Section 8 for the explicit zero-dead-button requirement.

---

## 4. DATA MODEL (Prisma schema — implement this exactly, extend only if a real requirement is missing)

Entities required:
- **User** — id, email, passwordHash (nullable if OAuth), name, role (`CUSTOMER` | `ADMIN`), createdAt.
- **Product** — id, slug, name, description, condition (`THRIFTED` | `NEW`), category (`TEES` | `OUTERWEAR` | `BOTTOMS` | `KNITWEAR`), isOneOfOne (boolean), tag (`NEW` | null — for the "NEW" badge distinct from condition), price, compareAtPrice (nullable), status (`DRAFT` | `PUBLISHED` | `ARCHIVED`), createdAt, updatedAt.
- **ProductImage** — id, productId, url, sortOrder, altText.
- **ProductVariant** — id, productId, size, stock (integer — for thrifted 1-of-1 items this is always 0 or 1; for new items this can be any integer per size).
- **Order** — id, userId (nullable for guest), email, status (`PENDING` | `PAID` | `FULFILLED` | `CANCELLED`), stripeSessionId, subtotal, total, shippingAddress (JSON), createdAt.
- **OrderItem** — id, orderId, productId, variantId, productNameSnapshot, priceSnapshot, quantity — snapshot fields exist so that editing a product later never rewrites historical order records.
- **Collection** (for "This Week's Picks") — id, name (e.g. `home-picks`), items: ordered list of productIds.
- **SiteSetting** — key/value table (or a single JSON row) for ticker text, hero copy, stats numbers, store address/hours, announcement text — this is what makes Section 2.2's "no hardcoded marketing copy" rule possible.
- **NewsletterSubscriber** — id, email, createdAt.

Constraints to enforce at the DB/application layer (not just UI):
- A `ProductVariant.stock` can never go negative — decrement inside a DB transaction at order-paid time, and re-check stock server-side even if the client showed it as available (prevents race conditions / overselling a 1-of-1 item to two simultaneous buyers).
- When a 1-of-1 thrifted item's last unit sells, the product's public availability must flip immediately (no stale cached "in stock" state) — invalidate/revalidate the relevant Next.js cache tags (`revalidateTag`) on order confirmation.

---

## 5. API ROUTES (implement all of these; each must have server-side input validation via the shared Zod schemas and correct HTTP status codes — no route may silently swallow an error)

Public:
- `GET /api/products` — list with query params for condition, category, sort, pagination.
- `GET /api/products/[slug]` — single product with images/variants.
- `POST /api/cart/sync` — merge guest cart with account cart on login.
- `POST /api/checkout/session` — creates Stripe session, validates stock server-side before creating it.
- `POST /api/webhooks/stripe` — Stripe webhook, signature-verified, idempotent.
- `POST /api/newsletter` — subscribe email, validated, de-duplicated.
- `GET /api/orders/[id]` — auth-checked (must belong to requesting user or be an admin).

Admin (all require `role: ADMIN`, enforced in middleware AND re-checked inside each handler — defense in depth):
- `POST /api/admin/products`, `PATCH /api/admin/products/[id]`, `DELETE /api/admin/products/[id]`.
- `POST /api/admin/products/[id]/images` — handles upload to R2, returns URL, appends to `ProductImage`.
- `PATCH /api/admin/products/[id]/images/reorder` — persists drag-and-drop order.
- `PATCH /api/admin/orders/[id]/status` — triggers Resend email on change.
- `GET /api/admin/orders`, `GET /api/admin/products` (table views with pagination/search).
- `PATCH /api/admin/site-settings` — updates ticker/hero/stats copy; must `revalidateTag` the homepage cache immediately after saving so the brand owner sees the change live without redeploying.
- `PATCH /api/admin/collections/[name]` — updates "This Week's Picks" ordering.

---

## 6. BUILD ORDER (do it in this sequence — each phase should be genuinely working, not stubbed, before moving to the next)

1. **Foundation:** repo scaffold, Tailwind config with the exact design tokens from Section 3, font loading, Prisma schema + migration, seed script with realistic sample data matching the reference screenshots (Faded Tour Tee '98, Washed Trucker Jacket, OFFGRID Heavy Hoodie, Boxy Graphic Tee, Distressed Denim Jacket, Blank Black Hoodie — sold out).
2. **Core components** from Section 3.4, built in isolation (a `/dev/components` sandbox route is fine for this, delete before ship) so they're pixel-checked against the screenshots before being wired into real pages.
3. **Public pages:** Home → Shop/Rail (with working filters/sort against real DB data) → PDP → Bag → Checkout → Store → About → legal pages.
4. **Auth:** customer login/register/guest checkout, then admin auth + middleware protection.
5. **Admin panel:** product CRUD + image uploader/reorder first (this unblocks the brand owner's core workflow), then orders, then site-settings, then collections, then dashboard.
6. **Payments:** Stripe integration end-to-end, webhook, order status lifecycle, transactional emails.
7. **Polish pass:** motion/hover states, empty states (empty bag, no search results, zero products in a filter), loading states (skeletons, not blank flashes), 404 page, error boundaries.
8. **QA pass:** Section 8, in full, before calling this done.

---

## 7. EXPLICIT "DO NOT SHIP THIS" RULES

These are common failure modes for AI-generated sites. Actively check against every one of them before considering the build complete:

- **No dead or disconnected buttons.** Every `<button>`/`<a>` in the codebase must have a real, working `onClick`/`href`/form submission tied to a real handler or route. Do a full grep for interactive elements and manually verify each one does something. A button that exists only for visual completeness (e.g., "HOURS & DIRECTIONS") must actually open a maps link or an expandable hours panel — never a no-op.
- **No placeholder/lorem ipsum content left in the shipped build.** All copy should be realistic, on-brand, and sourced from `SiteSetting`/`Product` records, not hardcoded filler.
- **No broken empty/edge states.** Zero products matching a filter must show a designed "no pieces match these filters" state, not a blank white gap or a crash.
- **No logic errors in cart/stock math.** Subtotals, quantity changes, discounts (compare-at price), and stock decrement must be covered by unit tests (Section 8.1) — off-by-one or double-counting bugs here are a hard blocker.
- **No client-only "auth" on admin routes.** Server-side session/role check is mandatory on every `/admin/*` page and every `/api/admin/*` route, independent of any client-side redirect.
- **No default/unstyled shadcn or browser-default UI bleeding through** — every component visible to a user must reflect the Section 3 design tokens. If in doubt, compare side-by-side against the 7 reference screenshots pixel-region by pixel-region (nav, hero, stat strip, ticker, split promo, product grid, store section, footer) and correct any visual drift.
- **No inconsistent product card states** — hover, sold-out, discounted, 1-of-1, new — all four visual states must be implemented and tested, not just the default state shown in early screenshots.
- **No silent API failures.** Every fetch/mutation must handle the error path with a visible, on-brand toast/inline message — never a console-only error with a frozen UI.

---

## 8. VERIFICATION — "LOOP ENGINEERING" REQUIREMENT (mandatory, run before declaring the build finished)

The agent must not treat the first working build as final. Run the following verification loop, fix what fails, and **re-run the same loop again** until a full pass happens with zero failures. Repeat at least twice, even if the first pass looks clean — a second pass frequently surfaces regressions introduced while fixing the first pass's issues.

**Loop, per iteration:**

1. **Automated tests**
   - Run the full Vitest unit/integration suite (cart math, stock decrement, Zod validation, price formatting with ₹ currency, filter/sort logic). All green.
   - Run the full Playwright E2E suite covering, at minimum:
     - Browse home → click a "This Week's Pick" → lands on correct PDP.
     - Filter the Rail by condition and category in combination → grid and "N PIECES" counter update correctly, URL reflects filter state (shareable/bookmarkable), and the counter's number always matches the actual number of rendered cards.
     - Add an item to bag from a product card AND from a PDP → bag count updates in the navbar in both cases.
     - Attempt to add a sold-out item → button is disabled, nothing is added, no crash.
     - Full guest checkout with Stripe test card → order appears in `/admin/orders` with correct total and items.
     - Admin login → create a new product with 3 uploaded images → reorder images via drag → publish → product appears correctly on `/shop` and its PDP with images in the chosen order.
     - Admin edits `/admin/site-settings` ticker text → refresh the public homepage → new ticker text is live.
     - Admin marks a 1-of-1 product's stock to 0 → refresh `/shop` → product now shows SOLD OUT and Add to Bag is disabled, without a manual redeploy.
     - Newsletter signup form submits and confirms.
     - 404 route, and a broken/removed product slug, both show proper not-found states, not a crash.
   - Any red test = must be fixed before proceeding to step 2 of this same iteration.

2. **Manual click-through audit**
   - Walk every route in Section 2 as an anonymous user, then again as a logged-in customer, then again as admin.
   - Click every visible interactive element on every page once. Log any that don't do the expected thing.
   - Resize to mobile width and repeat the click-through for the public pages — layout must not break, nav must have a working mobile menu, ticker must still scroll cleanly, product grid must reflow to single column.

3. **Visual diff against reference screenshots**
   - Compare the built Home, Shop/Rail, and Store/footer sections directly against the 7 approved reference screenshots, region by region (typography weight/case, color values, border style, spacing rhythm, badge placement). Correct any drift back toward the tokens in Section 3, not toward a generic default.

4. **Data-integrity spot check**
   - Query the DB directly (or via Prisma Studio) after the E2E run: confirm order totals match line items, confirm stock decremented exactly once per purchased unit, confirm no orphaned `ProductImage` rows, confirm no duplicate newsletter emails.

5. **Log/error check**
   - Check Sentry (or console/server logs in dev) for any warnings or errors thrown during the above steps — a "passing" click-through that also silently threw a React hydration warning or an unhandled promise rejection is not actually passing. Fix root causes, don't suppress the warning.

**Exit condition:** Two consecutive full loop iterations with zero failing tests, zero non-functional buttons found, zero visual drift items, and zero unexplained console/server errors. Only then is the build considered complete and ready to hand back.

---

## 9. DELIVERABLES EXPECTED FROM THE AI AGENT AT THE END

- Full source repository, organized by the Next.js App Router conventions, with the Prisma schema, seed script, and `.env.example` listing every required environment variable.
- A short `README.md` covering: local setup, how to run migrations/seed, how to run the Vitest and Playwright suites, and how to create the first admin user.
- Confirmation, in writing, that the Section 8 verification loop was run twice with a full pass, including a brief summary of what was found and fixed in the first pass.
