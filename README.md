# dt-homepage

`<dt-homepage>`: the Dinner Table marketing homepage, built as a Wix Studio custom element. It is ported from the Claude Design mockup "Dinner Table Homepage Mockup, Homepage desktop", using the latest template (`_design-src/Main.dc.latest.html`). The mockup is desktop only (1440 wide), so the tablet and phone layouts were designed here.

## Use in Wix Studio

Add a **Custom Element** to the page, set its source to **Server URL**, and enter:

- **Server URL:** `https://cdn.jsdelivr.net/gh/joco-tandem/dt-homepage@v1.0.1/dist/dt-homepage.js` (a pinned tag, like Expert Talks; an update is a new tag plus the new URL in Studio)
- **Tag name:** `dt-homepage`

The element sizes itself to its content. There are no fixed heights or `100vh` sections. The nav bar is `position: sticky`. It only sticks if no Wix wrapper around the element has `overflow: hidden`, and the Wix site header may need hiding so there aren't two navs.

## Links

Links that leave the page use `target="_top"`, so they also escape an iframe. Every link can be changed with an attribute on the element (set it in Studio's custom element attributes, or with `$w('#customElement1').setAttribute(...)`):

| Attribute | Used by | Default |
|---|---|---|
| `signup-url` | every "Get started" button | `https://members.dinnertable.com/signup` |
| `login-url` | "Log In" | `https://members.dinnertable.com/login` |
| `amazon-url` | "Get the book on Amazon" | the book's Amazon page |
| `kindle-url` | "Get the book on Kindle" | EM's Kindle link |
| `about-url`, `resources-url`, `webinars-url`, `contact-url`, `terms-url`, `privacy-url` | footer links | the Wix site's `/about`, `/resources`, `/event-list`, `/contact`, `/terms-and-conditions`; the app's `/privacy` |

A link with no URL renders as `href="#"` and does nothing when clicked. The nav links, "See how it works", the logo and the footer's "How It Works" / "Pricing" scroll within the page.

## Open questions for marketing

- Final destinations for the footer links (they point at the Wix site's old pages for now).
- Should "Get started" go straight to signup, or to the in-page final CTA (`#start`) as in the mockup?
- The hero photo is 1000×666. It's sharp on standard screens but slightly soft on 2× (retina) screens, where it would need about 1200px wide.
- The Steven Finkelstein review, the Taylor Family quote and the prices ($1 a day / $30 a month, $25 a month / $300 a year): please confirm they're final.

## Develop

- The "Spork, your guide" tab shows the app's blinking Spork, `dist/spork-blinking.webp` (still frame `spork-blinking-poster.webp` with reduced motion). It loads only when that tab opens, from the folder the script was loaded from, or else the jsDelivr tag `build.py` is given.
- Edit `src/dt-homepage.js`. The images live in `src/*.b64`, and `__LOGO__`, `__HERO__`, `__SINK__` and `__BOOK__` are placeholders for them. Fraunces and Montserrat load from Google Fonts via a `<link>` the element adds to the page head, because `@font-face` doesn't work inside a shadow root.
- `python build.py [tag]` writes `dist/dt-homepage.js` with the images inlined (tag defaults to `v1.0.0`; use the tag you're about to publish).
- Open `preview.html` to view it.
- `node shoot.cjs 320,390,768,1024,1366,1440,1920` saves full-page screenshots to `shots/w<width>.png`. It also reports horizontal overflow and console errors, and exits non-zero if it finds any. Add `states` (for example `node shoot.cjs 1440,390 states`) to click through the menu, seats, before/after, tabs, pillars, billing and FAQ, saving `shots/s<width>_*.png`.
- `_design-src/` holds the design files (downloaded bundle plus templates, treated as data). `_reference/` holds the reference renders: `ref-latest-1440.png` comes from the latest template, rendered with the bundle's assets by `tools/make_latest_bundle.py`, and `states/` has its interactive states.
