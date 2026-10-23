/**
 * Full progress demo: polished admin + FE search + AI concierge.
 * Usage: node --env-file=.env scripts/record-client-demo.mjs
 */
import { chromium } from "playwright";
import { copyFileSync, mkdirSync, readdirSync, renameSync, statSync, writeFileSync } from "fs";
import path from "path";

const BE = process.env.BACKEND_PUBLIC_URL || "http://localhost:4000";
const FE = process.env.FRONTEND_PUBLIC_URL || "http://localhost:3000";
const EMAIL = process.env.ADMIN_EMAIL || "sunandan@example.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "change-me";
const OUT_DIR = path.join(process.cwd(), "demo-output");
const STAMP = Date.now().toString(36);

async function pause(page, ms = 1400) {
  await page.waitForTimeout(ms);
}

async function banner(page, text) {
  await page.evaluate((label) => {
    document.querySelectorAll("[data-demo-banner]").forEach((el) => el.remove());
    const el = document.createElement("div");
    el.dataset.demoBanner = "1";
    el.textContent = label;
    Object.assign(el.style, {
      position: "fixed",
      top: "16px",
      right: "16px",
      zIndex: "99999",
      background: "#d4af37",
      color: "#111",
      padding: "10px 14px",
      borderRadius: "8px",
      fontFamily: "system-ui,sans-serif",
      fontSize: "14px",
      fontWeight: "700",
      maxWidth: "360px",
      boxShadow: "0 12px 30px rgba(0,0,0,.4)",
    });
    document.body.appendChild(el);
  }, text);
}

async function titleCard(page, title, subtitle) {
  await page.setContent(`
    <html><body style="margin:0;font-family:Georgia,serif;background:#0a0b0d;color:#f3efe6;display:grid;place-items:center;height:100vh;">
      <div style="text-align:center;max-width:760px;padding:40px;">
        <p style="letter-spacing:.2em;text-transform:uppercase;opacity:.65;font-size:13px;">PSM Infinity × Tothyoit</p>
        <h1 style="font-size:42px;margin:12px 0;font-weight:500;">${title}</h1>
        <p style="font-size:18px;line-height:1.55;opacity:.85;">${subtitle}</p>
      </div>
    </body></html>
  `);
  await pause(page, 2300);
}

function tinyPngPath() {
  const png = Buffer.from(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082",
    "hex",
  );
  const file = path.join(OUT_DIR, `demo-upload-${STAMP}.png`);
  writeFileSync(file, png);
  return file;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const uploadFile = tinyPngPath();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: OUT_DIR, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();

  const industryName = `Private Estates ${STAMP}`;
  const industrySlug = `private-estates-${STAMP}`;
  const companyName = `Aurora Villas ${STAMP}`;
  const companySlug = `aurora-villas-${STAMP}`;
  const productName = `Skyline Residence ${STAMP}`;
  const productSlug = `skyline-residence-${STAMP}`;

  await titleCard(
    page,
    "Backend progress — latest build",
    "Polished owner admin · catalogue CRUD · media · website search · Advanced AI Concierge",
  );

  // —— Admin ——
  await page.goto(`${BE}/admin/login`, { waitUntil: "networkidle" });
  await banner(page, "1. Redesigned owner login");
  await pause(page, 1200);
  await page.fill('input[name="email"]', EMAIL);
  await pause(page, 350);
  await page.fill('input[name="password"]', PASSWORD);
  await pause(page, 450);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/admin");
  await banner(page, "2. Dashboard + sidebar console");
  await pause(page, 2000);

  // Create industry
  await page.goto(`${BE}/admin/industries`, { waitUntil: "networkidle" });
  await banner(page, "3. Create industry");
  await pause(page, 900);
  const industryForm = page.locator("form.admin-form").last();
  await industryForm.locator('input[name="name"]').fill(industryName);
  await pause(page, 300);
  await industryForm.locator('input[name="slug"]').fill(industrySlug);
  await industryForm.locator('textarea[name="summary"]').fill("Curated private-estate principals for PSM Infinity.");
  await pause(page, 600);
  await industryForm.locator('button[type="submit"]').click();
  await page.waitForURL(`**/admin/industries/${industrySlug}`);
  await banner(page, "4. Upload hero media");
  await pause(page, 1000);
  await page.setInputFiles('input[type="file"]', uploadFile);
  await page.waitForFunction(() => {
    const input = document.querySelector('input[name="hero_media_url"]');
    return input instanceof HTMLInputElement && input.value.includes("/assets/uploads/");
  }, null, { timeout: 15000 });
  await pause(page, 1200);
  await page.locator('button[type="submit"]').filter({ hasText: /Save/i }).click();
  await page.waitForURL("**/admin/industries");
  await pause(page, 1000);

  // Company
  await page.goto(`${BE}/admin/companies`, { waitUntil: "networkidle" });
  await banner(page, "5. Create company");
  await pause(page, 800);
  const companyForm = page.locator("form.admin-form").last();
  await companyForm.locator('input[name="name"]').fill(companyName);
  await companyForm.locator('input[name="slug"]').fill(companySlug);
  await companyForm.locator('select[name="industry_id"]').selectOption({ label: industryName });
  await companyForm.locator('textarea[name="summary"]').fill("Boutique villa operator in the PSM catalogue.");
  await pause(page, 600);
  await companyForm.locator('button[type="submit"]').click();
  await page.waitForURL(`**/admin/companies/${companySlug}`);
  await pause(page, 1400);

  // Product
  await page.goto(`${BE}/admin/products`, { waitUntil: "networkidle" });
  await banner(page, "6. Create product + specs");
  await pause(page, 800);
  const productForm = page.locator("form.admin-form").last();
  await productForm.locator('input[name="name"]').fill(productName);
  await productForm.locator('input[name="slug"]').fill(productSlug);
  await productForm.locator('select[name="company_id"]').selectOption({ label: companyName });
  await productForm.locator('textarea[name="summary"]').fill("Signature skyline residence for private stays.");
  await productForm.locator('textarea[name="specs"]').fill("Bedrooms: 4\nView: Skyline\nStyle: Contemporary");
  await pause(page, 700);
  await productForm.locator('button[type="submit"]').click();
  await page.waitForURL(`**/admin/products/${productSlug}`);
  await pause(page, 1500);

  await page.goto(`${BE}/admin/media`, { waitUntil: "networkidle" });
  await banner(page, "7. Media library");
  await pause(page, 1600);

  // —— Frontend ——
  await titleCard(page, "On the public website", "Search API + Advanced AI Concierge (Option B)");

  await page.goto(FE, { waitUntil: "domcontentloaded", timeout: 60000 });
  // Dismiss boot if present
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    document.documentElement.classList.remove("is-booting");
    document.querySelector(".boot-loader")?.remove();
  });
  await banner(page, "8. Website search (calls backend API)");
  await pause(page, 1000);
  await page.locator(".site-search-trigger").click();
  await pause(page, 700);
  await page.locator(".site-search-overlay input").fill("villa");
  await pause(page, 2800);
  await page.keyboard.press("Escape").catch(() => {});
  await page.evaluate(() => {
    document.querySelector(".site-search-overlay")?.remove();
  });

  await banner(page, "9. AI Concierge on the site");
  await pause(page, 800);
  await page.locator(".ai-concierge-launch").click();
  await pause(page, 1000);
  const chatInput = page.locator(".ai-concierge-composer input");
  await chatInput.fill(`Tell me about ${companyName}`);
  await pause(page, 500);
  await page.locator('.ai-concierge-composer button[type="submit"]').click();
  await page.waitForFunction(() => {
    const bubbles = document.querySelectorAll(".ai-concierge-bubble.assistant");
    return bubbles.length >= 2;
  }, null, { timeout: 45000 });
  await pause(page, 3500);

  await titleCard(
    page,
    "Shipped in this build",
    "✓ Polished admin console<br/>✓ Industries / companies / products + media<br/>✓ Public search<br/>✓ Advanced AI Concierge + WhatsApp handoff",
  );

  await context.close();
  await browser.close();

  const videos = readdirSync(OUT_DIR).filter((name) => name.endsWith(".webm"));
  if (!videos.length) throw new Error("No video produced");
  const newest = videos
    .map((name) => ({ name, mtime: statSync(path.join(OUT_DIR, name)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)[0].name;
  const source = path.join(OUT_DIR, newest);
  const target = path.join(OUT_DIR, "psm-infinity-backend-progress.webm");
  if (source !== target) {
    try {
      renameSync(source, target);
    } catch {
      copyFileSync(source, target);
    }
  }
  console.log(`Wrote ${target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
