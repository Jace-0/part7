import { expect } from "@playwright/test"

const loginWith = async (page, username, password)  => {
// using GETBYROLE
// const textboxes = await page.getByRole('textbox').all()
// await textboxes[0].fill('mluukkai')
// await textboxes[1].fill('mluukkai')

  // USING TESTID

  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click();
  await expect(page.getByRole('heading', { name: 'Create new' })).toBeVisible()
  // not an input, does work
  // await page.getByText('title:').fill(title);
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByPlaceholder('enter blog url').fill(url);

  // await page.locator('.url').fill(url)
  await page.getByRole('button', { name: 'create' }).click();
}

// const loginToApi = async (request, username, password) => {
//   const response = await request.post('http://localhost:3003/api/login', {
//     data: {
//       username: username,
//       password: password
//     },
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   return response.token
// }
export { loginWith, createBlog }