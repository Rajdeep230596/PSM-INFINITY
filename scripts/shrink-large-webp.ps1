$ErrorActionPreference = "Stop"
$ffmpeg = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
$root = "d:\website\psminfinity\public"
$changed = 0
$before = 0
$after = 0

Get-ChildItem -Path $root -Recurse -Filter *.webp | Where-Object { $_.Length -gt 120KB } | ForEach-Object {
  $src = $_.FullName
  $original = $_.Length
  $tmp = Join-Path $_.DirectoryName ($_.BaseName + ".opt.webp")
  & $ffmpeg -y -loglevel error -i $src -vf "scale='min(1000,iw)':-2" -c:v libwebp -q:v 52 -compression_level 6 $tmp
  if ((Test-Path $tmp) -and ((Get-Item $tmp).Length -gt 0) -and ((Get-Item $tmp).Length -lt $original)) {
    Move-Item -Force $tmp $src
    $changed += 1
    $before += $original
    $after += (Get-Item $src).Length
  } else {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
  }
}

Write-Output ("shrunk=" + $changed)
Write-Output ("beforeKB=" + [math]::Round($before / 1KB))
Write-Output ("afterKB=" + [math]::Round($after / 1KB))
Write-Output "--- remaining over 120KB ---"
Get-ChildItem -Path $root -Recurse -Filter *.webp | Where-Object { $_.Length -gt 120KB } |
  Sort-Object Length -Descending |
  ForEach-Object {
    $rel = $_.FullName.Replace("d:\website\psminfinity\public", "")
    Write-Output (("{0,6}KB {1}" -f [math]::Round($_.Length / 1KB), $rel))
  }
