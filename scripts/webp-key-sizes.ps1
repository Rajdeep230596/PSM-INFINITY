$files = @(
  "d:\website\psminfinity\public\media\backdrop-poster.webp",
  "d:\website\psminfinity\public\brand\psm-infinity-logo.webp",
  "d:\website\psminfinity\public\assets\itineraries\hero-centerpiece.webp",
  "d:\website\psminfinity\public\assets\itineraries\navigation-chart.webp"
)
foreach ($path in $files) {
  $item = Get-Item $path
  Write-Output (("{0,6}KB {1}" -f [math]::Round($item.Length / 1KB), $item.Name))
}
$total = (Get-ChildItem "d:\website\psminfinity\public" -Recurse -Filter *.webp | Measure-Object Length -Sum).Sum
Write-Output ("webpTotalKB=" + [math]::Round($total / 1KB))
