import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('home page should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Should have exactly one h1
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)

    // H1 should be the main heading
    await expect(h1Elements.first()).toBeVisible()
  })

  test('all pages should have main landmark', async ({ page }) => {
    const pages = ['/', '/projects', '/publications', '/people']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await expect(page.locator('main')).toBeVisible()
    }
  })

  test('navigation should have proper aria labels', async ({ page }) => {
    await page.goto('/')

    // Main navigation
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' })
    ).toBeVisible()

    // Footer navigation
    await expect(
      page.getByRole('navigation', { name: 'Footer navigation' })
    ).toBeVisible()
  })

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/')

    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('buttons should be keyboard accessible', async ({ page }) => {
    await page.goto('/')

    // Tab to first button
    await page.keyboard.press('Tab')

    // Should be able to focus interactive elements
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('links should have discernible text', async ({ page }) => {
    await page.goto('/')

    const links = page.locator('a')
    const count = await links.count()

    for (let i = 0; i < count; i++) {
      const link = links.nth(i)
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')
      const title = await link.getAttribute('title')

      // Link should have some text or aria-label
      const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel || title
      expect(hasAccessibleName).toBeTruthy()
    }
  })
})

test.describe('Responsive Design', () => {
  test('should be usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Header should still be visible
    await expect(page.getByRole('banner')).toBeVisible()

    // Main content should be visible
    await expect(page.getByRole('main')).toBeVisible()

    // Footer should be visible
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('should be usable on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('navigation should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Navigate to a page
    const navLink = page.getByRole('link', { name: 'Projects' }).first()
    if (await navLink.isVisible()) {
      await navLink.click()
      await expect(page).toHaveURL('/projects')
    }
  })
})
