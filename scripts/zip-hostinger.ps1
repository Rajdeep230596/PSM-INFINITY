$ErrorActionPreference = "Stop"
$root = "d:\website\psminfinity"
$out = Join-Path $root "out"
$zip = Join-Path $root "psm-infinity-hostinger.zip"
$stage = Join-Path $root ".hostinger-stage"

$nextHtaccess = Join-Path $out "_next\.htaccess"
New-Item -ItemType Directory -Path (Split-Path $nextHtaccess) -Force | Out-Null
@'
# Hostinger: allow hashed Next.js assets in this underscored directory.
<IfModule mod_authz_core.c>
  Require all granted
</IfModule>
<IfModule !mod_authz_core.c>
  Order allow,deny
  Allow from all
</IfModule>
Options -Indexes +FollowSymLinks
<IfModule mod_headers.c>
  Header set Cache-Control "public, max-age=31536000, immutable"
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 year"
</IfModule>
'@ | Set-Content -Path $nextHtaccess -Encoding ascii

$video = Join-Path $out "assets\videos\luxury-walkthrough.mp4"
if (Test-Path $video) { Remove-Item $video -Force }

if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage | Out-Null
& robocopy $out $stage /E /NFL /NDL /NJH /NJS /NC /NS
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with $LASTEXITCODE" }

$stagedVideo = Join-Path $stage "assets\videos\luxury-walkthrough.mp4"
if (Test-Path $stagedVideo) { Remove-Item $stagedVideo -Force }

if (Test-Path $zip) { Remove-Item $zip -Force }
Push-Location $stage
try {
  & tar.exe -a -c -f $zip .
} finally {
  Pop-Location
}
Remove-Item $stage -Recurse -Force

$item = Get-Item $zip
Write-Output ("zipMB=" + [math]::Round($item.Length / 1MB, 1))
Write-Output ("zipPath=" + $item.FullName)
