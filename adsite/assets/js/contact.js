/**
 * Netlify Forms: fetch 대신 form을 숨김 iframe으로 제출합니다.
 * 네이티브 POST만 Netlify가 필드 저장과 연결하는 경우가 확실합니다.
 */
(function () {
  var form = document.getElementById("contact-form");
  var iframe = document.getElementById("netlify-form-iframe");
  var modal = document.getElementById("contact-success-modal");
  var errorEl = document.getElementById("contact-form-error");
  if (!form) return;

  var submitBtn = form.querySelector('button[type="submit"]');
  var submitDefaultText = submitBtn ? submitBtn.textContent : "문의 보내기";
  var pendingSubmit = false;
  var failTimer;

  function showModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var focusTarget =
      modal.querySelector(".contact-modal__close") ||
      modal.querySelector("[data-close]");
    if (focusTarget) focusTarget.focus();
  }

  function hideModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    form.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitDefaultText;
    }
  }

  form.addEventListener("submit", function () {
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = "";
    }
    pendingSubmit = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "전송 중…";
    }

    if (failTimer) window.clearTimeout(failTimer);
    failTimer = window.setTimeout(function () {
      if (!pendingSubmit) return;
      pendingSubmit = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitDefaultText;
      }
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent =
          "응답이 지연되었습니다. Netlify Forms 설정을 확인하거나 이메일로 문의해 주세요.";
      }
    }, 45000);
  });

  if (iframe) {
    iframe.addEventListener("load", function () {
      if (!pendingSubmit) return;
      pendingSubmit = false;
      if (failTimer) window.clearTimeout(failTimer);
      showModal();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitDefaultText;
      }
    });
  }

  if (modal) {
    modal.querySelectorAll("[data-close]").forEach(function (node) {
      node.addEventListener("click", hideModal);
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !modal.hidden) hideModal();
    });
  }
})();
