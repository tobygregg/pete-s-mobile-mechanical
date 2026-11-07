# Pete's Mobile Mechanical Services — website

Single-page site for a mobile mechanic in Guernsey. Plain HTML, Tailwind CSS v3 (compiled and committed) and a small vanilla JS file. No frameworks, no runtime CDNs.

Draft live at: https://tobygregg.github.io/pete-s-mobile-mechanical/

## Folder layout

```
index.html              the whole site – sections split by big comment banners
thanks.html             shown after the quote form is sent (FormSubmit _next)
404.html                GitHub Pages "not found" page (uses <base href> so paths work at any depth)
assets/css/styles.css   compiled Tailwind – do not edit by hand
assets/js/main.js       menu, scroll reveals, side-rail highlight, services job sheet, lightbox, form validation
assets/fonts/           self-hosted Archivo (variable) + Public Sans, with OFL licences
images/brand/           logo.webp / logo-sm.webp / logo.png (transparent cut-out of Pete's badge)
images/work/            job photos, each as name.webp (~1600px) + name-sm.webp (~800px)
images/                 favicons, og-image.jpg (1200×630 share card), site.webmanifest
src/input.css           Tailwind source: @font-face, components, keyframes, reduced-motion rules
tailwind.config.js      brand colours, fonts and animations
sitemap.xml, robots.txt
_fb-pack/               the Facebook research pack (not published – underscore folder)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| `ink` | `#0f1b2b` | Navy outline of the badge. Text, side rail, dark sections, primary buttons |
| `blue` | `#2363a4` | Shield blue from the badge. Accents, icons, illustration stripe |
| `orange` | `#cf5f2a` | Outline of the "Pete's" script. Main call-to-action, small highlights |
| `steel` | `#8a9099` | Chrome of the tools in the badge. Labels, borders |
| `paper` | `#f5f3ee` | Warm off-white page background (job-sheet feel) |

- **Fonts:** Archivo (variable width/weight) for headings and labels, Public Sans for body text.
- **Logo:** Pete's badge is a detailed illustrated logo, too complex to redraw faithfully as SVG, and the source was large enough (1362px) to use as is. It was cut out from its white background and saved as transparent WebP/PNG in `images/brand/`. If Pete has the original vector file, swap it in.
- **Graphics:** the hero illustration (car with its bonnet up on a home driveway, spanner animating), the road strip of vehicles, and all icons are hand-written inline SVG in the same 2px line style. Icons live once in the `<symbol>` sprite at the top of `index.html`.

## Editing

- **Text:** edit `index.html` directly. Each section is marked with a comment banner (HERO, SERVICES, HOW IT WORKS, RECENT WORK, ABOUT PETE, REVIEWS, GOOD TO KNOW, CONTACT).
- **Colours / fonts:** edit `tailwind.config.js`, then run `npm install` (once) and `npm run build`. Use `npm run watch` while working.
- **Services job sheet:** each service is a `<button role="tab">` in `#jobList` plus a matching `<article role="tabpanel">` in `#jobStage` (ids `tab-x` / `panel-x`). To add one, copy a pair, change the ids, number and text, and add the same name to the form's `<select>` (the panel's `data-service` must match the option text so "Ask about…" pre-selects it). On phones the JS moves the open panel under its row automatically.
- **Adding a work photo:** export `name.webp` (1600px long edge) and `name-sm.webp` (800px) into `images/work/`, then copy one `<li>` in `#gallery`. Landscape photos use `col-span-2`, portrait photos `row-span-2`. Set `data-full`, `data-caption`, `alt`, `width`/`height`.
- **Before & after:** not used – mechanical repairs aren't a visual before/after trade and the pack had no matching pairs.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/pete-s-mobile-mechanical/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt`, the form's `_next`, and the `<base href>` in `404.html` (change to `/`). One of Pete's flyers shows **petemobilemechanic.com** – check whether he already owns it.
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's** (`action="https://formsubmit.co/…"` in `index.html`) and activate FormSubmit by clicking the confirmation email it sends on the first submission. Update the `_subject` too.
- [ ] Confirm phone (07781 122440) and email (petesmobilemechanicalservices@gmail.com).
- [ ] Confirm WhatsApp works on 07781 122440 (the "Text or WhatsApp" links use `wa.me/447781122440`; Pete mentions WhatsApp in a post).
- [ ] Get Pete to sign off the services wording and the "What's covered" lists – built from his post and flyers (servicing, diagnostics, brakes, steering & suspension, wheel bearings, clutch, drivetrain, exhausts, engine repairs, batteries, emergency call-outs).
- [ ] Confirm "£200 plus parts" for major services and free, no-obligation estimates are still current.
- [ ] Ask Pete for better photos: a real photo of him and the van at work would be the biggest improvement (his flyers use AI-generated imagery, so none of those were used).
- [ ] Reviews use first name + surname initial. Check Pete is happy to show them.

### Assumptions and things left out

- "Fully qualified & insured" appears on one of Pete's flyers but not in his own written posts, so it was **not** claimed on the site. Add it if he confirms.
- The "Do you look after fleets?" answer is based on his post ("managing a fleet on the move", "vans, buses, coaches").
- Left out: an "off island until Monday" notice, the follower/review counts, the AI-generated flyer images, cartoon/alternative logos, and scenery photos (fields, sunset) that aren't about the work.

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). It is not published on the live site.
