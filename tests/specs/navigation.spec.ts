import { test, expect } from "@playwright/test";
import { isElementAtTopOfViewport } from "../commands.js";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Anchor links work", async ({ page }) => {
  const slug = "reqwise";

  // Load page with anchor
  await page.goto(`/#timeline-${slug}`);
  
  // Element is at top
  expect(await isElementAtTopOfViewport(page, `post-stub-${slug}`)).toBe(true);
});

test("Post page is scrolled to correct location", async ({ page }) => {
  const slug = "reqwise";

  // Load page with anchor
  await page.goto(`/item/${slug}`);
  
  // Element is at top
  expect(await isElementAtTopOfViewport(page, "main-content")).toBe(true);
});

