import { expect, test } from '@playwright/test'

if (process.env.CHAT_TEST_BROWSER_PATH) {
  test.use({ launchOptions: { executablePath: process.env.CHAT_TEST_BROWSER_PATH } })
}

test('opening and first two answers include a clickable phone choice, then stop', async ({ page }) => {
  const answers = [
    'We can inspect the leak and recommend a repair.',
    'We also offer maintenance plans for commercial roofs.',
    'We can discuss replacement if a repair is no longer practical.',
  ]
  const questions = [
    'My roof is leaking near a vent. Can it be repaired?',
    'Do you also offer maintenance plans?',
    'When is replacement appropriate?',
  ]
  let requests = 0
  await page.route('**/api/chat', async route => {
    const body = route.request().postDataJSON()
    expect(body.messages.at(-1).role).toBe('user')
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ message: answers[requests++] }) })
  })

  await page.goto('/')
  await page.getByRole('button', { name: 'Chat with us' }).click()
  const chat = page.locator('div.fixed.bottom-4.right-4')
  await expect(chat.getByText('Welcome to Target Roofing! How can we help with your roof today?')).toBeVisible()
  await expect(chat.getByText(/I'm the Target Roofing assistant|I am an AI/i)).toHaveCount(0)

  const input = chat.getByPlaceholder('Type a message...')
  for (let i = 0; i < answers.length; i++) {
    await input.fill(questions[i])
    await input.press('Enter')
    await expect(chat.getByText(answers[i])).toBeVisible()
    await expect(chat.getByRole('link', { name: '239-332-5707' })).toHaveCount(Math.min(i + 1, 2))
    if (i === 1 && process.env.CHAT_SCREENSHOT_PATH) {
      await chat.evaluate(element => {
        element.style.height = '800px'
        element.style.maxHeight = 'none'
        element.querySelector('.overflow-y-auto')?.scrollTo(0, 0)
      })
      await chat.screenshot({ path: process.env.CHAT_SCREENSHOT_PATH })
    }
  }
  await expect(chat.getByText('Prefer to speak with our team directly? Call Target Roofing at', { exact: false })).toHaveCount(2)
  for (const link of await chat.getByRole('link', { name: '239-332-5707' }).all()) {
    await expect(link).toHaveAttribute('href', 'tel:+12393325707')
  }
  expect(requests).toBe(3)
})

test('generated phone offer is linked without adding the same choice again', async ({ page }) => {
  await page.route('**/api/chat', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ message: 'We can inspect it. Call Target Roofing at 239-332-5707.' }),
  }))
  await page.goto('/')
  await page.getByRole('button', { name: 'Chat with us' }).click()
  const chat = page.locator('div.fixed.bottom-4.right-4')
  const input = chat.getByPlaceholder('Type a message...')
  await input.fill('Can you inspect my roof?')
  await input.press('Enter')
  await expect(chat.getByRole('link', { name: '239-332-5707' })).toHaveCount(1)
  await expect(chat.getByRole('link', { name: '239-332-5707' })).toHaveAttribute('href', 'tel:+12393325707')
  await expect(chat.getByText('Prefer to speak with our team directly?', { exact: false })).toHaveCount(0)
})

test('an explicit identity question receives an honest automated-assistant answer', async ({ page }) => {
  await page.route('**/api/chat', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ message: "I'm an automated Target Roofing assistant. I can help with general roofing questions." }),
  }))
  await page.goto('/')
  await page.getByRole('button', { name: 'Chat with us' }).click()
  const chat = page.locator('div.fixed.bottom-4.right-4')
  const input = chat.getByPlaceholder('Type a message...')
  await input.fill('Are you a real person?')
  await input.press('Enter')
  await expect(chat.getByText(/I'm an automated Target Roofing assistant/)).toBeVisible()
  await expect(chat.getByRole('link', { name: '239-332-5707' })).toHaveAttribute('href', 'tel:+12393325707')
})
