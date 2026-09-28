$ErrorActionPreference = "Stop"
$ffmpeg = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
$root = "d:\website\psminfinity\public"
$before = 0
$after = 0
$changed = 0

Get-ChildItem -Path $root -Recurse -Include *.jpg, *.jpeg | ForEach-Object {
  $src = $_.FullName
  $original = $_.Length
  $before += $original
  $tmp = Join-Path $_.DirectoryName ($_.BaseName + ".opt.jpg")
  & $ffmpeg -y -loglevel error -i $src -vf "scale='min(1600,iw)':-2" -q:v 5 $tmp
  if ((Test-Path $tmp) -and ((Get-Item $tmp).Length -gt 0) -and ((Get-Item $tmp).Length -lt $original)) {
    Move-Item -Force $tmp $src
    $changed += 1
    $after += (Get-Item $src).Length
  } else {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    $after += $original
  }
}

$poster = Join-Path $root "media\backdrop-poster.png"
if (Test-Path $poster) {
  $jpg = Join-Path $root "media\backdrop-poster.jpg"
  $original = (Get-Item $poster).Length
  $before += $original
  & $ffmpeg -y -loglevel error -i $poster -vf "scale='min(1920,iw)':-2" -q:v 5 $jpg
  if (Test-Path $jpg) {
    $after += (Get-Item $jpg).Length
    $changed += 1
  } else {
    $after += $original
  }
}

$logo = Join-Path $root "brand\psm-infinity-logo.png"
if (Test-Path $logo) {
  $original = (Get-Item $logo).Length
  $before += $original
  $tmp = Join-Path $root "brand\psm-infinity-logo.opt.png"
  & $ffmpeg -y -loglevel error -i $logo -vf "scale='min(258,iw)':-2" -compression_level 9 $tmp
  if ((Test-Path $tmp) -and ((Get-Item $tmp).Length -gt 0) -and ((Get-Item $tmp).Length -lt $original)) {
    Move-Item -Force $tmp $logo
    $changed += 1
    $after += (Get-Item $logo).Length
  } else {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    $after += $original
  }
}

Write-Output ("changed=" + $changed)
Write-Output ("beforeKB=" + [math]::Round($before / 1KB))
Write-Output ("afterKB=" + [math]::Round($after / 1KB))
