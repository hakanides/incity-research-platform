import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/InCity Research/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/')

    // Check header navigation exists
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav).toBeVisible()

    // Check all nav links are present
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Publications' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'People' })).toBeVisible()
  })

  test('should navigate to Projects page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Projects' }).first().click()
    await expect(page).toHaveURL('/projects')
    await expect(page.getByRole('heading', { name: 'Research Projects' })).toBeVisible()
  })

  test('should navigate to Publications page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Publications' }).first().click()
    await expect(page).toHaveURL('/publications')
    await expect(page.getByRole('heading', { name: 'Publications' })).toBeVisible()
  })

  test('should navigate to People page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'People' }).first().click()
    await expect(page).toHaveURL('/people')
    await expect(page.getByRole('heading', { name: 'Our Team' })).toBeVisible()
  })

  test('should show 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-page')
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByText('Page Not Found')).toBeVisible()
  })

  test('should navigate home from 404 page', async ({ page }) => {
    await page.goto('/non-existent-page')
    await page.getByRole('link', { name: 'Go Home' }).click()
    await expect(page).toHaveURL('/')
  })
})
