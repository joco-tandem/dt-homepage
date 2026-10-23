// node shoot.cjs 320,390,768,1024,1366,1440,1920        full-page screenshots -> shots/w<width>.png
// node shoot.cjs 1440,390 states                         also click through every interactive part -> shots/s<width>_*.png
const { chromium } = require("C:/projects/work/tandem/dtprototype-3d65b675/node_modules/playwright");
const path = require("path");
const url = require("url");

(async () => {
  const widths = (process.argv[2] || "1440").split(",").map(Number);
  const states = process.argv[3] === "states";
  const browser = await chromium.launch();
  let failed = false;
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(url.pathToFileURL(path.resolve(__dirname, "preview.html")).href);
    await page.waitForFunction(() => document.querySelector("dt-homepage")?.shadowRoot?.querySelector("footer"));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      height: document.documentElement.scrollHeight,
      fonts: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family).filter((v, i, a) => a.indexOf(v) === i),
    }));
    await page.screenshot({ path: path.join(__dirname, `shots/w${w}.png`), fullPage: true, animations: "disabled" });
    console.log(`${w}: overflow ${m.overflow}px, height ${m.height}px, fonts [${m.fonts.join(", ")}], console errors ${errors.length}`);
    if (m.overflow > 0 || errors.length) failed = true;
    errors.forEach((e) => console.log("   error:", e));

    if (states) {
      const R = page.locator("dt-homepage");
      const shot = async (sel, name) => {
        const el = R.locator(sel).first();
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await el.screenshot({ path: path.join(__dirname, `shots/s${w}_${name}.png`), animations: "disabled" });
      };
      const over = async () => {
        const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (o > 0) { failed = true; console.log("   overflow after state change:", o); }
      };
      // Mobile menu (only shown at 900px and below)
      if (await R.locator(".menu-btn").isVisible()) {
        await R.locator(".menu-btn").click();
        await page.waitForTimeout(200);
        await page.screenshot({ path: path.join(__dirname, `shots/s${w}_menu-open.png`) });
        console.log("   menu aria-expanded:", await R.locator(".menu-btn").getAttribute("aria-expanded"));
        await R.locator(".mobile-menu a[href='#pricing']").click();
        await page.waitForTimeout(900);
        console.log("   after menu link: menu hidden =", await R.locator(".mobile-menu").isHidden(), ", pricing top =",
          Math.round(await page.evaluate(() => document.querySelector("dt-homepage").shadowRoot.getElementById("pricing").getBoundingClientRect().top)));
        await page.evaluate(() => scrollTo(0, 0));
      } else {
        await R.locator(".nav-links a[href='#faq']").click();
        await page.waitForTimeout(900);
        console.log("   nav FAQs -> faq top =", Math.round(await page.evaluate(() => document.querySelector("dt-homepage").shadowRoot.getElementById("faq").getBoundingClientRect().top)));
        await page.evaluate(() => scrollTo(0, 0));
      }
      // Hero: hover a hotspot (desktop) and tap each chip
      if (w > 900) {
        await R.locator(".spot[data-seat='ben']").hover();
        await shot(".hero-visual", "seat-hover-ben");
      }
      for (const id of ["leo", "maya", "ana"]) {
        await R.locator(`.chip[data-seat='${id}']`).click();
        await shot(".hero-visual", "seat-" + id);
      }
      await over();
      await R.locator("[data-view='before']").click();
      await shot(".compare", "before");
      await R.locator("[data-view='after']").click();
      for (const id of ["meeting", "jobs", "gigs", "budget", "spork"]) {
        await R.locator(`[data-tab='${id}']`).click();
        await page.mouse.move(0, 0);
        await shot(".os", "tab-" + id);
      }
      await over();
      // keyboard: arrow down from the selected tab moves selection
      await R.locator("[data-tab='spork']").focus();
      await page.keyboard.press("ArrowDown");
      console.log("   ArrowDown from spork selects:", await R.locator(".os-tab[aria-selected='true']").getAttribute("data-tab"));
      for (const id of ["money", "energy", "connection"]) {
        await R.locator(`[data-pillar='${id}']`).click();
        await shot("#value .wrap", "pillar-" + id);
      }
      await over();
      await R.locator("[data-billing='yearly']").click();
      await shot("#pricing .wrap", "yearly");
      await R.locator("[data-billing='monthly']").click();
      await R.locator("#dt-faq-q2").click();
      await shot("#faq .wrap", "faq-3-open");
      await R.locator("#dt-faq-q2").click();
      console.log("   FAQ 3 after second click aria-expanded:", await R.locator("#dt-faq-q2").getAttribute("aria-expanded"));
      const hrefs = await page.evaluate(() => [...document.querySelector("dt-homepage").shadowRoot.querySelectorAll("a[data-link]")]
        .map((a) => `${a.textContent.trim()} -> ${a.getAttribute("href")}${a.target ? " (" + a.target + ")" : ""}`));
      if (w === widths[0]) console.log("   links:\n     " + [...new Set(hrefs)].join("\n     "));
    }
    await page.close();
  }
  await browser.close();
  process.exitCode = failed ? 1 : 0;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
