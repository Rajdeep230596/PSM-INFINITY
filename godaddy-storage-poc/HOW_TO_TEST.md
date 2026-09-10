# GoDaddy media persistence test

Use this tiny app on a **preview or unused Node.js slot**. Do not replace the live PSM Infinity site with it.

## 1. Zip (from this folder only)

```bash
cd godaddy-storage-poc
zip -r ../godaddy-storage-poc.zip . -x "node_modules/*" ".next/*" "*.zip"
```

Upload that zip to GoDaddy Node.js Hosting. Do not include `node_modules`.

## 2. After it is live

Open the app URL. Upload a small jpg/png.

Confirm the file appears in the list and opens, e.g. `/assets/uploads/…jpg`.

Write down that exact URL.

## 3. Restart

In the GoDaddy app dashboard: **Restart**.

Reload the test page. If the image is gone, disk is not surviving process restart — use object storage.

## 4. Redeploy (the real test)

Change this file (`HOW_TO_TEST.md`) or the heading text in `src/app/page.tsx`, zip/upload or push again.

Reload. If the **same** image URL still works, GoDaddy `/public/assets/` is safe for admin uploads.

If the image disappeared after redeploy, keep MySQL on GoDaddy but store media on R2/S3 over HTTPS.

## Pass / fail

| Check | Pass means |
|---|---|
| Upload + public URL | Writes and serving work |
| After Restart | Process restart is safe |
| After Redeploy | Safe for real admin media |
