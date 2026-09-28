$ErrorActionPreference = "Stop"
$ffmpeg = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
$logo = "d:\website\psminfinity\public\brand\psm-infinity-logo.png"
$webp = "d:\website\psminfinity\public\brand\psm-infinity-logo.webp"
& $ffmpeg -y -loglevel error -i $logo -vf "scale='min(258,iw)':-2" -c:v libwebp -q:v 82 -compression_level 6 $webp
Write-Output ("logoPngKB=" + [math]::Round((Get-Item $logo).Length / 1KB))
if (Test-Path $webp) {
  Write-Output ("logoWebpKB=" + [math]::Round((Get-Item $webp).Length / 1KB))
}
Write-Output "--- largest webp ---"
Get-ChildItem -Path "d:\website\psminfinity\public" -Recurse -Filter *.webp |
  Sort-Object Length -Descending |
  Select-Object -First 18 |
  ForEach-Object {
    $rel = $_.FullName.Replace("d:\website\psminfinity\public", "")
    Write-Output (("{0,6}KB {1}" -f [math]::Round($_.Length / 1KB), $rel))
  }
