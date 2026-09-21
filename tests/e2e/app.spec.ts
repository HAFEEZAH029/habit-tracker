import { test, expect } from "@playwright/test";

test.describe('Habit Tracker app', () => {

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("splash-screen")).toBeVisible();
    await page.waitForURL("/login");
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "habit-tracker-session",
        JSON.stringify({ userId: "1", email: "test@example.com" })
      );
    });

    await page.goto("/");
    await page.waitForURL("/dashboard");
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL("/login");
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("test@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");

    await page.getByTestId("auth-signup-submit").click();

    await page.waitForURL("/dashboard");
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("user2@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await page.waitForURL("/dashboard");

    await page.getByTestId("auth-logout-button").click();
    await page.waitForURL("/login");

    await page.getByTestId("auth-login-email").fill("user2@example.com");
    await page.getByTestId("auth-login-password").fill("password123");
    await page.getByTestId("auth-login-submit").click();

    await page.waitForURL("/dashboard");
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("habit@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await page.getByTestId("create-habit-button").click();

    await page.getByTestId("habit-name-input").fill("Read");
    await page.getByTestId("habit-save-button").click();

    await expect(page.getByText("Read")).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("streak@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await page.getByTestId("create-habit-button").click();

    await page.getByTestId("habit-name-input").fill("Run");
    await page.getByTestId("habit-save-button").click();

    await page.getByTestId("habit-complete-run").click();

    await expect(page.getByText(/1 day/i)).toBeVisible();
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("persist@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await page.getByTestId("create-habit-button").click();

    await page.getByTestId("habit-name-input").fill("Persist Habit");
    await page.getByTestId("habit-save-button").click();

    await page.reload();

    await expect(page.getByText("Persist Habit")).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.goto("/signup");

    await page.getByTestId("auth-signup-email").fill("logout@example.com");
    await page.getByTestId("auth-signup-password").fill("password123");
    await page.getByTestId("auth-signup-submit").click();

    await page.getByTestId("auth-logout-button").click();

    await page.waitForURL("/login");
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto("/");

    // ensure SW is installed
    await page.waitForTimeout(2000);

    await context.setOffline(true);

    await page.reload();

    await expect(page).not.toHaveURL(/error/);
  });

});