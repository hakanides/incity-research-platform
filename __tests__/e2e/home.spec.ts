import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display hero section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Advancing Urban Research/i })
    ).toBeVisible()

    await expect(
      page.getByText(/InCity Research is dedicated/i)
    ).toBeVisible()
  })

  test('should display CTA buttons in hero', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Explore Projects' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View Publications' })).toBeVisible()
  })

  test('should display Active Projects section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Active Projects' })
    ).toBeVisible()
  })

  test('should display Recent Publications section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Recent Publications' })
    ).toBeVisible()
  })

  test('should display Our Team section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Our Team' })
    ).toBeVisible()
  })

  test('should display footer', async ({ page }) => {
    const footer = page.getByRole('contentinfo')
    await expect(footer).toBeVisible()
    await expect(footer.getByText('InCity Research Platform')).toBeVisible()
  })

  test('should have collaboration CTA section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Interested in Collaborating/i })
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'Get in Touch' })).toBeVisible()
  })
})
