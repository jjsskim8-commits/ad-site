/**
 * 모바일 메뉴 토글
 * commons.css와 함께 동작 (768px 이하에서 .nav.is-open)
 * layout.js가 헤더를 주입한 뒤 siteLayoutReady에서 초기화
 */
(function () {
  function initMobileNav() {
    var btn = document.querySelector(".header__menu-btn");
    var nav = document.getElementById("site-nav");
    if (!btn || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
    }

    setOpen(false);

    btn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          setOpen(false);
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    });

    document.addEventListener("click", function (event) {
      if (window.innerWidth > 900) return;
      if (!nav.classList.contains("is-open")) return;
      if (event.target === btn || btn.contains(event.target)) return;
      if (nav.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  if (document.getElementById("site-nav")) {
    initMobileNav();
  } else {
    window.addEventListener("siteLayoutReady", initMobileNav, { once: true });
  }
})();
