$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\adsite")
$pattern = '(?ms)\s*<meta name="twitter:site" content="@quietgrowthguide">\s*<meta name="twitter:creator" content="@quietgrowthguide">'
Get-ChildItem -Recurse -Filter *.html | ForEach-Object {
  $path = $_.FullName
  $c = Get-Content -LiteralPath $path -Raw -Encoding UTF8
  $n = $c -replace $pattern, ''
  if ($n -ne $c) {
    [System.IO.File]::WriteAllText($path, $n, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Removed twitter placeholders: $($_.Name)"
  }
}
