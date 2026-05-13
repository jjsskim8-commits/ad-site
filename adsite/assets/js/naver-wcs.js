/**
 * 네이버 웹로그: wcslog.js defer 로드 이후 실행
 */
window.addEventListener("load", function () {
  if (typeof window.wcs_add === "undefined") {
    window.wcs_add = {};
  }
  window.wcs_add.wa = "1c928004cf400f0";
  if (typeof window.wcs === "function") {
    window.wcs_do();
  }
});
