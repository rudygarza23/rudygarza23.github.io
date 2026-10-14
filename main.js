// Shared behavior across all pages.

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".navtoggle");
  const links = document.querySelector(".navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Highlight the current page in nav
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach((a) => {
    const target = a.getAttribute("href");
    if (target === here || (here === "" && target === "index.html")) {
      a.classList.add("active");
    }
  });

  // Print button (used on resume.html)
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  // Copy-to-clipboard buttons (used on links.html)
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const val = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(val);
        const label = btn.querySelector(".copy-label");
        if (label) {
          const original = label.textContent;
          label.textContent = "copied";
          setTimeout(() => (label.textContent = original), 1400);
        }
      } catch (e) {
        /* clipboard unavailable - fail silently */
      }
    });
  });
});
