import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test, beforeEach, describe, expect, vi } from 'vitest'

describe('Blog component', () => {
  let container
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'Test User'
    }
  }

  const mockUpdateBlog  = vi.fn()
  const mockHandleDelete = vi.fn()
  beforeEach(() => {
    container = render (
      <Blog
        blog={blog}
        handleDelete={mockHandleDelete}
        updateBlog={mockUpdateBlog}
      />
    ).container
  })
  test('Renders blogs title and author by default', async () => {

    const collapsedView = screen.getAllByTestId('blog-collapsed')

    const div = container.querySelector('.collapsedBlog')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)


    expect(collapsedView[0]).toHaveTextContent(`${blog.title} ${blog.author}`)

    expect(screen.queryByText(blog.url)).not.toBeVisible()
    expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeVisible()

    // We use screen.queryByText() instead of getByText() for elements we expect not to be visible, because queryByText() returns null if the element isn't found while getByText() throws an error

  })

  test('url and likes are shown when button is clicked', async () => {


    const user = userEvent.setup()
    const showButton = screen.getByText('view')
    await user.click(showButton)
    // screen.debug()

    const blogDetails = container.querySelector('.showDetails')
    expect(blogDetails).not.toHaveStyle('display: none')

    const urlDiv = container.querySelector('.blogLikes')
    expect(urlDiv).toBeVisible()

    const likeDiv = container.querySelector('.blogLikes')
    expect(likeDiv).toBeVisible()

  })

  test('like button is clicked twice, the event handler the component received as props is called twice', async () => {

    const user = userEvent.setup()
    const showButton = screen.getByText('view')
    await user.click(showButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)

  })
})
