/* Kétnyelvűség (magyar / angol)
 * A magyar szöveg maga a HTML; itt csak az angol fordítás van.
 * Jelölés a HTML-ben:
 *   data-i18n="kulcs"            → szöveg
 *   data-i18n-html="kulcs"       → HTML-tartalom (pl. <em>, <br>)
 *   data-i18n-attr="alt:kulcs;aria-label:kulcs2" → attribútumok
 */
(() => {
  "use strict";

  const EN = {
    /* ---------- főoldal ---------- */
    "meta.title": "Sziszi & Gábor · Wedding · 5 December 2026",
    "meta.description": "Sziszi and Gábor are getting married! 5 December 2026, 3 pm · Veszprém City Hall – followed by dinner at Betekints Restaurant.",
    "skip": "Skip to content",
    "envelope.kicker": "Invitation",
    "envelope.open": "Open the invitation",
    "envelope.hint": "Tap the seal",
    "envelope.skip": "Skip",
    "nav.top": "Back to top",
    "nav.label": "Main navigation",
    "nav.program": "Schedule",
    "nav.menu": "Menu",
    "nav.venues": "Venues",
    "nav.calendar": "Calendar",
    "nav.print": "Print",
    "hero.kicker": "We're getting married!",
    "date.weekday": "Saturday",
    "date.long": "5 December 2026",
    "hero.calendar": "Add to calendar",
    "hero.details": "Details",
    "hero.alt": "Illustration of Sziszi and Gábor hugging",
    "hero.scroll": "Scroll down",
    "invite.lead": "We warmly invite <em>you and your family</em><br>to the most beautiful day of our lives – our wedding.",
    "invite.quote": "As we set out on our journey together, we'd love to have you by our side.",
    "countdown.title": "Counting down",
    "countdown.days": "days",
    "countdown.hours": "hours",
    "countdown.minutes": "minutes",
    "countdown.seconds": "seconds",
    "countdown.done": "Today is the big day! 💍",
    "program.kicker": "The big day",
    "program.title": "Schedule",
    "program.ceremony": "Civil ceremony",
    "program.ceremonyPlace": "Veszprém City Hall – Wedding Hall",
    "program.ceremonyNote": "Please arrive a few minutes early.",
    "program.dinner": "Wedding dinner",
    "program.dinnerPlace": "Betekints Restaurant",
    "program.dinnerNote": "Dinner, toasts and good conversation – let's celebrate together.",
    "program.menuLink": "See the menu",
    "menu.kicker": "Wedding dinner",
    "menu.title": "Menu",
    "menu.starter": "Starter",
    "menu.soup": "Soup",
    "menu.mains": "Main courses",
    "menu.sides": "Sides",
    "menu.pickles": "Pickles & salads",
    "menu.dessert": "Dessert",
    "menu.antipasti": "Antipasti with fresh baguette and Serrano ham",
    "menu.chickenSoup": "Traditional chicken soup",
    "menu.schnitzel": "Veal Wiener schnitzel",
    "menu.kiev": "Chicken Kiev",
    "menu.cornflakes": "Cornflake-crusted chicken breast stuffed with cheddar and ham",
    "menu.tenderloin": "Bacon-wrapped pork tenderloin medallions <small>with creamy mushroom sauce</small>",
    "menu.grillCheese": "Grilled homemade cheese",
    "menu.mushrooms": "Grilled mushrooms stuffed with feta",
    "menu.potatoes": "Sautéed potatoes",
    "menu.vegetables": "Steamed vegetables",
    "menu.rice": "Jasmine rice",
    "menu.bulgur": "Bulgur salad",
    "menu.gherkins": "Gherkins",
    "menu.cucumberSalad": "Cucumber salad with sour cream",
    "menu.mixedPickles": "Homemade mixed pickles",
    "menu.cake": "Cake",
    "menu.cups": "Dessert cups",
    "menu.snacks": "Savoury snacks",
    "menu.enjoy": "Bon appétit!",
    "venues.kicker": "Where to find us",
    "venues.title": "Venues",
    "venues.cityHall": "Veszprém City Hall",
    "venues.cityHallSub": "Wedding Hall",
    "venues.restaurant": "Betekints Restaurant",
    "venues.restaurantSub": "Wedding dinner",
    "venues.map": "Map",
    "venues.appleMaps": "Apple Maps",
    "venues.copy": "Copy address",
    "calendar.title": "Add it to your calendar!",
    "calendar.text": "One click and you won't forget – save both events (ceremony and dinner) with reminders.",
    "calendar.icsHref": "eskuvo-en.ics",
    "calendar.icsName": "wedding-2026-12-05.ics",
    "calendar.googleCeremony": "Google · ceremony",
    "calendar.googleDinner": "Google · dinner",
    "calendar.googleCeremonyHref": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sziszi+%26+G%C3%A1bor%27s+wedding+%E2%80%93+civil+ceremony&dates=20261205T140000Z%2F20261205T150000Z&location=Veszpr%C3%A9m+City+Hall+%28Polg%C3%A1rmesteri+Hivatal%29+%E2%80%93+Wedding+Hall%2C+%C3%93v%C3%A1ros+t%C3%A9r+9.%2C+8200+Veszpr%C3%A9m&details=Civil+ceremony+at+Veszpr%C3%A9m+City+Hall.+Followed+by+dinner+at+Betekints+Restaurant.&ctz=Europe%2FBudapest",
    "calendar.googleDinnerHref": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sziszi+%26+G%C3%A1bor%27s+wedding+%E2%80%93+dinner+%28Betekints+Restaurant%29&dates=20261205T150000Z%2F20261205T210000Z&location=Betekints+Restaurant%2C+Veszpr%C3%A9mv%C3%B6lgyi+u.+4.%2C+8200+Veszpr%C3%A9m&details=Wedding+dinner+from+4+pm+to+10+pm.&ctz=Europe%2FBudapest",
    "closing.alt": "Sziszi and Gábor with their bunnies",
    "closing.title": "We can't wait to see you!",
    "closing.text": "Our celebration won't be complete without you.",
    "closing.print": "Printable invitation",
    "footer": "Sziszi & Gábor · 5 December 2026 · Veszprém",

    /* ---------- nyomtatható oldal ---------- */
    "print.title": "Sziszi & Gábor · Printable invitation",
    "print.back": "Back",
    "print.formatLabel": "Print format",
    "print.a6": "A6 card",
    "print.a4": "A4 · 4 per sheet",
    "print.print": "Print",
    "print.hint": "When printing: <b>scale 100%</b> (not “fit to page”), <b>background graphics on</b>, and for double-sided printing <b>flip on long edge</b>.",
    "print.frontLabel": "Invitation front",
    "print.backLabel": "Invitation back",
    "print.kicker": "We're getting married",
    "print.alt": "Illustration of the couple",
    "print.meta": "Saturday · 3 pm · Veszprém",
    "print.backTitle": "Invitation",
    "print.lead": "We warmly invite you and your family to the most beautiful day of our lives – our wedding.",
    "print.ceremony": "Civil ceremony",
    "print.ceremonyPlace": "Veszprém City Hall – Wedding Hall",
    "print.dinner": "Wedding dinner",
    "print.dinnerPlace": "Betekints Restaurant",
    "print.qrAlt": "QR code linking to the invitation website",
    "print.qrText": "Map, calendar and all the details:",
    "print.sign": "We can't wait to see you!",
  };

  /* csak JS-ből használt szövegek */
  const STRINGS = {
    hu: { "toast.copied": "Cím a vágólapon ✓" },
    en: { "toast.copied": "Address copied ✓" },
  };

  const root = document.documentElement;
  const originals = new WeakMap(); // elem → { text, html, attrs:{} } (magyar eredeti)

  const remember = (el) => {
    if (!originals.has(el)) originals.set(el, { text: el.textContent, html: el.innerHTML, attrs: {} });
    return originals.get(el);
  };

  const parseAttrs = (spec) =>
    spec.split(";").map((p) => p.split(":").map((x) => x.trim())).filter(([a, k]) => a && k);

  function apply(lang) {
    const en = lang === "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const orig = remember(el);
      const val = en ? EN[el.dataset.i18n] : null;
      el.textContent = val ?? orig.text;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const orig = remember(el);
      const val = en ? EN[el.dataset.i18nHtml] : null;
      el.innerHTML = val ?? orig.html;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const orig = remember(el);
      for (const [attr, key] of parseAttrs(el.dataset.i18nAttr)) {
        if (!(attr in orig.attrs)) orig.attrs[attr] = el.getAttribute(attr);
        const val = en ? EN[key] : null;
        el.setAttribute(attr, val ?? orig.attrs[attr]);
      }
    });

    root.lang = lang;
    document.querySelectorAll("[data-lang]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang))
    );
    root.classList.remove("i18n-pending");
  }

  const i18n = {
    lang: root.lang === "en" ? "en" : "hu",
    t: (key) => STRINGS[i18n.lang]?.[key] ?? STRINGS.hu[key] ?? key,
    set(lang, { animate = true } = {}) {
      if (lang !== "hu" && lang !== "en") return;
      i18n.lang = lang;
      try { localStorage.setItem("lang", lang); } catch { /* privát mód */ }

      // ha az URL-ben ?lang= van, tartsuk szinkronban
      const url = new URL(location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", lang);
        history.replaceState(history.state, "", url);
      }

      const run = () => {
        apply(lang);
        document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
      };
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (animate && document.startViewTransition && !reduced) document.startViewTransition(run);
      else run();
    },
  };
  window.i18n = i18n;

  document.querySelectorAll("[data-lang]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.dataset.lang !== i18n.lang) i18n.set(btn.dataset.lang);
    })
  );

  apply(i18n.lang);
})();
