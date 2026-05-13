$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\adsite")
$old = @'
  <script type="text/javascript" src="//wcs.pstatic.net/wcslog.js"></script>
  <script type="text/javascript">
  if(!wcs_add) var wcs_add = {};
  wcs_add["wa"] = "1c928004cf400f0";
  if(window.wcs) {
    wcs_do();
  }
  </script>
'@
$rootNew = @'
  <script src="https://wcs.pstatic.net/wcslog.js" defer></script>
  <script src="assets/js/naver-wcs.js" defer></script>
'@
$nestedNew = @'
  <script src="https://wcs.pstatic.net/wcslog.js" defer></script>
  <script src="../assets/js/naver-wcs.js" defer></script>
'@
$rootFiles = @("index.html", "contact.html", "privacy.html", "terms.html", "contact-success.html")
Get-ChildItem -Recurse -Filter *.html | ForEach-Object {
  $rel = $_.FullName.Substring((Get-Location).Path.Length + 1)
  $c = Get-Content -LiteralPath $_.FullName -Raw -Encoding UTF8
  if ($c -notlike "*wcs.pstatic*") { return }
  $name = Split-Path $rel -Leaf
  $isRoot = $rootFiles -contains $name
  $new = if ($isRoot) { $rootNew } else { $nestedNew }
  $n = $c.Replace($old, $new)
  if ($n -eq $c) {
    Write-Warning "WCS pattern mismatch: $rel"
  } else {
    [System.IO.File]::WriteAllText($_.FullName, $n, [System.Text.UTF8Encoding]::new($false))
    Write-Host "WCS defer: $rel"
  }
}
