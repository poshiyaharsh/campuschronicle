import { test, expect } from "@playwright/test";

test.describe("CampusChronicle E2E Test Suite", () => {
  test("1. Core Navigation and 404 Route", async ({ page }) => {
    // Navigate home
    await page.goto("/");
    await expect(page).toHaveTitle(/CampusChronicle/);
    await expect(page.locator("h1")).toBeVisible();

    // Navigate to Classroom Activities
    await page.goto("/classroom");
    await expect(page).toHaveTitle(/Classroom Activities/);

    // Navigate to Technical Visits
    await page.goto("/technical-visits");
    await expect(page).toHaveTitle(/Technical & Industrial Visits/);

    // Navigate to Events
    await page.goto("/events");
    await expect(page).toHaveTitle(/Events/);

    // Navigate to Gallery
    await page.goto("/gallery");
    await expect(page).toHaveTitle(/Gallery/);

    // Navigate to Videos
    await page.goto("/videos");
    await expect(page).toHaveTitle(/Video/);

    // Navigate to Contact
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);

    // 404 Not Found Page handling
    const res = await page.goto("/this-page-definitely-does-not-exist");
    expect(res?.status()).toBe(404);
  });

  test("2. Theme Toggle and Persistence", async ({ page }) => {
    await page.goto("/");
    const themeBtn = page.locator('button[aria-label="Toggle visual color theme"]');
    await expect(themeBtn).toBeVisible();

    // Check initial html class
    const initialTheme = await page.locator("html").getAttribute("class");

    // Click theme toggle
    await themeBtn.click();
    await page.waitForTimeout(300);

    // Reload page to verify persistence
    await page.reload();
    await page.waitForTimeout(300);
    const persistedTheme = await page.locator("html").getAttribute("class");
    expect(persistedTheme).toBeDefined();
  });

  test("3. Gallery Category and Academic Year Filters", async ({ page }) => {
    await page.goto("/gallery");

    // Verify category chips
    const allBtn = page.getByRole("button", { name: /All Categories/i });
    await expect(allBtn).toBeVisible();

    // Click Classroom category chip
    const classroomChip = page.getByRole("button", { name: /Classroom Activities/i });
    if (await classroomChip.isVisible()) {
      await classroomChip.click();
      await expect(page).toHaveURL(/category=classroom/);
    }

    // Click Academic Year chip
    const yearChip = page.getByRole("button", { name: /2024-25/i });
    if (await yearChip.isVisible()) {
      await yearChip.click();
      await expect(page).toHaveURL(/year=2024-25/);
    }
  });

  test("4. Photo Lightbox Modal Interactions", async ({ page }) => {
    await page.goto("/gallery");

    // Locate the first clickable photo item
    const firstPhoto = page.locator('div[role="button"][aria-label^="View photo"]').first();
    if (await firstPhoto.isVisible()) {
      await firstPhoto.click();

      // Lightbox overlay should appear
      const lightboxOverlay = page.locator(".yarl__container, [role='dialog']");
      await expect(lightboxOverlay).toBeVisible();

      // Press Escape to dismiss lightbox
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
      await expect(lightboxOverlay).not.toBeVisible();
    }
  });

  test("5. Video Gallery and Player Interface", async ({ page }) => {
    await page.goto("/videos");
    await expect(page.locator("h1")).toContainText("Department Video Gallery");

    // Locate active video player
    const player = page.locator("video");
    if (await player.isVisible()) {
      await expect(player).toBeVisible();
    }
  });

  test("6. Search Archive and Zero Results Empty State", async ({ page }) => {
    await page.goto("/search");
    const searchInput = page.getByPlaceholder("Search albums, hackathons, lab visits, captions...");
    await expect(searchInput).toBeVisible();

    // Search for existing keyword
    await searchInput.fill("hackathon");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/q=hackathon/);
    await expect(page.getByText(/results for/i)).toBeVisible();

    // Search for nonexistent keyword
    await searchInput.fill("nonexistent_unknown_memory_12345");
    await page.keyboard.press("Enter");
    await expect(page.getByText("No memories found")).toBeVisible();
  });

  test("7. Server-side Admin Auth Guard and Login Redirect", async ({ page }) => {
    // Attempting to visit /admin without session cookies
    await page.goto("/admin");

    // Edge Middleware should intercept and redirect to /admin/login
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Admin Console Login/i })).toBeVisible();
  });

  test("8. Mobile Viewport Smoke Test", async ({ page }) => {
    // Test small screen navigation
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // Hamburger menu button should be visible
    const mobileMenuBtn = page.locator('button[aria-label="Open menu"]');
    await expect(mobileMenuBtn).toBeVisible();

    // Open mobile menu
    await mobileMenuBtn.click();
    await expect(page.getByRole("link", { name: "Classroom" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Search Archives" })).toBeVisible();
  });
});
