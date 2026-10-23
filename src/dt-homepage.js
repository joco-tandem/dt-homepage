/*
 * <dt-homepage>: the Dinner Table marketing homepage, built as a Wix Studio
 * custom element. Ported from the Claude Design mockup "Dinner Table Homepage
 * Mockup, Homepage desktop" (latest template, Main.dc.latest.html), which is
 * desktop only; the tablet and phone layouts are designed here.
 *
 * Links: "Get started" and "Log In" go to the members app. Override them, and
 * the links that have no destination yet, with attributes (see LINKS below).
 * Links that leave the page use target="_top" so they escape any iframe.
 */
(() => {
  const TAG = "dt-homepage";
  if (customElements.get(TAG)) return;

  const LOGO = "data:image/webp;base64,__LOGO__";
  const HERO = "data:image/jpeg;base64,__HERO__";
  const SINK = "data:image/webp;base64,__SINK__";
  const BOOK = "data:image/webp;base64,__BOOK__";

  // @font-face doesn't work inside a shadow root, so fonts load on the page.
  const FONTS_HREF =
    "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..800,0..100&family=Montserrat:wght@400;500;600;700&display=swap";

  function ensureFonts() {
    if (document.querySelector(`link[data-${TAG}-fonts]`)) return;
    const pre = document.createElement("link");
    pre.rel = "preconnect";
    pre.href = "https://fonts.gstatic.com";
    pre.crossOrigin = "";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_HREF;
    link.setAttribute(`data-${TAG}-fonts`, "");
    document.head.append(pre, link);
  }

  // Attribute -> default URL. An empty default means "no destination yet":
  // the link renders as href="#" and does nothing until the attribute is set.
  const LINKS = {
    "signup-url": "https://members.dinnertable.com/sign-up",
    "login-url": "https://members.dinnertable.com/login",
    "amazon-url": "https://www.amazon.com/Value-Creation-Family-Playbook-Setting/dp/B0GLT94F97/",
    "kindle-url":
      "https://www.amazon.com/Value-Creation-Family-Playbook-Setting-ebook/dp/B0G2TH5QBW?dplnkId=d00b5887-390b-43d1-8fb3-68b717ee36d9&nodl=1",
    "about-url": "",
    "resources-url": "",
    "webinars-url": "",
    "contact-url": "",
    "terms-url": "",
    "privacy-url": "",
  };

  const SEATS = [
    { id: "ben", short: "Ben", left: "28%", top: "55%", dot: "#2D6A6F", role: "HEAD COACH", pillBg: "#2D6A6F", name: "Ben keeps the budget", cardLeft: "36%", cardTop: "4%",
      rows: [["Family goal:", "camping trip fund, 60%"], ["This week:", "posts two new paid gigs"]] },
    { id: "leo", short: "Leo", left: "13%", top: "80%", dot: "#2D6A6F", role: "GROW YOUR ENERGY", pillBg: "#2D6A6F", name: "Leo lifts the mood", cardLeft: "28%", cardTop: "62%",
      rows: [["Family job:", "set the table"], ["This week:", "cheered his sister on"]] },
    { id: "maya", short: "Maya", left: "55%", top: "55%", dot: "#9C5A24", role: "GROW YOUR MONEY", pillBg: "#9C5A24", name: "Maya earns her way", cardLeft: "50%", cardTop: "64%",
      rows: [["Family job:", "empty the dishwasher"], ["Paid gig:", "wash the car"]] },
    { id: "ana", short: "Ana", left: "87%", top: "52%", dot: "#5E6B4A", role: "HEAD COACH", pillBg: "#5E6B4A", name: "Ana runs the meeting", cardLeft: "38%", cardTop: "4%",
      rows: [["This Sunday:", "goals, budget, one win each"], ["Tradition:", "pancake Saturdays"]] },
  ];

  const TABS = [
    { id: "meeting", title: "Family meeting", desc: "Set goals, review the budget and decide what kind of family you want to be. Kids get a real say." },
    { id: "jobs", title: "Family jobs", desc: "Unpaid chores every kid owns, because they’re part of the team." },
    { id: "gigs", title: "Paid gigs", desc: "Extra work kids take on to earn real money and learn financial skills." },
    { id: "budget", title: "Goals and budget", desc: "Two to five family goals and a budget everyone builds together." },
    { id: "spork", title: "Spork, your guide", desc: "Not sure what’s next? Spork suggests the next step." },
  ];

  const PILLARS = [
    { id: "money", num: "1", title: "Grow your money", value: "Material value", deep: "#9C5A24", tint: "#F3DEC8", label: "#7A4519", blob: "Earn.\nSave.\nFix.",
      desc: "Kids take care of real household needs, earn through paid gigs, and learn skills that save the family money, like fixing something instead of buying new. They see how work gets done and how resources are managed.",
      examples: ["Family jobs", "Paid gigs", "Fix, don’t replace", "Help plan the budget"] },
    { id: "energy", num: "2", title: "Grow your energy", value: "Emotional energy value", deep: "#2D6A6F", tint: "#D3E4E3", label: "#1F4C50", blob: "Lift.\nListen.\nRepair.",
      desc: "Kids shape the mood at home. They encourage a sibling, listen when someone is upset, work through conflict, and show up with a good attitude. Your home becomes calmer and more resilient.",
      examples: ["Encouragement", "Empathy", "Working through conflict", "A good attitude"] },
    { id: "connection", num: "3", title: "Grow your connections", value: "Spiritual value", deep: "#5E6B4A", tint: "#DFE3D2", label: "#46512F", blob: "Belong.\nCare.\nServe.",
      desc: "Kids belong to something bigger than themselves. They join family traditions, care for each other, and help in their community, building a shared identity that lasts.",
      examples: ["Family traditions", "Shared experiences", "Caring for each other", "Community service"] },
  ];

  const FAQS = [
    { q: "Who is Dinner Table for?", a: "Families with kids roughly 6 to 16. Single parents, two-parent homes, blended families and grandparents raising kids all use it." },
    { q: "What’s the difference between family jobs and paid gigs?", a: "Family jobs are unpaid; kids do them because they’re part of the team. Paid gigs are extra work kids choose to take on to earn money." },
    { q: "Is this an allowance or chore chart app?", a: "No. Chore charts focus on compliance and allowances hand out money with no connection to effort. Dinner Table builds a system where kids learn ownership, earn by creating value, and help plan the family budget." },
    { q: "How much time does it take?", a: "Start with one family meeting. You choose how often to meet after that, and Spork helps you plan each one." },
    { q: "What if we miss a week?", a: "That’s normal. Pick back up at the next meeting. Spork can suggest a shorter one to get you going again." },
    { q: "Is Dinner Table religious?", a: "No. It’s values-based, not doctrine-based. Families from every background use it." },
  ];

  const PRICES = {
    monthly: { daily: "$1", dailyUnit: "a day", price: "$30", per: "a month", note: "Billed monthly. Cancel anytime." },
    yearly: { daily: "$25", dailyUnit: "a month", price: "$300", per: "a year", note: "Billed annually. Cancel anytime." },
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  const CHECK = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#5E6B4A"></circle><path d="M6 10l3 3 5-6" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>';
  const RING = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="#9C5A24" stroke-width="2"></circle></svg>';
  const TICK = '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" fill="#DFE3D2"></circle><path d="M6.5 11l3 3 6-6" stroke="#5E6B4A" stroke-width="2.2" fill="none" stroke-linecap="round"></path></svg>';
  const STAR = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9z" fill="#C27A3F"></path></svg>';

  const CSS = /* css */ `
    :host {
      --cream: #F2ECE3;
      --ink: #1F2D2A;
      --text: #2E2E2E;
      --body: #3A3A38;
      --muted: #5F5F5A;
      --faint: #8A8A85;
      --sand: #E0D7C6;
      --line: #D6CCBA;
      --peach: #F3DEC8;
      --teal: #2D6A6F;
      --mint: #D3E4E3;
      --sage: #DFE3D2;
      --olive: #5E6B4A;
      --rust: #9C5A24;
      --dash: #C9BFAE;
      --serif: "Fraunces", Georgia, serif;
      --sans: "Montserrat", "Helvetica Neue", Arial, sans-serif;
      --gutter: 24px;
      --nav-h: 85px;
      display: block;
      width: 100%;
    }
    /* The mockup has no box-sizing reset: max-widths are content widths. */
    .page {
      font-family: var(--sans);
      color: var(--text);
      background: var(--cream);
      font-size: 17px;
      line-height: 1.6;
      overflow-x: clip;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, p, ul, figure, blockquote { margin: 0; }
    h1, h2, h3 { text-wrap: balance; }
    p, li, blockquote, figcaption { text-wrap: pretty; }
    img { display: block; }
    a { color: var(--teal); }
    a:hover { color: #1F4C50; }
    button { font-family: inherit; }
    section { scroll-margin-top: var(--nav-h); }
    section:focus { outline: none; }
    .nowrap { white-space: nowrap; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

    .wrap { max-width: 1200px; margin: 0 auto; padding-left: var(--gutter); padding-right: var(--gutter); }
    .pad { padding-top: 96px; padding-bottom: 96px; }
    .display {
      font-family: var(--serif);
      font-variation-settings: "SOFT" 100;
      font-weight: 700;
      font-size: clamp(32px, 4vw, 48px);
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--ink);
    }
    .lead { font-size: 19px; color: var(--body); }
    .serif { font-family: var(--serif); }

    .btn {
      display: inline-block;
      text-align: center;
      font-weight: 700;
      font-size: 17px;
      line-height: 1.6;
      text-decoration: none;
      border-radius: 999px;
      padding: 18px 32px;
      white-space: nowrap;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .btn-rust, .btn-rust:hover { background: var(--rust); color: #FFFFFF; }
    .btn-rust:hover { background: #864C1D; }
    .btn-cream, .btn-cream:hover { background: var(--cream); color: var(--ink); }
    .btn-cream:hover { background: #FFFFFF; }
    .btn-outline, .btn-outline:hover { color: var(--ink); border: 2px solid var(--ink); padding: 16px 28px; }
    .btn-outline:hover { background: rgba(31, 45, 42, 0.06); }
    a:focus-visible, button:focus-visible { outline: 3px solid var(--teal); outline-offset: 3px; }

    @keyframes dtpulse { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.85); } 70% { box-shadow: 0 0 0 14px rgba(255,255,255,0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); } }
    .dt-pulse { animation: dtpulse 2s infinite; }

    /* NAV */
    .nav-bar { position: sticky; top: 0; z-index: 20; background: var(--cream); border-bottom: 1px solid var(--sand); }
    .nav { padding-top: 14px; padding-bottom: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 32px; }
    .logo { display: flex; align-items: center; text-decoration: none; padding: 4px 0; }
    .logo img { width: 150px; height: auto; }
    .nav-links { display: flex; flex-wrap: wrap; gap: 4px 26px; flex: 1 1 auto; font-weight: 500; font-size: 15px; }
    .nav-links a, .nav-links a:hover { color: var(--text); text-decoration: none; padding: 10px 0; }
    .nav-links a:hover { color: var(--teal); }
    .nav-actions { display: flex; align-items: center; gap: 18px; }
    .login, .login:hover { color: var(--text); font-weight: 600; font-size: 15px; text-decoration: none; padding: 10px 4px; }
    .login:hover { color: var(--teal); }
    .nav-cta { font-size: 15px; padding: 13px 24px; }
    .menu-btn {
      display: none;
      width: 44px; height: 44px;
      border: 1.5px solid var(--sand); border-radius: 50%;
      background: #FFFFFF; color: var(--ink);
      cursor: pointer; padding: 0;
      place-items: center;
    }
    .menu-btn svg { display: block; }
    .menu-btn .i-close { display: none; }
    .menu-btn[aria-expanded="true"] .i-open { display: none; }
    .menu-btn[aria-expanded="true"] .i-close { display: block; }
    .mobile-menu { border-top: 1px solid var(--sand); padding: 8px var(--gutter) 20px; }
    .mobile-menu[hidden] { display: none; }
    .mobile-menu a.m-link, .mobile-menu a.m-link:hover {
      display: block; color: var(--text); text-decoration: none; font-weight: 600; font-size: 17px;
      padding: 12px 0; border-bottom: 1px solid var(--sand);
    }
    .mobile-menu .m-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: 18px; }
    .mobile-menu .m-actions .btn { font-size: 16px; padding: 14px 26px; }

    /* HERO */
    .hero { position: relative; container-type: inline-size; }
    .blob-a, .blob-b { position: absolute; pointer-events: none; }
    .blob-a { right: calc(-140px + max(0px, (100cqw - 1440px) / 2)); top: 40px; width: 720px; height: 640px; background: var(--sand); border-radius: 58% 42% 46% 54% / 52% 44% 56% 48%; }
    .blob-b { right: calc(380px + max(0px, (100cqw - 1440px) / 2)); top: 470px; width: 150px; height: 130px; background: var(--peach); border-radius: 50% 50% 46% 54% / 60% 52% 48% 40%; }
    .hero-grid { position: relative; padding-top: 72px; padding-bottom: 96px; display: flex; flex-wrap: wrap; align-items: center; gap: 56px; }
    .hero-copy { flex: 1 1 460px; min-width: 0; }
    .hero h1 {
      font-family: var(--serif); font-variation-settings: "SOFT" 100; font-weight: 700;
      font-size: clamp(40px, 6vw, 76px); line-height: 1.02; letter-spacing: -0.025em; color: var(--ink);
      margin: 0 0 24px;
    }
    .hero-lead { line-height: 1.6; margin: 0 0 32px; max-width: 34em; }
    .hero-ctas { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
    .hero-note { font-size: 14px; color: var(--muted); margin: 16px 0 0; }
    .hero-book { display: flex; align-items: center; gap: 14px; margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--line); max-width: 30em; }
    .hero-book svg { flex: 0 0 auto; }
    .hero-book p { font-size: 15px; color: var(--body); }
    .hero-book em { font-family: var(--serif); font-size: 17px; }

    .hero-visual { flex: 1 1 500px; min-width: 0; display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 16px; position: relative; }
    .photo { grid-row: 1; grid-column: 1; position: relative; border-radius: 32px; overflow: hidden; box-shadow: 0 30px 60px rgba(31,45,42,0.18); aspect-ratio: 1000 / 666; background: var(--sand); }
    .photo img { width: 100%; height: 100%; object-fit: cover; }
    .spot {
      position: absolute; transform: translate(-50%, -50%);
      width: 52px; height: 52px; border-radius: 50%; border: 0; background: transparent;
      cursor: pointer; display: grid; place-items: center; padding: 0;
    }
    .spot:focus-visible { outline: 3px solid #FFFFFF; outline-offset: -3px; }
    .dot { width: 24px; height: 24px; border-radius: 50%; border: 3px solid #FFFFFF; transition: transform 0.15s; }
    .spot[aria-pressed="true"] .dot { transform: scale(1.25); }
    .seat-live { grid-row: 1; grid-column: 1; position: absolute; width: min(260px, 46%); pointer-events: none; z-index: 2; }
    .seat-card { box-sizing: border-box; background: #FFFFFF; border-radius: 22px; padding: 14px 16px; box-shadow: 0 16px 36px rgba(31,45,42,0.25); }
    .seat-role { display: inline-block; font-size: 11px; font-weight: 700; color: #FFFFFF; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.06em; }
    .seat-name { font-family: var(--serif); font-weight: 700; font-size: 20px; line-height: 1.15; color: var(--ink); margin: 8px 0; }
    .seat-row { margin: 0 0 4px; font-size: 13px; line-height: 1.4; color: var(--text); }
    .seat-row strong { color: var(--muted); }
    .chips { grid-row: 2; grid-column: 1; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .chips-label { font-size: 14px; color: var(--muted); margin-right: 4px; }
    .chip {
      border: 2px solid var(--sand); background: #FFFFFF; color: var(--ink);
      font-weight: 700; font-size: 14px; padding: 8px 16px; border-radius: 999px; cursor: pointer; min-height: 44px;
    }
    .chip[aria-pressed="true"] { border-color: var(--rust); background: var(--peach); }

    /* SOUND FAMILIAR */
    .white { background: #FFFFFF; }
    .problem h2 { margin: 0 0 18px; max-width: 18em; }
    .problem .lead { margin: 0 0 48px; max-width: 38em; }
    .cards3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
    .pcard { border-radius: 28px; padding: 32px; }
    .pcard .big { font-family: var(--serif); font-size: 64px; line-height: 1; font-weight: 700; color: var(--rust); margin: 0 0 18px; }
    .pcard svg { margin-bottom: 18px; }
    .pcard h3 { font-family: var(--serif); font-size: 24px; line-height: 1.2; color: var(--ink); margin: 0 0 10px; }
    .pcard p { color: var(--body); }

    /* THE SHIFT */
    .shift h2 { margin: 0 0 48px; text-align: center; }
    .shift .cards3 { gap: 20px; align-items: stretch; }
    .scard { border: 2px dashed var(--dash); border-radius: 28px; padding: 32px; }
    .scard h3 { font-family: var(--serif); font-size: 24px; color: var(--muted); margin: 0 0 10px; }
    .scard p { color: var(--muted); }
    .scard.team { border: 0; background: var(--ink); color: var(--cream); }
    .scard.team h3 { color: #FFFFFF; }
    .scard.team p { color: var(--sand); }

    .compare { margin: 56px auto 0; max-width: 720px; background: #FFFFFF; border-radius: 32px; padding: 32px; box-shadow: 0 20px 50px rgba(31,45,42,0.08); }
    .toggle { display: flex; background: var(--cream); border-radius: 999px; padding: 6px; margin: 0 auto 28px; max-width: 320px; }
    .toggle button {
      flex: 1; border: 0; border-radius: 999px; padding: 12px; font-weight: 700; font-size: 15px; cursor: pointer;
      background: transparent; color: var(--body);
    }
    .toggle button[aria-pressed="true"] { background: var(--ink); color: #FFFFFF; }
    .msgs { border: 1px solid var(--sand); border-radius: 22px; overflow: hidden; background: #FFFFFF; }
    .msgs-head { display: flex; align-items: center; gap: 12px; padding: 14px 20px; border-bottom: 1px solid #EEE8DF; background: #FBF8F4; }
    .avatar-m { width: 40px; height: 40px; border-radius: 50%; background: var(--peach); display: grid; place-items: center; font-family: var(--serif); font-weight: 700; color: var(--ink); flex: 0 0 auto; }
    .msgs-who { display: flex; flex-direction: column; line-height: 1.25; }
    .msgs-who b { font-size: 15px; color: var(--ink); }
    .msgs-who span { font-size: 12px; color: var(--faint); }
    .msgs-body { display: flex; flex-direction: column; gap: 8px; padding: 20px 20px 16px; }
    .msgs-body .time { align-self: center; font-size: 12px; color: var(--faint); }
    .msgs-body .read { align-self: flex-end; font-size: 12px; color: var(--faint); }
    .bub { align-self: flex-end; background: var(--teal); color: #FFFFFF; padding: 9px 16px; border-radius: 18px 18px 6px 18px; font-size: 15px; }
    .bub.them { align-self: flex-start; background: #EEE8DF; color: var(--text); border-radius: 18px 18px 18px 6px; }
    .bub.loud { background: var(--rust); font-size: 16px; font-weight: 600; }
    .bub.louder { background: #AC6057; padding: 10px 18px; font-size: 19px; font-weight: 700; letter-spacing: 0.04em; }
    .msgs-body img { align-self: flex-end; width: min(360px, 80%); height: auto; aspect-ratio: 615 / 375; object-fit: cover; border-radius: 18px 18px 6px 18px; }
    .asked { margin: 20px 0 0; text-align: center; font-weight: 700; color: #8A3F36; }
    .job { border: 1px solid var(--sand); border-radius: 22px; padding: 24px; position: relative; }
    .badge { position: absolute; top: -13px; left: 50%; transform: translateX(-50%); color: #FFFFFF; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; padding: 4px 14px; border-radius: 999px; white-space: nowrap; line-height: 1.6; }
    .job .badge { background: var(--olive); }
    .job-k { margin: 6px 0 4px; font-size: 13px; font-weight: 700; color: var(--muted); }
    .job-t { font-family: var(--serif); font-size: 28px; font-weight: 700; color: var(--ink); margin: 0 0 8px; }
    .job-d { margin: 0 0 16px; color: var(--body); }
    .job-pill { display: inline-block; background: var(--sage); color: var(--ink); font-weight: 700; padding: 6px 14px; border-radius: 999px; }
    .favor { text-align: center; font-family: var(--serif); font-size: 22px; font-weight: 600; color: var(--ink); margin: 28px 0 0; }

    /* HOW IT WORKS */
    .how { background: var(--ink); color: var(--cream); }
    .how h2 { color: #FFFFFF; margin: 0 0 18px; }
    .how .lead { color: var(--sand); margin: 0 0 48px; max-width: 36em; }
    .os { display: flex; flex-wrap: wrap; gap: 40px; align-items: stretch; }
    .os-tabs { flex: 1 1 300px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; min-width: 0; }
    .os-tab {
      display: flex; align-items: center; gap: 16px; text-align: left;
      border: 1.5px solid rgba(242,236,227,0.32); border-radius: 20px; padding: 16px 18px; cursor: pointer;
      background: rgba(242,236,227,0.06); color: var(--sand); transition: border-color 0.15s;
    }
    .os-tab[aria-selected="true"] { background: var(--cream); color: var(--ink); border-color: var(--cream); }
    .os-tab:hover { border-color: var(--cream); }
    .os-tab:focus-visible { outline: 3px solid var(--peach); outline-offset: 3px; }
    .os-num { flex: 0 0 auto; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; font-size: 15px; background: rgba(242,236,227,0.14); color: var(--cream); }
    .os-tab[aria-selected="true"] .os-num { background: var(--rust); color: #FFFFFF; }
    .os-text { flex: 1; min-width: 0; }
    .os-title { display: block; font-family: var(--serif); font-size: 22px; font-weight: 700; }
    .os-desc { display: block; font-size: 15px; line-height: 1.5; margin-top: 4px; opacity: 0.9; }
    .os-desc[hidden] { display: none; }
    .chev { flex: 0 0 auto; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: rgba(242,236,227,0.14); color: var(--cream); transition: background 0.15s; }
    .os-tab[aria-selected="true"] .chev { background: var(--ink); color: var(--cream); }
    .os-tab:hover .chev { background: var(--cream); color: var(--ink); }
    .os-panel { flex: 999 1 520px; min-width: 0; background: var(--cream); color: var(--text); border-radius: 32px; padding: 32px; box-sizing: border-box; display: flex; flex-direction: column; }
    .ws-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 28px; }
    .ws-title { font-weight: 700; font-size: 14px; color: var(--ink); letter-spacing: 0.06em; }
    .ws-faces { display: flex; flex: 0 0 auto; }
    .ws-faces span { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--cream); display: grid; place-items: center; font-size: 13px; font-weight: 700; }
    .ws-faces span + span { margin-left: -8px; }
    .os-view[hidden] { display: none; }
    .wcard { background: #FFFFFF; border-radius: 22px; padding: 28px; position: relative; border-top: 4px solid var(--rust); }
    .wcard .badge { top: -14px; background: var(--rust); }
    .wcard.olive { border-top-color: var(--olive); }
    .wcard.olive .badge { background: var(--olive); }
    .w-title { font-family: var(--serif); font-size: 26px; font-weight: 700; color: var(--ink); margin: 8px 0 2px; }
    .w-sub { margin: 0 0 20px; color: var(--muted); font-size: 15px; }
    .w-list { display: flex; flex-direction: column; gap: 10px; }
    .w-item { display: flex; gap: 12px; align-items: center; background: var(--cream); border-radius: 14px; padding: 12px 16px; }
    .w-item svg { flex: 0 0 auto; }
    .w-row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 4px 12px; background: var(--cream); border-radius: 14px; padding: 14px 18px; }
    .g-pill { font-size: 13px; font-weight: 700; padding: 3px 12px; border-radius: 999px; background: #FFFFFF; color: var(--text); border: 1px solid var(--dash); }
    .g-pill.claimed { background: var(--peach); color: #7A4519; border: 0; }
    .bars { display: flex; flex-direction: column; gap: 16px; }
    .bar-h { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0 12px; font-weight: 600; margin-bottom: 6px; }
    .bar-h small { font-size: inherit; font-weight: 500; color: var(--muted); }
    .bar { height: 12px; background: var(--cream); border-radius: 999px; }
    .bar i { display: block; height: 12px; background: var(--teal); border-radius: 999px; }
    .bar i.rust { background: var(--rust); }
    .ask { margin: 22px 0 0; background: var(--peach); border-radius: 18px 18px 18px 6px; padding: 12px 18px; font-weight: 600; display: inline-block; }
    .spork { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-end; }
    .spork-chat { flex: 1 1 260px; display: flex; flex-direction: column; gap: 12px; }
    .spork-chat p { background: #FFFFFF; border-radius: 22px 22px 22px 6px; padding: 18px 22px; box-shadow: 0 8px 20px rgba(31,45,42,0.08); }
    .spork-chat p.first { font-size: 18px; }
    .spork-chat p.me { margin-left: 40px; background: var(--teal); color: #FFFFFF; border-radius: 22px 22px 6px 22px; padding: 14px 20px; box-shadow: none; }
    .spork-fig { flex: 0 0 auto; display: block; width: 61px; }
    .spork-fig img { display: block; width: 100%; height: auto; }
    .how-cta { margin-top: 48px; }

    /* VALUE CREATION */
    .value { padding-top: 104px; padding-bottom: 104px; }
    .value-head { text-align: center; max-width: 820px; margin: 0 auto 56px; }
    .value-head h2 { font-size: clamp(34px, 4.4vw, 54px); line-height: 1.08; margin: 0 0 20px; }
    .pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 28px; }
    .pillar {
      display: flex; align-items: center; gap: 16px; text-align: left;
      border: 3px solid #FFFFFF; background: #FFFFFF; border-radius: 999px; padding: 12px 24px 12px 12px; cursor: pointer;
    }
    .pillar[aria-selected="true"] { background: var(--tint); border-color: var(--deep); }
    .p-num { width: 52px; height: 52px; border-radius: 50%; background: var(--deep); display: grid; place-items: center; flex: 0 0 auto; color: #FFFFFF; font-family: var(--serif); font-weight: 700; font-size: 22px; }
    .p-title { display: block; font-family: var(--serif); font-size: 22px; font-weight: 700; color: var(--ink); }
    .p-value { display: block; font-size: 14px; color: var(--body); }
    .ppanel { border-radius: 40px; padding: 48px; display: flex; flex-wrap: wrap; gap: 40px; align-items: center; background: var(--tint); }
    .ppanel[hidden] { display: none; }
    .pblob-col { flex: 0 1 260px; display: flex; justify-content: center; }
    .pblob { width: 220px; height: 220px; background: var(--deep); border-radius: 58% 42% 50% 50% / 50% 56% 44% 50%; display: grid; place-items: center; }
    .pblob span { font-family: var(--serif); font-variation-settings: "SOFT" 100; font-size: 40px; font-weight: 700; color: #FFFFFF; text-align: center; line-height: 1.05; white-space: pre-line; }
    .ptext { flex: 1 1 420px; min-width: 0; }
    .p-label { margin: 0 0 6px; font-weight: 700; color: var(--label); }
    .ptext h3 { font-family: var(--serif); font-size: 40px; line-height: 1.1; color: var(--ink); margin: 0 0 16px; }
    .p-desc { font-size: 18px; color: var(--text); margin: 0 0 24px; max-width: 34em; }
    .p-ex { display: flex; flex-wrap: wrap; gap: 10px; list-style: none; padding: 0; }
    .p-ex li { background: #FFFFFF; border-radius: 999px; padding: 8px 16px; font-size: 15px; font-weight: 600; color: var(--ink); }
    .value-close { font-family: var(--serif); font-size: 24px; line-height: 1.4; color: var(--ink); text-align: center; max-width: 760px; margin: 56px auto 0; }

    /* MESSY IS NORMAL */
    .messy { display: flex; flex-wrap: wrap; gap: 48px; align-items: center; }
    .messy-copy { flex: 1 1 460px; min-width: 0; }
    .messy h2 { margin: 0 0 36px; }
    .outcomes { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px 32px; }
    .outcomes h3 { font-family: var(--serif); font-size: 22px; color: var(--ink); margin: 0 0 6px; }
    .outcomes p { color: var(--body); }
    .quote { flex: 1 1 400px; min-width: 0; background: var(--peach); border-radius: 40px 40px 40px 8px; padding: 44px; }
    .quote svg { display: block; }
    .quote blockquote { margin: 20px 0 24px; font-family: var(--serif); font-size: 25px; line-height: 1.4; color: var(--ink); }
    .quote figcaption { font-weight: 700; color: var(--body); }

    /* BOOK */
    .book { display: flex; flex-wrap: wrap; gap: 56px; align-items: center; }
    .book-art { flex: 0 1 380px; display: flex; justify-content: center; position: relative; }
    .book-art::before { content: ""; position: absolute; inset: 8% 4% 4% 4%; background: var(--mint); border-radius: 52% 48% 44% 56% / 50% 46% 54% 50%; }
    .book-art img { position: relative; width: min(340px, 100%); height: auto; }
    .book-copy { flex: 1 1 460px; min-width: 0; }
    .book h2 { margin: 0 0 18px; }
    .book .lead { margin: 0 0 28px; max-width: 34em; }
    .book-btns { display: flex; flex-wrap: wrap; gap: 12px; }
    .book-btns .btn { padding: 14px 26px; }
    .review { margin: 40px 0 0; background: #FFFFFF; border-radius: 28px 28px 28px 8px; padding: 28px 30px; box-shadow: 0 16px 40px rgba(31,45,42,0.08); max-width: 38em; }
    .stars { display: flex; gap: 3px; margin-bottom: 12px; }
    .review-t { margin: 0 0 10px; font-family: var(--serif); font-size: 21px; font-weight: 700; line-height: 1.3; color: var(--ink); text-wrap: balance; }
    .review blockquote { margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: var(--body); }
    .review figcaption { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; font-size: 14px; color: var(--muted); }
    .review figcaption strong { color: var(--ink); }

    /* PRICING */
    .pricing { background: var(--sand); }
    .price-head { text-align: center; max-width: 1040px; margin: 0 auto 36px; }
    .price-head h2 { font-size: clamp(30px, 3.6vw, 46px); margin: 0 0 16px; }
    .price-head .lead { margin: 0 0 28px; }
    .billing { display: inline-flex; background: var(--cream); border-radius: 999px; padding: 6px; }
    .billing button { border: 0; border-radius: 999px; padding: 12px 26px; font-weight: 700; font-size: 15px; cursor: pointer; background: transparent; color: var(--body); }
    .billing button[aria-pressed="true"] { background: var(--ink); color: #FFFFFF; }
    .price-row { display: flex; flex-wrap: wrap; gap: 28px; align-items: stretch; justify-content: center; }
    .plan { flex: 1 1 380px; max-width: 480px; min-width: 0; background: #FFFFFF; border-radius: 36px; padding: 40px 36px; box-shadow: 0 24px 60px rgba(31,45,42,0.12); }
    .plan-price { font-family: var(--serif); color: var(--ink); }
    .plan-price .amt { font-size: 64px; font-weight: 700; line-height: 1; }
    .plan-price .unit { font-size: 22px; color: var(--muted); }
    .plan-note { margin: 8px 0 26px; color: var(--body); font-size: 16px; }
    .plan ul { list-style: none; margin: 0 0 30px; padding: 0; display: flex; flex-direction: column; gap: 14px; }
    .plan li { display: flex; gap: 12px; align-items: flex-start; }
    .plan li svg { flex: 0 0 auto; margin-top: 2px; }
    .plan .btn { display: block; }

    /* FAQ */
    .faq-wrap { max-width: 820px; }
    .faq h2 { margin: 0 0 36px; text-align: center; }
    .faq-list { display: flex; flex-direction: column; gap: 12px; }
    .faq-item { background: #FFFFFF; border-radius: 24px; }
    .faq-q { font: inherit; }
    .faq-q button {
      width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left;
      background: none; border: 0; padding: 22px 26px; cursor: pointer; border-radius: 24px;
      font-family: var(--serif); font-size: 21px; font-weight: 700; color: var(--ink);
    }
    .faq-q button > span:first-child { text-wrap: balance; }
    .faq-icon { width: 36px; height: 36px; border-radius: 50%; background: var(--cream); display: grid; place-items: center; flex: 0 0 auto; transition: transform 0.2s; }
    .faq-q button[aria-expanded="true"] .faq-icon { transform: rotate(45deg); }
    .faq-a { padding: 0 26px 24px; }
    .faq-a[hidden] { display: none; }
    .faq-a p { color: var(--body); max-width: 40em; }

    /* FINAL CTA */
    .final { padding: 0 var(--gutter) 96px; }
    .final-box { max-width: 1152px; margin: 0 auto; background: var(--ink); border-radius: 48px; padding: 80px 40px; text-align: center; position: relative; overflow: hidden; }
    .final-ring { position: absolute; left: 50%; bottom: -260px; transform: translateX(-50%); width: 520px; height: 520px; border-radius: 50%; border: 18px solid #2F4440; }
    .final-inner { position: relative; }
    .final h2 { font-size: clamp(34px, 4.6vw, 56px); line-height: 1.08; color: #FFFFFF; margin: 0 auto 18px; max-width: 14em; }
    .final .lead { color: var(--sand); margin: 0 0 36px; }
    .final .btn { font-size: 18px; padding: 20px 38px; }

    /* FOOTER */
    .foot { border-top: 1px solid var(--line); }
    .foot-in { padding-top: 40px; padding-bottom: 56px; display: flex; flex-wrap: wrap; gap: 20px 40px; justify-content: space-between; align-items: center; font-size: 15px; }
    .foot-in img { width: 130px; height: auto; }
    .foot-links { display: flex; flex-wrap: wrap; gap: 6px 24px; }
    .foot-links a { color: var(--body); }
    .foot-links a:hover { color: var(--teal); }
    .copy { color: var(--muted); }

    /* ---------- Responsive (the mockup is desktop only) ---------- */
    @media (min-width: 960px) {
      .hero-grid { flex-wrap: nowrap; }
    }
    @media (min-width: 960px) and (max-width: 1199px) {
      .chips-label { flex-basis: 100%; }
    }
    @media (min-width: 601px) {
      .hero-book em { white-space: nowrap; }
    }
    @media (max-width: 1023px) {
      .pblob-col { flex: 0 0 200px; }
      .pblob { width: 180px; height: 180px; }
      .pblob span { font-size: 32px; }
      .ptext { flex-basis: 320px; }
      .pillars { grid-template-columns: minmax(0, 1fr); max-width: 560px; margin-left: auto; margin-right: auto; }
    }
    @media (max-width: 959px) {
      .hero-grid { padding-top: 48px; padding-bottom: 72px; gap: 40px; }
      .hero-copy, .hero-visual { flex-basis: 100%; }
      .blob-a { right: -30%; top: auto; bottom: 48px; width: 110%; height: auto; aspect-ratio: 720 / 640; max-width: 720px; }
      .blob-b { right: auto; left: -40px; top: auto; bottom: 24px; }
    }
    @media (max-width: 900px) {
      :host { --nav-h: 73px; }
      .nav { flex-wrap: nowrap; gap: 12px; padding-top: 14px; padding-bottom: 14px; }
      .nav-links, .nav-actions .login { display: none; }
      .logo { margin-right: auto; }
      .menu-btn { display: grid; flex: 0 0 auto; }
    }
    @media (min-width: 901px) {
      .mobile-menu { display: none; }
    }
    @media (max-width: 860px) {
      .cards3 { grid-template-columns: minmax(0, 1fr); }
      .messy, .book { gap: 40px; }
      .book-art { flex: 1 1 100%; max-width: 340px; margin: 0 auto; }
      .book-art img { width: min(300px, 100%); }
    }
    @media (max-width: 767px) {
      .os-panel { flex-basis: 100%; }
    }
    @media (max-width: 600px) {
      :host { --gutter: clamp(16px, 5vw, 24px); }
      .page { font-size: 16px; }
      .pad { padding-top: 64px; padding-bottom: 64px; }
      .value { padding-top: 64px; padding-bottom: 64px; }
      .display { font-size: clamp(28px, 8.2vw, 34px); }
      .value-head h2 { font-size: clamp(30px, 8.6vw, 36px); }
      .price-head h2 { font-size: clamp(28px, 8vw, 34px); }
      .final h2 { font-size: clamp(30px, 8.6vw, 36px); }
      .lead { font-size: 17px; }
      .hero h1 { font-size: clamp(38px, 11.5vw, 48px); }
      .hero-grid { padding-top: 36px; padding-bottom: 56px; }
      .nav-cta { font-size: 14px; padding: 11px 18px; }
      .logo img { width: 136px; }
      .hero-ctas { gap: 12px; }
      .hero-ctas .btn { font-size: 16px; padding: 16px 20px; }
      .hero-ctas .btn-outline { padding: 14px 18px; }
      .photo { border-radius: 24px; }
      .seat-live { position: static; grid-row: 3; width: auto; }
      .seat-live:empty { display: none; }
      .chips-label { flex-basis: 100%; }
      .problem .lead, .shift h2 { margin-bottom: 32px; }
      .pcard, .scard { padding: 26px 24px; }
      .pcard .big { font-size: 56px; }
      .pcard h3, .scard h3 { font-size: 22px; }
      .compare { padding: 20px 16px 24px; border-radius: 26px; margin-top: 40px; }
      .msgs-body { padding: 16px 14px 14px; }
      .job { padding: 22px 18px 18px; }
      .job-t { font-size: 24px; line-height: 1.25; }
      .w-title, .outcomes h3, .scard h3, .favor { line-height: 1.25; }
      .favor { font-size: 20px; }
      .how .lead { margin-bottom: 32px; }
      .os { gap: 24px; }
      .os-tab { gap: 12px; padding: 14px; border-radius: 18px; }
      .os-title { font-size: 20px; }
      .os-panel { padding: 20px 14px; border-radius: 24px; }
      .ws-head { margin-bottom: 26px; }
      .ws-title { font-size: 12px; }
      .wcard { padding: 24px 16px 18px; }
      .w-title { font-size: 22px; }
      .w-item { padding: 12px; }
      .w-row { padding: 12px 14px; }
      .spork { justify-content: center; }
      .spork-chat p { padding: 14px 16px; }
      .spork-chat p.first { font-size: 16px; }
      .spork-chat p.me { margin-left: 24px; }
      .spork-fig { width: 42px; }
      .how-cta { margin-top: 32px; }
      .value-head { margin-bottom: 36px; }
      .pillar { padding: 8px 18px 8px 8px; gap: 12px; }
      .p-num { width: 44px; height: 44px; font-size: 20px; }
      .p-title { font-size: 19px; }
      .ppanel { padding: 32px 22px; gap: 24px; border-radius: 28px; }
      .pblob-col { flex-basis: 100%; }
      .pblob { width: 160px; height: 160px; }
      .pblob span { font-size: 30px; }
      .ptext h3 { font-size: 30px; }
      .p-desc { font-size: 16px; }
      .p-ex li { font-size: 14px; padding: 7px 14px; }
      .value-close { font-size: 20px; margin-top: 40px; }
      .messy h2 { margin-bottom: 28px; }
      .quote { padding: 30px 24px; border-radius: 30px 30px 30px 8px; }
      .quote blockquote { font-size: 20px; }
      .review { padding: 24px 20px; }
      .review-t { font-size: 19px; }
      .billing button { padding: 12px 16px; font-size: 14px; }
      .plan { padding: 32px 22px; border-radius: 28px; }
      .plan-price .amt { font-size: 56px; }
      .faq h2 { margin-bottom: 28px; }
      .faq-q button { padding: 18px 18px 18px 20px; font-size: 18px; }
      .faq-a { padding: 0 20px 20px; }
      .final { padding-bottom: 64px; }
      .final-box { padding: 56px 22px; border-radius: 32px; }
      .final-ring { width: 380px; height: 380px; bottom: -220px; border-width: 14px; }
      .final .btn { padding: 18px 32px; font-size: 17px; }
      .foot-in { padding-top: 32px; padding-bottom: 40px; flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 380px) {
      .nav-cta { display: none; }
      .hero-ctas .btn { flex: 1 1 100%; }
      .chip { padding: 8px 12px; }
      .btn { font-size: 16px; }
      .billing button { padding: 11px 12px; font-size: 13px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dt-pulse { animation: none; }
      .dot, .faq-icon, .os-tab, .chev, .btn { transition: none; }
    }
  `;

  const seatSpots = SEATS.map(
    (s) => `<button type="button" class="spot" data-seat="${s.id}" aria-pressed="false" aria-label="Show ${esc(s.short)}’s part on the team" style="left:${s.left};top:${s.top}"><span class="dot dt-pulse" style="background:${s.dot}"></span></button>`,
  ).join("");
  const seatChips = SEATS.map((s) => `<button type="button" class="chip" data-seat="${s.id}" aria-pressed="false">${esc(s.short)}</button>`).join("");

  const osTabs = TABS.map(
    (t, i) => `<button type="button" role="tab" class="os-tab" id="dt-tab-${t.id}" data-tab="${t.id}" aria-selected="false" aria-controls="dt-os-panel" tabindex="-1">
        <span class="os-num" aria-hidden="true">${i + 1}</span>
        <span class="os-text"><span class="os-title">${esc(t.title)}</span><span class="os-desc" hidden>${esc(t.desc)}</span></span>
        <span class="chev" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
      </button>`,
  ).join("");

  const pillarTabs = PILLARS.map(
    (p) => `<button type="button" role="tab" class="pillar" id="dt-pillar-${p.id}" data-pillar="${p.id}" aria-selected="false" aria-controls="dt-ppanel-${p.id}" tabindex="-1" style="--tint:${p.tint};--deep:${p.deep}">
        <span class="p-num" aria-hidden="true">${p.num}</span>
        <span><span class="p-title">${esc(p.title)}</span><span class="p-value">${esc(p.value)}</span></span>
      </button>`,
  ).join("");
  const pillarPanels = PILLARS.map(
    (p) => `<div role="tabpanel" class="ppanel" id="dt-ppanel-${p.id}" aria-labelledby="dt-pillar-${p.id}" hidden style="--tint:${p.tint};--deep:${p.deep};--label:${p.label}">
        <div class="pblob-col"><div class="pblob" aria-hidden="true"><span>${esc(p.blob)}</span></div></div>
        <div class="ptext">
          <p class="p-label">${esc(p.value)}</p>
          <h3>${esc(p.title)}</h3>
          <p class="p-desc">${esc(p.desc)}</p>
          <ul class="p-ex">${p.examples.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
        </div>
      </div>`,
  ).join("");

  const faqItems = FAQS.map(
    (f, i) => `<div class="faq-item">
        <h3 class="faq-q"><button type="button" id="dt-faq-q${i}" aria-expanded="false" aria-controls="dt-faq-a${i}">
          <span>${esc(f.q)}</span>
          <span class="faq-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v12M2 8h12" stroke="#1F2D2A" stroke-width="2" stroke-linecap="round"></path></svg></span>
        </button></h3>
        <div class="faq-a" id="dt-faq-a${i}" role="region" aria-labelledby="dt-faq-q${i}" hidden><p>${esc(f.a)}</p></div>
      </div>`,
  ).join("");

  const HTML = /* html */ `
  <div class="page">
    <header class="nav-bar">
      <nav class="wrap nav" aria-label="Main">
        <a class="logo" href="#top" data-scroll aria-label="Dinner Table home"><img src="${LOGO}" alt="Dinner Table" width="150" height="48"></a>
        <div class="nav-links">
          <a href="#how" data-scroll>How It Works</a>
          <a href="#value" data-scroll>Value Creation</a>
          <a href="#pricing" data-scroll>Pricing</a>
          <a href="#faq" data-scroll>FAQs</a>
        </div>
        <div class="nav-actions">
          <a class="login" data-link="login-url">Log In</a>
          <a class="btn btn-rust nav-cta" data-link="signup-url">Get started</a>
        </div>
        <button type="button" class="menu-btn" aria-expanded="false" aria-controls="dt-mobile-menu">
          <span class="sr-only">Menu</span>
          <svg class="i-open" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
          <svg class="i-close" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
        </button>
      </nav>
      <div class="mobile-menu" id="dt-mobile-menu" hidden>
        <a class="m-link" href="#how" data-scroll>How It Works</a>
        <a class="m-link" href="#value" data-scroll>Value Creation</a>
        <a class="m-link" href="#pricing" data-scroll>Pricing</a>
        <a class="m-link" href="#faq" data-scroll>FAQs</a>
        <div class="m-actions">
          <a class="btn btn-rust" data-link="signup-url">Get started</a>
          <a class="login" data-link="login-url">Log In</a>
        </div>
      </div>
    </header>

    <main>
    <section id="top" class="hero" tabindex="-1">
      <div class="blob-a" aria-hidden="true"></div>
      <div class="blob-b" aria-hidden="true"></div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <h1>Your family is a team. Run it like one.</h1>
          <p class="lead hero-lead">Dinner Table is a simple system for raising capable kids: a family meeting where everyone has a say, family jobs every kid owns, and paid gigs that teach them to&nbsp;earn.</p>
          <div class="hero-ctas">
            <a class="btn btn-rust" data-link="signup-url">Get started</a>
            <a class="btn btn-outline" href="#how" data-scroll>See how it works</a>
          </div>
          <p class="hero-note">About $1 a day. Cancel anytime.</p>
          <div class="hero-book">
            <svg width="36" height="44" viewBox="0 0 36 44" aria-hidden="true"><rect x="1" y="1" width="34" height="42" rx="3" fill="#2D6A6F"></rect><rect x="6" y="8" width="24" height="3" rx="1.5" fill="#F2ECE3"></rect><rect x="6" y="14" width="16" height="3" rx="1.5" fill="#F2ECE3"></rect></svg>
            <p>Built on Lee Benson’s Amazon bestseller, <em>Value Creation Family</em>.</p>
          </div>
        </div>
        <div class="hero-visual">
          <div class="photo" role="group" aria-label="Meet the team at the table">
            <img src="${HERO}" alt="A family laughing together over dinner at their kitchen table" width="1000" height="666">
            ${seatSpots}
          </div>
          <div class="chips">
            <span class="chips-label">Hover over each person, or pick:</span>
            ${seatChips}
          </div>
          <div class="seat-live" aria-live="polite"></div>
        </div>
      </div>
    </section>

    <section class="white">
      <div class="wrap pad problem">
        <h2 class="display">You’re not doing it wrong. You’re doing it without a system.</h2>
        <p class="lead">Most homes run on the same loop. Parents ask. Kids resist. Someone gives up and does it themselves. By bedtime, you feel less like a parent and more like the house manager.</p>
        <div class="cards3">
          <div class="pcard" style="background:#F3DEC8">
            <p class="big" aria-hidden="true">5×</p>
            <h3>Asked five times, then done by you.</h3>
            <p>The dishwasher, the shoes, the same question all over again.</p>
          </div>
          <div class="pcard" style="background:#D3E4E3">
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#2D6A6F"></circle><path d="M20 24h24M20 32h24M20 40h16" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"></path></svg>
            <h3>Every job lands on one person.</h3>
            <p>Lunches, permission slips, who fed the dog. It all comes back to you.</p>
          </div>
          <div class="pcard" style="background:#DFE3D2">
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><rect x="4" y="8" width="56" height="50" rx="10" fill="#5E6B4A"></rect><path d="M18 30l5 5 9-10" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"></path><path d="M38 30h10M38 42h10M18 42h10" stroke="#C9CFB6" stroke-width="3" stroke-linecap="round"></path></svg>
            <h3>The chart lasted three weeks.</h3>
            <p>Sticker charts and reward apps work for a while. Then everyone forgets they exist.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap pad shift">
        <h2 class="display">Not a daycare. Not a monarchy. A&nbsp;team.</h2>
        <div class="cards3">
          <div class="scard"><h3>The daycare home</h3><p>Parents do everything. Kids are cared for, but never counted on.</p></div>
          <div class="scard"><h3>The monarchy home</h3><p>Parents give orders. Kids obey or push back.</p></div>
          <div class="scard team"><h3>The team home</h3><p>Parents are the head coaches. Kids are players who help run the house, earn their own way, and build real-world skills.</p></div>
        </div>

        <div class="compare">
          <div class="toggle" role="group" aria-label="Compare before and after">
            <button type="button" data-view="before" aria-pressed="false" aria-controls="dt-before">Before</button>
            <button type="button" data-view="after" aria-pressed="true" aria-controls="dt-after">After</button>
          </div>
          <div id="dt-before" hidden>
            <div class="msgs" role="img" aria-label="Text messages from a parent to Maya about the dishwasher, including a photo of the piled-up sink, getting louder each time and left on read">
              <div class="msgs-head">
                <span class="avatar-m">M</span>
                <span class="msgs-who"><b>Maya</b><span>Messages</span></span>
              </div>
              <div class="msgs-body">
                <span class="time">Today 6:02 PM</span>
                <span class="bub">Dishwasher, please.</span>
                <img src="${SINK}" alt="" width="615" height="375">
                <span class="bub them">in a min</span>
                <span class="bub">Maya?</span>
                <span class="time">6:12 PM</span>
                <span class="bub them">doing homework rn</span>
                <span class="time">6:19 PM</span>
                <span class="bub loud">Hey. The dishwasher.</span>
                <span class="bub loud">I’m not asking again.</span>
                <span class="time">6:41 PM</span>
                <span class="bub louder">DISHWASHER.</span>
                <span class="read">Read 6:41 PM</span>
              </div>
            </div>
            <p class="asked">Asked five times. Done by you.</p>
          </div>
          <div id="dt-after">
            <div class="job">
              <span class="badge">ACTIVE</span>
              <p class="job-k">Maya’s family job</p>
              <p class="job-t">Empty the dishwasher</p>
              <p class="job-d">Picked at Sunday’s family meeting. On the plan where everyone can see it.</p>
              <p class="job-pill">Asked zero times this week</p>
            </div>
          </div>
          <p class="favor">It’s their job. Not a favor for&nbsp;you.</p>
        </div>
      </div>
    </section>

    <section id="how" class="how" tabindex="-1">
      <div class="wrap pad">
        <h2 class="display">An operating system for your home.</h2>
        <p class="lead">You run work, groceries and the carpool on a system. Dinner Table gives your home one too, so your family stops reacting and starts building something together.</p>
        <div class="os">
          <div class="os-tabs" role="tablist" aria-label="Parts of the system" aria-orientation="vertical">${osTabs}</div>
          <div class="os-panel" role="tabpanel" id="dt-os-panel" aria-labelledby="dt-tab-meeting">
            <div class="ws-head">
              <span class="ws-title">YOUR FAMILY WORKSPACE</span>
              <span class="ws-faces" aria-hidden="true"><span style="background:#9FD3D0">A</span><span style="background:#F3DEC8">M</span><span style="background:#DFE3D2">L</span></span>
            </div>

            <div class="os-view" data-view-for="meeting">
              <div class="wcard">
                <span class="badge">UPCOMING</span>
                <p class="w-title">Sunday family meeting</p>
                <p class="w-sub">20 minutes, everyone at the table</p>
                <div class="w-list">
                  <div class="w-item">${CHECK}<span>One win from each person this week</span></div>
                  <div class="w-item">${CHECK}<span>Check family goals and the budget</span></div>
                  <div class="w-item">${RING}<span>Pick next week’s family jobs and gigs</span></div>
                  <div class="w-item">${RING}<span>What kind of family do we want to be?</span></div>
                </div>
              </div>
            </div>

            <div class="os-view" data-view-for="jobs" hidden>
              <div class="wcard olive">
                <span class="badge">ACTIVE</span>
                <p class="w-title">Family jobs</p>
                <p class="w-sub">Unpaid, because we’re a team</p>
                <div class="w-list">
                  <div class="w-row"><strong>Maya</strong><span>Empty the dishwasher</span></div>
                  <div class="w-row"><strong>Leo</strong><span>Set the table</span></div>
                  <div class="w-row"><strong>Sam</strong><span>Feed the dog</span></div>
                </div>
              </div>
            </div>

            <div class="os-view" data-view-for="gigs" hidden>
              <div class="wcard olive">
                <span class="badge">ACTIVE</span>
                <p class="w-title">Open paid gigs</p>
                <p class="w-sub">Extra work kids choose to take on</p>
                <div class="w-list">
                  <div class="w-row"><span>Wash the car</span><span class="g-pill claimed">Claimed by Maya</span></div>
                  <div class="w-row"><span>Rake the leaves</span><span class="g-pill">Open</span></div>
                  <div class="w-row"><span>Clean the garage</span><span class="g-pill">Open</span></div>
                </div>
              </div>
            </div>

            <div class="os-view" data-view-for="budget" hidden>
              <div class="wcard">
                <span class="badge">IN PROGRESS</span>
                <p class="w-title">Our family budget</p>
                <p class="w-sub">Reviewed together at Sunday’s meeting</p>
                <div class="bars">
                  <div><div class="bar-h"><span>Groceries</span><span>70%</span></div><div class="bar"><i style="width:70%"></i></div></div>
                  <div><div class="bar-h"><span>Activities</span><span>45%</span></div><div class="bar"><i style="width:45%"></i></div></div>
                  <div><div class="bar-h"><span>Camping trip fund <small>(Maya’s idea)</small></span><span>30%</span></div><div class="bar"><i class="rust" style="width:30%"></i></div></div>
                </div>
                <p class="ask">“If I do two gigs a month, can we get there faster?”</p>
              </div>
            </div>

            <div class="os-view" data-view-for="spork" hidden>
              <div class="spork">
                <div class="spork-chat">
                  <p class="first">Hey! Ask me anything about Value Creation Family.</p>
                  <p class="me">We missed last week’s meeting. Where do we start?</p>
                  <p>No problem. Try a 10-minute catch-up tonight: one win each, then pick one family job for the week.</p>
                </div>
                <span class="spork-fig" role="img" aria-label="Spork, the Dinner Table guide"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="how-cta"><a class="btn btn-cream" data-link="signup-url">Get started</a></div>
      </div>
    </section>

    <section id="value" tabindex="-1">
      <div class="wrap value">
        <div class="value-head">
          <h2 class="display">Capability isn’t just what kids can do. It’s what they create.</h2>
          <p class="lead">Every family builds three things, whether they realize it or not. Capable kids add to all three. They contribute to the family instead of only consuming resources or following rules.</p>
        </div>
        <div class="pillars" role="tablist" aria-label="Three kinds of value">${pillarTabs}</div>
        ${pillarPanels}
        <p class="value-close">This isn’t about rigid discipline or perfection. It’s about giving kids real responsibility, so they grow into capable adults who actually like being around each other.</p>
      </div>
    </section>

    <section class="white">
      <div class="wrap pad messy">
        <div class="messy-copy">
          <h2 class="display">Messy is normal. Chaos is optional.</h2>
          <div class="outcomes">
            <div><h3>Less asking</h3><p>When it’s their job, not a favor for you, the reminders stop.</p></div>
            <div><h3>More teamwork</h3><p>Everyone at the table has a part, so the work stops being yours alone.</p></div>
            <div><h3>Kids who understand money</h3><p>Gigs and a shared budget show them where money comes from and where it goes.</p></div>
            <div><h3>A plan that sticks</h3><p>Not a quick fix. A first step this week, and a system that keeps working.</p></div>
          </div>
        </div>
        <figure class="quote">
          <svg width="48" height="36" viewBox="0 0 48 36" aria-hidden="true"><path d="M0 36V20C0 8 6 1 18 0v8c-6 1-9 5-9 12h9v16zm28 0V20c0-12 6-19 18-20v8c-6 1-9 5-9 12h9v16z" fill="#9C5A24"></path></svg>
          <blockquote>We are happy for the change we have seen in our children. This has given purpose to how we raise our children. Now our children are looking for things to do to help in the household.</blockquote>
          <figcaption>The Taylor Family</figcaption>
        </figure>
      </div>
    </section>

    <section>
      <div class="wrap pad book">
        <div class="book-art">
          <img src="${BOOK}" alt="Value Creation Family by Lee Benson, an Amazon bestseller" width="340" height="384">
        </div>
        <div class="book-copy">
          <h2 class="display">The playbook behind the system.</h2>
          <p class="lead">Dinner Table brings the method from Lee Benson’s Amazon bestseller, <em>Value Creation Family</em>, to your kitchen table, with a community of parents who have run it in their own homes.</p>
          <div class="book-btns">
            <a class="btn btn-outline" data-link="amazon-url">Get the book on Amazon</a>
            <a class="btn btn-outline" data-link="kindle-url">Get the book on Kindle</a>
          </div>
          <figure class="review">
            <div class="stars" role="img" aria-label="5 out of 5 stars">${STAR.repeat(5)}</div>
            <p class="review-t">Learn How to Raise Your Kids to Be Productive Community Members</p>
            <blockquote>“In it, you will find methods of logical, constructive parental behavior that you can put into action in regard to your children. If you do as the book suggests, you will teach your kids the proper values, including how to be confident, how to make a positive impact in their community, and how to be self-reliant.”</blockquote>
            <figcaption><strong>Steven Finkelstein</strong><span>Verified Kindle purchase · Amazon review</span></figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id="pricing" class="pricing" tabindex="-1">
      <div class="wrap pad">
        <div class="price-head">
          <h2 class="display">About $1 a day. Everything included.</h2>
          <p class="lead">One plan, one price, billed monthly or yearly.</p>
          <div class="billing" role="group" aria-label="Billing period">
            <button type="button" data-billing="monthly" aria-pressed="true">Monthly</button>
            <button type="button" data-billing="yearly" aria-pressed="false">Yearly, 2 months free</button>
          </div>
        </div>
        <div class="price-row">
          <div class="plan">
            <p class="plan-price" aria-live="polite"><span class="amt" data-p="daily">$1</span><span class="unit"> <span data-p="dailyUnit">a day</span></span></p>
            <p class="plan-note"><strong><span data-p="price">$30</span> <span data-p="per">a month</span></strong>. <span data-p="note">Billed monthly. Cancel anytime.</span></p>
            <ul>
              <li>${TICK}<span>Your family plan, jobs, gigs and goals in one place</span></li>
              <li>${TICK}<span>Spork, your step-by-step guide</span></li>
              <li>${TICK}<span>Live events with coaches, plus the full replay library</span></li>
              <li>${TICK}<span>A community of parents, day and night</span></li>
              <li>${TICK}<span>Practical guides on money, house rules and healthy struggles</span></li>
            </ul>
            <a class="btn btn-rust" data-link="signup-url">Get started</a>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="faq" tabindex="-1">
      <div class="wrap pad faq-wrap">
        <h2 class="display">Questions parents ask</h2>
        <div class="faq-list">${faqItems}</div>
      </div>
    </section>

    <section id="start" class="final" tabindex="-1">
      <div class="final-box">
        <div class="final-ring" aria-hidden="true"></div>
        <div class="final-inner">
          <h2 class="display">Your family’s system starts at the dinner table.</h2>
          <p class="lead">Pull up a chair. One conversation this week is all it takes to begin.</p>
          <a class="btn btn-cream" data-link="signup-url">Get started</a>
        </div>
      </div>
    </section>
    </main>

    <footer class="foot">
      <div class="wrap foot-in">
        <img src="${LOGO}" alt="Dinner Table" width="130" height="42">
        <nav class="foot-links" aria-label="Footer">
          <a href="#how" data-scroll>How It Works</a>
          <a href="#pricing" data-scroll>Pricing</a>
          <a data-link="about-url">About</a>
          <a data-link="resources-url">Free Resources</a>
          <a data-link="webinars-url">Webinars</a>
          <a data-link="contact-url">Contact</a>
          <a data-link="terms-url">Terms</a>
          <a data-link="privacy-url">Privacy</a>
        </nav>
        <span class="copy">© 2026 Dinner Table. All rights reserved.</span>
      </div>
    </footer>
  </div>`;

  const reducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Where the Spork images sit: beside this script (dist/), or the pinned
  // jsDelivr folder when the script was loaded some other way.
  const ASSET_BASE = (() => {
    const src = document.currentScript && document.currentScript.src;
    return src ? new URL(".", src).href : "__ASSET_BASE__";
  })();

  class DtHomepage extends HTMLElement {
    static get observedAttributes() {
      return Object.keys(LINKS);
    }

    connectedCallback() {
      if (this.shadowRoot) return;
      ensureFonts();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `<style>${CSS}</style>${HTML}`;
      this._root = root;
      this._seat = null;

      this._applyLinks();
      root.addEventListener("click", (e) => this._onClick(e));

      // Nav + mobile menu
      this._menuBtn = root.querySelector(".menu-btn");
      this._menu = root.getElementById("dt-mobile-menu");
      this._menuBtn.addEventListener("click", () => this._setMenu(this._menuBtn.getAttribute("aria-expanded") !== "true"));
      root.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this._menuBtn.getAttribute("aria-expanded") === "true") {
          this._setMenu(false);
          this._menuBtn.focus();
        }
      });
      this._mq = window.matchMedia("(min-width: 901px)");
      const closeOnWide = () => this._mq.matches && this._setMenu(false);
      this._mq.addEventListener ? this._mq.addEventListener("change", closeOnWide) : this._mq.addListener(closeOnWide);

      // Hero: meet the team
      root.querySelectorAll("[data-seat]").forEach((b) => {
        const pick = () => this._pickSeat(b.dataset.seat);
        b.addEventListener("click", pick);
        b.addEventListener("mouseenter", pick);
        if (b.classList.contains("spot")) b.addEventListener("focus", pick);
      });

      // Before / after
      root.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => this._setView(b.dataset.view)));

      // Tabs
      this._tabs(root.querySelector(".os-tabs"), "[data-tab]", (id, c) => this._setTab(id, c), true);
      this._tabs(root.querySelector(".pillars"), "[data-pillar]", (id) => this._setPillar(id), false);
      this._setTab("meeting");
      this._setPillar("money");

      // Pricing
      root.querySelectorAll("[data-billing]").forEach((b) => b.addEventListener("click", () => this._setBilling(b.dataset.billing)));

      // FAQ: one open at a time, the first open to start (as in the mockup)
      this._faqBtns = [...root.querySelectorAll(".faq-q button")];
      this._faqBtns.forEach((b, i) => b.addEventListener("click", () => this._setFaq(b.getAttribute("aria-expanded") === "true" ? -1 : i)));
      this._setFaq(0);
    }

    attributeChangedCallback() {
      if (this._root) this._applyLinks();
    }

    _applyLinks() {
      this._root.querySelectorAll("[data-link]").forEach((a) => {
        const name = a.dataset.link;
        const url = (this.getAttribute(name) || LINKS[name] || "").trim();
        if (url && url !== "#") {
          a.href = url;
          a.target = "_top";
          a.removeAttribute("data-pending");
        } else {
          a.href = "#";
          a.removeAttribute("target");
          a.setAttribute("data-pending", "");
        }
      });
    }

    _onClick(e) {
      const a = e.target.closest && e.target.closest("a");
      if (!a) return;
      if (a.hasAttribute("data-pending")) {
        e.preventDefault();
        return;
      }
      if (a.hasAttribute("data-scroll")) {
        e.preventDefault();
        const target = this._root.getElementById(a.getAttribute("href").slice(1));
        this._setMenu(false);
        if (!target) return;
        target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
        target.focus({ preventScroll: true });
      }
    }

    _setMenu(open) {
      if (!this._menuBtn) return;
      this._menuBtn.setAttribute("aria-expanded", String(open));
      this._menu.hidden = !open;
    }

    _pickSeat(id) {
      if (this._seat === id) return;
      this._seat = id;
      const s = SEATS.find((x) => x.id === id);
      this._root.querySelectorAll("[data-seat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.seat === id)));
      const live = this._root.querySelector(".seat-live");
      live.style.left = s.cardLeft;
      live.style.top = s.cardTop;
      live.innerHTML = `<div class="seat-card">
          <span class="seat-role" style="background:${s.pillBg}">${esc(s.role)}</span>
          <p class="seat-name">${esc(s.name)}</p>
          ${s.rows.map(([k, v]) => `<p class="seat-row"><strong>${esc(k)}</strong> ${esc(v)}</p>`).join("")}
        </div>`;
    }

    _setView(view) {
      this._root.querySelectorAll("[data-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
      this._root.getElementById("dt-before").hidden = view !== "before";
      this._root.getElementById("dt-after").hidden = view !== "after";
    }

    // Tablist with roving tabindex and arrow-key selection.
    _tabs(list, sel, onPick, vertical) {
      const tabs = () => [...list.querySelectorAll(sel)];
      list.addEventListener("click", (e) => {
        const t = e.target.closest(sel);
        if (t) onPick(t.dataset.tab || t.dataset.pillar, true);
      });
      list.addEventListener("keydown", (e) => {
        const all = tabs();
        const i = all.indexOf(e.target.closest(sel));
        if (i < 0) return;
        const prev = vertical ? ["ArrowUp", "ArrowLeft"] : ["ArrowLeft", "ArrowUp"];
        const next = vertical ? ["ArrowDown", "ArrowRight"] : ["ArrowRight", "ArrowDown"];
        let j = -1;
        if (next.includes(e.key)) j = (i + 1) % all.length;
        else if (prev.includes(e.key)) j = (i - 1 + all.length) % all.length;
        else if (e.key === "Home") j = 0;
        else if (e.key === "End") j = all.length - 1;
        if (j < 0) return;
        e.preventDefault();
        onPick(all[j].dataset.tab || all[j].dataset.pillar);
        all[j].focus();
      });
    }

    // The app's blinking Spork (Paeng, Oct 23), as on the Lovable homepage.
    // The ~800KB animation is only fetched once the Spork tab opens; with
    // reduced motion it's the still first frame.
    _loadSpork() {
      const fig = this._root.querySelector(".spork-fig");
      if (!fig || fig.firstChild) return;
      const img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      img.src = ASSET_BASE + (reducedMotion() ? "spork-blinking-poster.webp" : "spork-blinking.webp");
      fig.append(img);
    }

    _setTab(id, fromClick) {
      const root = this._root;
      root.querySelectorAll("[data-tab]").forEach((t) => {
        const on = t.dataset.tab === id;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        t.querySelector(".os-desc").hidden = !on;
      });
      root.querySelectorAll("[data-view-for]").forEach((v) => (v.hidden = v.dataset.viewFor !== id));
      if (id === "spork") this._loadSpork();
      const panel = root.getElementById("dt-os-panel");
      panel.setAttribute("aria-labelledby", "dt-tab-" + id);
      // When the tabs sit above the panel (narrow screens), bring the panel into view.
      if (fromClick) {
        const list = root.querySelector(".os-tabs");
        if (panel.offsetTop > list.offsetTop + 10) {
          const r = panel.getBoundingClientRect();
          if (r.top > window.innerHeight - 120) panel.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "nearest" });
        }
      }
    }

    _setPillar(id) {
      this._root.querySelectorAll("[data-pillar]").forEach((t) => {
        const on = t.dataset.pillar === id;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      this._root.querySelectorAll(".ppanel").forEach((p) => (p.hidden = p.id !== "dt-ppanel-" + id));
    }

    _setBilling(period) {
      const p = PRICES[period];
      this._root.querySelectorAll("[data-billing]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.billing === period)));
      this._root.querySelectorAll("[data-p]").forEach((el) => (el.textContent = p[el.dataset.p]));
    }

    _setFaq(idx) {
      this._faqBtns.forEach((b, i) => {
        const on = i === idx;
        b.setAttribute("aria-expanded", String(on));
        this._root.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
    }
  }

  customElements.define(TAG, DtHomepage);
})();
