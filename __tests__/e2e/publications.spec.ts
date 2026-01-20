import { test, expect } from '@playwright/test'

test.describe('Publications Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/publications')
  })

  test('should display page title and description', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Publications' })
    ).toBeVisible()

    await expect(
      page.getByText(/Research papers, reports, and academic publications/)
    ).toBeVisible()
  })

  test('should display document type filter options', async ({ page }) => {
    await expect(page.getByText('Type:')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Journal Articles' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Conference Papers' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Theses' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Reports' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Book Chapters' })).toBeVisible()
  })

  test('should display results count', async ({ page }) => {
    await expect(page.getByText(/Showing \d+ publication/)).toBeVisible()
  })

  test('should filter by document type', async ({ page }) => {
    await page.getByRole('link', { name: 'Journal Articles' }).click()
    await expect(page).toHaveURL(/type=journal/)
  })

  test('should clear type filter when clicking All', async ({ page }) => {
    await page.goto('/publications?type=journal')
    await page.getByRole('link', { name: 'All' }).first().click()
    await expect(page).toHaveURL('/publications')
  })
})

test.describe('Publication Detail Page', () => {
  test('should have back link to publications list', async ({ page }) => {
    await page.goto('/publications')

    // If there are publication cards, click the first one
    const publicationLinks = page.locator('a[href^="/publications/"]').first()

    if (await publicationLinks.isVisible()) {
      await publicationLinks.click()
      await expect(page.getByText('Back to Publications')).toBeVisible()
    }
  })
})
