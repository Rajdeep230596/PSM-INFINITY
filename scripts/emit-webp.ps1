$ErrorActionPreference = "Stop"
$ffmpeg = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
$root = "d:\website\psminfinity\public"
$before = 0
$after = 0
$changed = 0
$skipped = 0

Get-ChildItem -Path $root -Recurse -Include *.jpg, *.jpeg, *.png | ForEach-Object {
  $src = $_.FullName
  $original = $_.Length
  $webp = [System.IO.Path]::ChangeExtension($src, ".webp")
  if ($src -match "backdrop-poster") {
    $vf = "scale='min(1600,iw)':-2"
    $quality = "68"
  } elseif ($src -match "psm-infinity-logo") {
    $vf = "scale='min(258,iw)':-2"
    $quality = "82"
  } else {
    $vf = "scale='min(1280,iw)':-2"
    $quality = "70"
  }
  & $ffmpeg -y -loglevel error -i $src -vf $vf -c:v libwebp -q:v $quality -compression_level 6 $webp
  if ((Test-Path $webp) -and ((Get-Item $webp).Length -gt 0)) {
    $changed += 1
    $before += $original
    $after += (Get-Item $webp).Length
  } else {
    $skipped += 1
  }
}

Write-Output ("webpFiles=" + $changed)
Write-Output ("skipped=" + $skipped)
Write-Output ("sourceKB=" + [math]::Round($before / 1KB))
Write-Output ("webpKB=" + [math]::Round($after / 1KB))
