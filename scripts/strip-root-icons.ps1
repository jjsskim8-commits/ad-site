$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\adsite")
$old = @'
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="icon" href="../assets/images/icon/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="../assets/images/icon/favicon.png">
'@
$new = @'
  <link rel="icon" href="../assets/images/icon/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="../assets/images/icon/favicon.png">
'@
Get-ChildItem -Recurse -Include *.html | ForEach-Object {
  $c = Get-Content -LiteralPath $_.FullName -Raw -Encoding UTF8
  if ($c.Contains("/favicon.ico")) {
    $n = $c.Replace($old, $new)
    if ($n -eq $c) { Write-Warning "Pattern mismatch: $($_.FullName)" }
    else { [System.IO.File]::WriteAllText($_.FullName, $n, [System.Text.UTF8Encoding]::new($false)); Write-Host "Icons fixed $($_.Name)" }
  }
}
