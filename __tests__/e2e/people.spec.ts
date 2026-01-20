import { test, expect } from '@playwright/test'

test.describe('People Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/people')
  })

  test('should display page title and description', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Our Team' })
    ).toBeVisible()

    await expect(
      page.getByText('Meet the researchers and staff behind InCity Research')
    ).toBeVisible()
  })

  test('should display role filter options', async ({ page }) => {
    await expect(page.getByText('Filter by role:')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Leadership' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Faculty' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Staff' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Students' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Alumni' })).toBeVisible()
  })

  test('should display results count', async ({ page }) => {
    await expect(page.getByText(/Showing \d+ team member/)).toBeVisible()
  })

  test('should filter by role', async ({ page }) => {
    await page.getByRole('link', { name: 'Faculty' }).click()
    await expect(page).toHaveURL(/role=faculty/)
  })

  test('should clear filter when clicking All', async ({ page }) => {
    await page.goto('/people?role=faculty')
    await page.getByRole('link', { name: 'All' }).click()
    await expect(page).toHaveURL('/people')
  })
})

test.describe('Person Detail Page', () => {
  test('should have back link to people list', async ({ page }) => {
    await page.goto('/people')

    // If there are person cards, click the first one
    const personLinks = page.locator('a[href^="/people/"]').first()

    if (await personLinks.isVisible()) {
      await personLinks.click()
      await expect(page.getByText('Back to Team')).toBeVisible()
    }
  })
})
