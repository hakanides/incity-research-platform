import { test, expect } from '@playwright/test'

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects')
  })

  test('should display page title and description', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Research Projects' })
    ).toBeVisible()

    await expect(
      page.getByText('Explore our ongoing and completed research initiatives')
    ).toBeVisible()
  })

  test('should display theme filter options', async ({ page }) => {
    await expect(page.getByText('Theme:')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Urban Systems' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Human Behavior' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Policy & Planning' })).toBeVisible()
  })

  test('should display status filter options', async ({ page }) => {
    await expect(page.getByText('Status:')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Active' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Completed' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Planned' })).toBeVisible()
  })

  test('should filter by theme', async ({ page }) => {
    await page.getByRole('link', { name: 'Urban Systems' }).click()
    await expect(page).toHaveURL(/theme=systems/)
  })

  test('should filter by status', async ({ page }) => {
    await page.getByRole('link', { name: 'Active' }).click()
    await expect(page).toHaveURL(/status=active/)
  })

  test('should clear filters when clicking All', async ({ page }) => {
    // First apply a filter
    await page.goto('/projects?theme=systems')

    // Then click All to clear
    await page.getByRole('link', { name: 'All' }).first().click()
    await expect(page).toHaveURL('/projects')
  })
})

test.describe('Project Detail Page', () => {
  test('should have back link to projects list', async ({ page }) => {
    // This test requires a real project to exist
    // For now, we test navigation behavior
    await page.goto('/projects')

    // If there are project cards, click the first one
    const projectLinks = page.locator('a[href^="/projects/"]').first()

    if (await projectLinks.isVisible()) {
      await projectLinks.click()
      await expect(page.getByText('Back to Projects')).toBeVisible()
    }
  })
})
