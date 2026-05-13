$ErrorActionPreference = "Stop"
$base = Join-Path $PSScriptRoot "..\adsite\assets\images"
New-Item -ItemType Directory -Force -Path $base, (Join-Path $base "icon") | Out-Null

Add-Type -AssemblyName System.Drawing
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = "AntiAlias"
$g.Clear([System.Drawing.Color]::FromArgb(15, 15, 16))
$rectAll = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush ($rectAll), ([System.Drawing.Color]::FromArgb(255, 90, 50)), ([System.Drawing.Color]::FromArgb(160, 45, 25)), 35
$g.FillRectangle($brush, $rectAll)
$font = New-Object System.Drawing.Font "Malgun Gothic", 42, ([System.Drawing.FontStyle]::Bold)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = "Near"
$sf.LineAlignment = "Near"
$rect = New-Object System.Drawing.RectangleF 60, 180, ($w - 120), 200
$g.DrawString("Quiet Growth Guide", $font, [System.Drawing.Brushes]::White, $rect, $sf)
$font2 = New-Object System.Drawing.Font "Malgun Gothic", 24
$rect2 = New-Object System.Drawing.RectangleF 60, 300, ($w - 120), 120
$g.DrawString("jfine.kr", $font2, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 230, 235))), $rect2, $sf)
$g.Dispose()
$outOg = Join-Path $base "og-default.png"
$bmp.Save($outOg, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$fb = New-Object System.Drawing.Bitmap 32, 32
$gf = [System.Drawing.Graphics]::FromImage($fb)
$gf.Clear([System.Drawing.Color]::FromArgb(255, 106, 61))
$gf.Dispose()
$outIcon = Join-Path $base "icon\favicon.png"
$fb.Save($outIcon, [System.Drawing.Imaging.ImageFormat]::Png)
$fb.Dispose()

Write-Host "Wrote $outOg and $outIcon"
