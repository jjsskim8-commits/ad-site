/**
 * 모바일 메뉴 토글
 * commons.css와 함께 동작 (768px 이하에서 .nav.is-open)
 */
(function () {
  var btn = document.querySelector(".header__menu-btn");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

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
    if (window.innerWidth > 768) {
      setOpen(false);
    }
  });
})();
