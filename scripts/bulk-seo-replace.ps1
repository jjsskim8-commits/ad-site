$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\adsite")
Get-ChildItem -Recurse -Include *.html, *.xml, *.txt | ForEach-Object {
  $path = $_.FullName
  $c = Get-Content -LiteralPath $path -Raw -Encoding UTF8
  $n = $c
  $n = $n.Replace("https://jjssk.netlify.app", "https://jfine.kr")
  $n = $n.Replace('<meta property="og:image" content="/assets/images/og.webp">', '<meta property="og:image" content="https://jfine.kr/assets/images/og-default.png">')
  $n = $n.Replace('<meta name="twitter:image" content="/assets/images/icon/favicon.png">', '<meta name="twitter:image" content="https://jfine.kr/assets/images/icon/favicon.png">')
  $n = $n.Replace('href="/posts/', 'href="https://jfine.kr/posts/')
  $n = $n.Replace('href="/category/', 'href="https://jfine.kr/category/')
  if ($n -ne $c) {
    [System.IO.File]::WriteAllText($path, $n, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Updated $path"
  }
}
