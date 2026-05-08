/**
 * Netlify Forms: 공식 예시와 동일하게 루트(/)로 POST,
 * 본문은 application/x-www-form-urlencoded + URLSearchParams(FormData).
 */
(function () {
  var form = document.getElementById("contact-form");
  var modal = document.getElementById("contact-success-modal");
  var errorEl = document.getElementById("contact-form-error");
  if (!form) return;

  var submitBtn = form.querySelector('button[type="submit"]');

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
  }

  function postEncoded(url) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(form)),
      credentials: "same-origin",
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = "";
    }

    var prevText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "전송 중…";
    }

    var origin = window.location.origin;
    var rootUrl = origin + "/";
    var pageUrl = origin + "/contact.html";

    postEncoded(rootUrl)
      .then(function (res) {
        if (res.ok) return true;
        return postEncoded(pageUrl).then(function (res2) {
          return res2.ok;
        });
      })
      .then(function (ok) {
        if (ok) showModal();
        else throw new Error("submit failed");
      })
      .catch(function () {
        if (errorEl) {
          errorEl.hidden = false;
          errorEl.textContent =
            "전송에 실패했습니다. 잠시 후 다시 시도하거나 아래 이메일로 직접 문의해 주세요.";
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = prevText;
        }
      });
  });

  if (modal) {
    modal.querySelectorAll("[data-close]").forEach(function (node) {
      node.addEventListener("click", hideModal);
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !modal.hidden) hideModal();
    });
  }
})();
