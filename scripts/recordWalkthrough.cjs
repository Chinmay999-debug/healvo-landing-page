const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const FFMPEG = "/Users/chinmaypareek/Library/Caches/ms-playwright/ffmpeg-1011/ffmpeg-mac";
const VIDEO_DIR = path.join(__dirname, "../recorded_raw");
const PUBLIC_DIR = path.join(__dirname, "../public");

if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

async function run() {
  console.log("Launching Chromium to record real Healvo walkthrough...");

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 860 },
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1440, height: 860 },
    },
  });

  const page = await context.newPage();

  // 1. Initial Login to reach dashboard
  console.log("Logging into demo account...");
  await page.goto("http://localhost:5173");
  await page.waitForTimeout(1000);

  await page.fill("input[type=\"email\"]", "demo@healvo.in");
  await page.fill("input[type=\"password\"]", "Demo@123");
  await page.click("button:has-text(\"Log in\")");

  // Wait until overview dashboard has fully mounted and loaded
  await page.waitForURL("**/overview");
  await page.waitForTimeout(3000);
  console.log("Overview loaded successfully.");

  // Helper function to inject cursor
  async function injectCursor() {
    await page.evaluate(() => {
      if (document.getElementById("virtual-cursor")) return;
      const cursor = document.createElement("div");
      cursor.id = "virtual-cursor";
      cursor.style.position = "fixed";
      cursor.style.top = "0";
      cursor.style.left = "0";
      cursor.style.zIndex = "999999";
      cursor.style.pointerEvents = "none";
      cursor.style.transition = "transform 0.05s linear";
      cursor.style.transform = "translate(720px, 340px)";

      cursor.innerHTML = `
        <div style="position: relative;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.35));">
            <path d="M5.5 3.2L18.5 13.7L12.5 14.5L16.2 21.5L13.8 22.8L10 15.8L5.5 19.5V3.2Z" fill="#0f223a" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"/>
          </svg>
          <div id="cursor-click-ring" style="position: absolute; top: -6px; left: -6px; width: 24px; height: 24px; border-radius: 50%; border: 2.5px solid #0ea5b7; opacity: 0; transform: scale(0.4); pointer-events: none; transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);"></div>
        </div>
      `;
      document.body.appendChild(cursor);

      window.__moveVirtualCursor = (x, y) => {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      };

      window.__clickVirtualCursor = () => {
        const ring = document.getElementById("cursor-click-ring");
        if (ring) {
          ring.style.transition = "none";
          ring.style.transform = "scale(0.5)";
          ring.style.opacity = "0.9";
          void ring.offsetHeight;
          ring.style.transition = "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
          ring.style.transform = "scale(1.8)";
          ring.style.opacity = "0";
        }
      };
    });
  }

  let curX = 720;
  let curY = 340;

  async function moveTo(targetX, targetY, durationMs = 600) {
    const steps = Math.max(15, Math.floor(durationMs / 16));
    const startX = curX;
    const startY = curY;
    const cpX = startX + (targetX - startX) * 0.5;
    const cpY = startY + (targetY - startY) * 0.1 - 20;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const u = 1 - t;
      const x = u * u * startX + 2 * u * t * cpX + t * t * targetX;
      const y = u * u * startY + 2 * u * t * cpY + t * t * targetY;

      await page.evaluate(({ cx, cy }) => {
        if (window.__moveVirtualCursor) window.__moveVirtualCursor(cx, cy);
      }, { cx: Math.round(x), cy: Math.round(y) });

      await new Promise((r) => setTimeout(r, 16));
    }
    curX = targetX;
    curY = targetY;
  }

  async function clickAt(targetX, targetY, waitAfter = 500) {
    await moveTo(targetX, targetY, 650);
    await new Promise((r) => setTimeout(r, 220));
    await page.evaluate(() => {
      if (window.__clickVirtualCursor) window.__clickVirtualCursor();
    });
    await page.mouse.click(targetX, targetY);
    await new Promise((r) => setTimeout(r, waitAfter));
  }

  async function clickSelector(selector, waitAfter = 600) {
    const el = await page.waitForSelector(selector, { state: "visible" });
    const box = await el.boundingBox();
    if (!box) return;
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await clickAt(x, y, waitAfter);
  }

  // Inject initial cursor on Overview
  await injectCursor();
  console.log("Recording started on Overview...");

  // PHASE 1: OVERVIEW DASHBOARD
  // Hold for a moment to let the viewer absorb the real dashboard
  await new Promise((r) => setTimeout(r, 1600));

  // Move cursor down slightly over the today schedule / revenue area
  await moveTo(480, 420, 700);
  await new Promise((r) => setTimeout(r, 900));

  // PHASE 2: NAVIGATE TO PATIENTS
  console.log("Navigating to Patients...");
  // Left sidebar 'Patients' link
  await clickSelector("nav a[href*=\"patients\"], a:has-text(\"Patients\")", 800);
  await injectCursor();
  await new Promise((r) => setTimeout(r, 1000));

  // PHASE 3: OPEN PATIENT PRIYA SHARMA
  console.log("Opening Priya Sharma...");
  await moveTo(350, 400, 600);
  await new Promise((r) => setTimeout(r, 400));
  await clickSelector("text=Priya Sharma", 800);
  await injectCursor();
  await new Promise((r) => setTimeout(r, 1200));

  // PHASE 4: DENTAL CHART
  console.log("Navigating to Dental Chart...");
  await clickSelector("button:has-text(\"Dental chart\"), a:has-text(\"Dental chart\")", 900);
  await injectCursor();
  await new Promise((r) => setTimeout(r, 1200));

  // Hover and Click on Tooth 46 in Lower Arch
  console.log("Inspecting Tooth 46...");
  // Look for tooth 46 text or element in the lower arch
  const toothEl = await page.$("text=46");
  if (toothEl) {
    const toothBox = await toothEl.boundingBox();
    if (toothBox) {
      // Click slightly above label on the tooth crown itself
      await clickAt(toothBox.x + toothBox.width / 2, toothBox.y - 18, 1200);
    }
  } else {
    // Coordinate fallback on lower arch tooth 46 (~420, 520)
    await clickAt(445, 525, 1200);
  }
  await new Promise((r) => setTimeout(r, 1400));

  // PHASE 5: CONSULTATION
  console.log("Navigating to Consultation...");
  await clickSelector("button:has-text(\"Consultation\"), a:has-text(\"Consultation\")", 900);
  await injectCursor();
  await new Promise((r) => setTimeout(r, 1500));

  // PHASE 6: BILLING
  console.log("Navigating to Billing...");
  await clickSelector("nav a[href*=\"billing\"], a:has-text(\"Billing\")", 900);
  await injectCursor();
  await new Promise((r) => setTimeout(r, 1200));

  // Hover over the first invoice row (INV-1023)
  await moveTo(480, 580, 700);
  await new Promise((r) => setTimeout(r, 1200));

  // PHASE 7: HEALVO AI ASSISTANT
  console.log("Opening Healvo AI...");
  await clickSelector("button[aria-label*=\"AI\"], div:has-text(\"Talk to Healvo AI\"), button:has(svg.lucide-sparkles), .lucide-sparkles", 1000);
  await injectCursor();
  await new Promise((r) => setTimeout(r, 2200));

  console.log("Demo flow complete! Closing page to finalize video...");
  await page.close();
  await context.close();
  await browser.close();

  // Find the raw video recorded by Playwright
  const files = fs.readdirSync(VIDEO_DIR).filter((f) => f.endsWith(".webm"));
  if (files.length === 0) {
    throw new Error("No recorded video found in " + VIDEO_DIR);
  }
  const rawVideoPath = path.join(VIDEO_DIR, files[files.length - 1]);
  console.log("Raw video recorded:", rawVideoPath);

  // Use ffmpeg to trim the initial login (~5.5 seconds) and export optimized WebM & MP4
  const outMp4 = path.join(PUBLIC_DIR, "healvo_walkthrough.mp4");
  const outWebm = path.join(PUBLIC_DIR, "healvo_walkthrough.webm");
  const outPoster = path.join(PUBLIC_DIR, "healvo_walkthrough_poster.webp");
  const outPosterPng = path.join(PUBLIC_DIR, "healvo_walkthrough_poster.png");

  console.log("Processing and compressing video with FFmpeg...");

  // 1. MP4 (H.264, web optimized)
  // Skip the first 6.2 seconds (which was the login page) so the video starts smoothly on Overview
  execSync(
    `"${FFMPEG}" -y -ss 00:00:06.2 -i "${rawVideoPath}" -c:v libx264 -crf 22 -preset medium -movflags +faststart -an -pix_fmt yuv420p "${outMp4}"`,
    { stdio: "inherit" }
  );

  // 2. WebM (VP9, web optimized)
  execSync(
    `"${FFMPEG}" -y -ss 00:00:06.2 -i "${rawVideoPath}" -c:v libvpx-vp9 -b:v 1200k -crf 28 -an "${outWebm}"`,
    { stdio: "inherit" }
  );

  // 3. Poster Image (first frame of trimmed video)
  execSync(
    `"${FFMPEG}" -y -ss 00:00:06.5 -i "${rawVideoPath}" -vframes 1 -q:v 2 "${outPoster}"`,
    { stdio: "inherit" }
  );
  execSync(
    `"${FFMPEG}" -y -ss 00:00:06.5 -i "${rawVideoPath}" -vframes 1 "${outPosterPng}"`,
    { stdio: "inherit" }
  );

  console.log("✅ Successfully generated:");
  console.log(" - MP4:", outMp4, `(${fs.statSync(outMp4).size} bytes)`);
  console.log(" - WebM:", outWebm, `(${fs.statSync(outWebm).size} bytes)`);
  console.log(" - Poster WebP:", outPoster);
  console.log(" - Poster PNG:", outPosterPng);
}

run().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});
