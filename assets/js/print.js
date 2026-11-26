/* Nyomtatható meghívó – formátumváltás és előnézet-méretezés */
(() => {
  "use strict";

  const body = document.body;
  const sheets = document.getElementById("sheets");
  const preview = document.getElementById("preview");
  const pageStyle = document.getElementById("page-size");
  const fronts = sheets.querySelector(".sheet--front");
  const backs = sheets.querySelector(".sheet--back");
  const PAGE = {
    a6: "@page { size: 105mm 148mm; margin: 0; }",
    a4: "@page { size: A4 portrait; margin: 0; }",
  };

  function setFormat(format) {
    // korábbi másolatok törlése
    sheets.querySelectorAll(".card[data-clone]").forEach((c) => c.remove());
    if (format === "a4") {
      for (const sheet of [fronts, backs]) {
        const card = sheet.querySelector(".card");
        for (let i = 0; i < 3; i++) {
          const clone = card.cloneNode(true);
          clone.dataset.clone = "";
          clone.setAttribute("aria-hidden", "true");
          sheet.append(clone);
        }
      }
    }
    body.classList.toggle("format-a4", format === "a4");
    body.classList.toggle("format-a6", format === "a6");
    pageStyle.textContent = PAGE[format];
    try { localStorage.setItem("print-format", format); } catch { /* nem baj */ }
    fit();
  }

  // képernyős előnézet: az ívek beférjenek a képernyőbe
  function fit() {
    sheets.style.zoom = "";
    const available = preview.clientWidth - 32;
    const natural = sheets.scrollWidth;
    const scale = Math.min(1, available / natural);
    sheets.style.zoom = String(scale);
  }

  const doPrint = async () => {
    try { await document.fonts.ready; } catch { /* régi böngésző */ }
    window.print();
  };

  let saved = "a6";
  try { saved = localStorage.getItem("print-format") || "a6"; } catch { /* nem baj */ }
  const radio = document.querySelector(`input[name="format"][value="${saved}"]`);
  if (radio) radio.checked = true;

  document.querySelectorAll('input[name="format"]').forEach((input) =>
    input.addEventListener("change", () => {
      const change = () => setFormat(input.value);
      if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.startViewTransition(change);
      } else change();
    })
  );
  document.getElementById("print-btn").addEventListener("click", doPrint);
  addEventListener("resize", fit, { passive: true });
  addEventListener("beforeprint", () => { sheets.style.zoom = ""; });
  addEventListener("afterprint", fit);

  setFormat(saved === "a4" ? "a4" : "a6");
})();
