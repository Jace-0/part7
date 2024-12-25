const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog App', () => {
  beforeEach( async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    try {
    await page.goto('/');
  } catch (error) {
    console.error('Server Connection Error:', error);
    console.log('Please ensure:');
    console.log('1. npm run dev is running');
    console.log('2. Port 5174 is available');
    console.log('3. No firewall is blocking the connection');
    throw error;
  }

  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('sucessful with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen' )
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('mluukkai')
      await textboxes[1].fill('wrong')
      await page.getByRole('button', {name: 'login'}).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Playwright is great at testing ', 'PlayWright org', 'http://playwright.test')

      await expect(page.getByTestId('blog-collapsed')).toContainText('Playwright is great at testing PlayWright org')
      const collapsedDiv = await page.locator('.collapsedBlog')
      await expect(collapsedDiv).toContainText('Playwright is great at testing PlayWright org')

    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'Playwright to surpass Cypress in 2025 by 34%', 'npm trend', 'http://couldBe.news')
      await expect(page.getByTestId('blog-collapsed')).toBeVisible()
      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByTestId('blog-collapsed')).not.toBeVisible()

      await expect(page.locator('.showDetails')).toBeVisible()
      await page.getByRole('button', {name: 'like'}).click()

      const blogLike = await page.locator('.blogLikes')
      await expect(blogLike).toContainText('likes 1')
    })

    test('blog can be deleted', async ({ page }) => {
      await createBlog(page, 'this blog can be deleted', 'test delete', 'htpp://test.delete')
      await page.getByText('view').click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', {name: 'delete' }).click()
      await expect(page
        .locator('.blogDetails')
        .filter({ hasText: 'this blog can be deleted' })
      ).not.toBeVisible({ timeout: 5000 });
    })

    test('only the user who added the blog sees the blog delete button', async ({ page, request }) => {
      // test.setTimeout(3000)
      await createBlog(page, 'mlukkai blog', 'Matti Luukkainen', 'http://cannotDeleteMyBlog.test')

      await page.getByText('logout').click()
      await request.post('/api/users', {
        data: {
            name: 'Jace Sam',
            username: 'Jace',
            password: 'mluukkainen'
        }
      })
      await loginWith(page,'Jace', 'mluukkainen')
      const blogDiv = await page.getByTestId('blog-collapsed')
      await expect(blogDiv).toContainText('mlukkai blog Matti Luukkainen')
      await page.getByRole('button', {name : 'view'}).click()
      await expect(page.getByRole('button', {name : 'delete'})).not.toBeVisible()
    })
  
    test('blogs are ordered by likes in descending order', async ({ page, request }) => {
        // test.setTimeout(30000)
        // Login to get token
      const token = await page.evaluate(() => {
        const storedData = localStorage.getItem('loggedBlogappUser');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          return parsedData.token; // Extract the token
        }
        // test fails
        return null;
      });
        // console.log(token)

        // First click view buttons to see the likes
        const testBlogs = [
          { 
            title: 'Blog with least likes',
            author: 'Author 1',
            url: 'http://test1.com',
            likes: 5 
          },
          { 
            title: 'Blog with most likes',
            author: 'Author 2',
            url: 'http://test2.com',
            likes: 15 
          },
          { 
            title: 'Blog with medium likes',
            author: 'Author 3',
            url: 'http://test3.com',
            likes: 10 
          }
        ]

        await page.pause()
        // Add test blogs via API
        for (const blog of testBlogs) {
          await page.request.post('http://localhost:3003/api/blogs', {
            data: blog,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        }
      
        // Refresh page to see new blogs
        await page.reload()

        const viewButtons = await page.getByRole('button', { name: 'view' }).all()
        // await page.pause()

        for (const button of viewButtons) {
          await button.click()
        }
        // await page.pause()

        // Get all blog elements and their likes
        const blogElements = await page.locator('.blogDetails').all()

        // Extract likes from each blog
        const likes = await Promise.all(
          blogElements.map(async (blog) => {
            const likesText = await blog.locator('.blogLikes').textContent()
            // Extract number from "likes 5" format
            return parseInt(likesText.split('likes ')[1])
          })
        )
      
        // Create a copy of likes array and sort it in descending order
        const sortedLikes = [...likes].sort((a, b) => b - a)
        
        // Compare the actual array with what it should be
        expect(likes).toEqual(sortedLikes)

        
        // Print for debugging
        // console.log('Current likes order:', likes)
        // console.log('Expected likes order:', sortedLikes)
      })

    })

  })

// npx playwright codegen http://localhost:5174/

// npm test -- --project chromium