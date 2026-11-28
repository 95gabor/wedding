# Esküvői meghívó · 2026. december 5.

Statikus meghívó-weboldal GitHub Pages-re. Nincs build-lépés és nincs futásidejű függőség: sima HTML, CSS és natív JS.

- **`index.html`**: a meghívó (boríték-intró, visszaszámláló, program, helyszínek, naptár)
- **`nyomtathato.html`**: nyomtatható kártya, **A6** (105×148 mm, elő- és hátlap) vagy **A4, 4 db/lap** (vágójelekkel, kétoldalas nyomtatáshoz)
- **`eskuvo.ics`**: naptárfájl a két eseménnyel (szertartás 15:00, vacsora 16:00–22:00) és emlékeztetőkkel

## Testreszabás

A nevek (Sziszi & Gábor) az `index.html`-ben (`hero__names`, title, meta), a `nyomtathato.html`-ben (`f-names`, `b-sign`) és az `eskuvo.ics`-ben szerepelnek.

A QR-kód (`assets/img/qr.svg`) a `https://95gabor.github.io/wedding/` címre mutat. Saját domain esetén újra kell generálni, és át kell írni az `og:url`/`og:image` meta tageket és az `.ics` fájlban az URL-t is.

## Nyelvek (magyar / angol)

- A nyelv sorrendben: `?lang=hu|en` az URL-ben → a látogató korábbi választása → a böngésző nyelve (magyar böngészőnél magyar, minden másnál angol).
- A felső sávban HU / EN váltó van, a választást az oldal megjegyzi (a nyomtatható oldalon is).
- A magyar szöveg maga a HTML; az angol fordítás az `assets/js/i18n.js` fájlban van (`data-i18n` kulcsok szerint).
- Angol naptárfájl: `eskuvo-en.ics`; a Google Naptár linkeknek is van angol változata.
- Közvetlen angol link: `https://95gabor.github.io/wedding/?lang=en`

## Közzététel (GitHub Pages)

1. Merge-öld a `main` ágba.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. A `.github/workflows/pages.yml` minden `main`-re pusholáskor kirakja az oldalt.

Használt action-verziók (2026. november, mind a legfrissebb major): `actions/checkout@v7`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`.

## Helyi előnézet

```sh
python3 -m http.server 8000
# http://localhost:8000          (?nointro – boríték kihagyása)
```

## Technika

- Képek AVIF + WebP formátumban, `srcset`-tel
- Cross-document **View Transitions** az oldalak között, **scroll-driven animáció** (idővonal), JS-tartalékkal ott, ahol a böngésző nem támogatja
- `prefers-reduced-motion` esetén az animációk kikapcsolnak
- Betűk: Cormorant Garamond, Great Vibes, Jost (Google Fonts, `latin-ext`, tehát van ő/ű)
