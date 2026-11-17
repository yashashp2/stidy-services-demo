import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/domestic",
  "/commercial",
  "/about",
  "/careers",
  "/contact",
];

test("all pages render across desktop, tablet and mobile without overflow or broken images", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`/#${route}`);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
      const images = page.locator("img");
      for (const img of await images.all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty("complete", true);
        expect(await img.evaluate((node) => node.naturalWidth)).toBeGreaterThan(
          0,
        );
      }
    }
  }
  expect(errors).toEqual([]);
});

test("navigation, service links, anchor and mobile keyboard menu work", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore Our Services", exact: true })
    .click();
  await expect(page.locator("#services")).toBeInViewport();
  await page.locator(".service-card").first().click();
  await expect(page).toHaveURL(/#\/domestic$/);
  await page.getByRole("link", { name: "Let’s talk about your space" }).click();
  await expect(page.getByLabel("Cleaning type")).toHaveValue(
    "Domestic cleaning",
  );
  await page.reload();
  await expect(page.getByLabel("Cleaning type")).toHaveValue(
    "Domestic cleaning",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(
    page.getByRole("button", { name: "Close menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Commercial Cleaning" })
    .click();
  await expect(page).toHaveURL(/#\/commercial$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.goto("/#/not-a-page");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/#\/$/);
});

for (const careers of [false, true]) {
  test(`${careers ? "careers" : "quote"} form validates, clears entries and sends no requests`, async ({
    page,
  }) => {
    await page.goto(careers ? "/#/careers" : "/#/contact");
    await page.waitForLoadState("networkidle");
    const requests = [];
    page.on("request", (req) => requests.push(req.url()));
    await page
      .getByRole("button", {
        name: careers ? "Try the Interest Form" : "Try the Quote Request",
      })
      .click();
    await expect(page.getByLabel("Full name")).toBeFocused();
    await expect(page.getByText("Please enter your full name.")).toBeVisible();
    await page.getByLabel("Full name").fill("Alex Taylor");
    await page.getByLabel("Email address").fill("alex@example.com");
    await page.getByLabel("Telephone number").fill("07700 900123");
    if (!careers) {
      await page.getByLabel("Cleaning type").selectOption("Domestic cleaning");
      await page.getByLabel("Property type").selectOption("Flat");
      await page.getByLabel("Postcode").fill("IG1 1AA");
    }
    await page
      .getByRole("button", {
        name: careers ? "Try the Interest Form" : "Try the Quote Request",
      })
      .click();
    await expect(page.getByRole("status")).toBeFocused();
    await expect(page.getByRole("status")).toContainText(
      "Nothing was sent, stored or emailed",
    );
    expect(requests).toEqual([]);
    expect(
      await page.evaluate(() => ({
        local: localStorage.length,
        session: sessionStorage.length,
        cookies: document.cookie,
      })),
    ).toEqual({ local: 0, session: 0, cookies: "" });
    await page.getByRole("button", { name: "Try the form again" }).click();
    await expect(page.getByLabel("Full name")).toHaveValue("");
    await expect(page.getByLabel("Full name")).toBeFocused();
  });
}

test("contact links and demo metadata use the intended destinations", async ({
  page,
}) => {
  const externalRequests = [];
  page.on("request", (req) => {
    if (!req.url().startsWith("http://127.0.0.1:4173"))
      externalRequests.push(req.url());
  });
  await page.goto("/#/contact");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await expect(page.locator(".contact-details a").first()).toHaveAttribute(
    "href",
    "tel:+447933961994",
  );
  await expect(page.locator(".contact-details a").nth(1)).toHaveAttribute(
    "href",
    "mailto:Stidyservices@gmail.com",
  );
  await expect(page.locator(".whatsapp")).toHaveAttribute(
    "href",
    "https://wa.me/447933961994",
  );
  expect(externalRequests).toEqual([]);
});

test("capture desktop and mobile layouts for visual review", async ({
  page,
}) => {
  for (const [name, width] of [
    ["desktop", 1440],
    ["mobile", 390],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const section of await page.locator("section").all())
      await section.scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/home-${name}.png`,
      fullPage: true,
      animations: "disabled",
    });
    await page.goto("/#/contact");
    await page.screenshot({
      path: `test-results/contact-${name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  }
});
