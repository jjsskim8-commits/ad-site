/**
 * 공통 헤더·푸터 주입 (commons.css 클래스와 동일 마크업)
 * 스크립트 위치(adsite/assets/js/layout.js) 기준으로 사이트 루트(adsite/) URL을 잡아
 * 모든 링크를 절대 URL로 풀어 file://·서브경로 배포 모두에서 동작하게 합니다.
 */
(function () {
  (function injectHeadHints() {
    var head = document.head;
    if (!head) return;
    [
      ["preconnect", "https://cdn.jsdelivr.net", "anonymous"],
      ["preconnect", "https://pagead2.googlesyndication.com", ""],
      ["dns-prefetch", "https://wcs.pstatic.net", ""],
    ].forEach(function (row) {
      var rel = row[0];
      var href = row[1];
      var cross = row[2];
      var exists = head.querySelector('link[rel="' + rel + '"][href="' + href + '"]');
      if (exists) return;
      var l = document.createElement("link");
      l.rel = rel;
      l.href = href;
      if (cross) l.crossOrigin = cross;
      head.appendChild(l);
    });
  })();

  function getLayoutScriptUrl() {
    var el = document.currentScript;
    if (el && el.src) return el.src;
    var nodes = document.querySelectorAll("script[src]");
    for (var i = nodes.length - 1; i >= 0; i--) {
      var src = nodes[i].getAttribute("src") || "";
      if (src.indexOf("layout.js") !== -1) {
        return new URL(src, window.location.href).href;
      }
    }
    return "";
  }

  var layoutScriptUrl = getLayoutScriptUrl();
  if (!layoutScriptUrl) return;

  var siteRootUrl = new URL("../../", layoutScriptUrl).href;

  function pageHref(relPath) {
    return new URL(relPath.replace(/^\//, ""), siteRootUrl).href;
  }

  function resolveTemplate(html) {
    return html.replace(/\{\{LINK:([^}]+)\}\}/g, function (_, rel) {
      return pageHref(rel.trim());
    });
  }

  function setCurrentNav() {
    var current = document.body.getAttribute("data-nav-current");
    if (!current) return;
    var link = document.querySelector(
      '.nav__link[data-nav-key="' + current + '"]'
    );
    if (link) link.classList.add("nav__link--current");
  }

  var headerTpl =
    '<header class="header" role="banner">' +
    '<div class="header__inner">' +
    '<div class="header__brand">' +
    '<a class="header__logo" href="{{LINK:index.html}}">조용한 성장 가이드</a>' +
    '<p class="header__tagline">내향형 개발 적응·공부 루틴 정보집 (jfine.kr)</p>' +
    "</div>" +
    '<button type="button" class="header__menu-btn" aria-expanded="false" aria-controls="site-nav">메뉴</button>' +
    '<nav class="nav" id="site-nav" aria-label="주요 메뉴">' +
    '<ul class="nav__list">' +
    '<li class="nav__item"><a class="nav__link" data-nav-key="bootcamp" href="{{LINK:category/bootcamp.html}}">부트캠프 적응</a></li>' +
    '<li class="nav__item"><a class="nav__link" data-nav-key="study" href="{{LINK:category/study.html}}">공부 루틴</a></li>' +
    '<li class="nav__item"><a class="nav__link" data-nav-key="collaboration" href="{{LINK:category/collaboration.html}}">협업 가이드</a></li>' +
    '<li class="nav__item"><a class="nav__link" data-nav-key="workplace" href="{{LINK:category/workplace.html}}">직장 적응</a></li>' +
    '<li class="nav__item"><a class="nav__link" data-nav-key="articles" href="{{LINK:category/articles.html}}">글 모음</a></li>' +
    '<li class="nav__item"><a class="nav__link" data-nav-key="contact" href="{{LINK:contact.html}}">문의하기</a></li>' +
    "</ul></nav></div></header>";

  var footerTpl =
    '<footer class="footer" role="contentinfo">' +
    '<div class="footer__inner">' +
    '<p class="footer__copyright">&copy; 2026 조용한 성장 가이드 · <a href="mailto:jjsskim8@gmail.com">jjsskim8@gmail.com</a></p>' +
    '<div class="footer__links">' +
    '<a href="{{LINK:terms.html}}">이용약관</a>' +
    '<a href="{{LINK:privacy.html}}">개인정보처리방침</a>' +
    '<a href="{{LINK:contact.html}}">문의하기</a>' +
    "</div>" +
    "</div></footer>";

  var headerMount = document.getElementById("site-header-mount");
  var footerMount = document.getElementById("site-footer-mount");

  if (headerMount) {
    headerMount.outerHTML = resolveTemplate(headerTpl);
  }
  if (footerMount) {
    footerMount.outerHTML = resolveTemplate(footerTpl);
  }

  setCurrentNav();

  window.dispatchEvent(new Event("siteLayoutReady"));
})();
