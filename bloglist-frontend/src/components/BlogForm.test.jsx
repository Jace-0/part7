import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { describe, test, expect, vi } from 'vitest'

describe('Blog from', () => {
  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()
    render(
      <BlogForm handleCreateBlog={createBlog}/>
    )

    const title = screen.getByPlaceholderText('enter blog title')
    const author = screen.getByPlaceholderText('enter blog author')
    const  url = screen.getByPlaceholderText('enter blog url')

    const createButtton = screen.getByText('create')

    await user.type(title, 'Test Blog Title')
    await user.type(author, 'Test Author',)
    await user.type(url, 'http://testurl.com')


    await user.click(createButtton)

    expect(createBlog.mock.calls).toHaveLength(1)
    // console.log(createBlog.mock.calls)


  })
})
