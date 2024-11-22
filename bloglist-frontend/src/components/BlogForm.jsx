import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import '../styles/BlogForm.css'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <Container className="blog-form-container">
      <h2 className="blog-form-title">Create New Blog</h2>
      <Form onSubmit={addBlog} className="blog-form">
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter blog title"
            data-testid="title"
            className="blog-form-input"
          />
        </Form.Group>

        <Form.Group controlId="formAuthor" className="mb-3">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter blog author"
            data-testid="author"
            className="blog-form-input"
          />
        </Form.Group>

        <Form.Group controlId="formUrl" className="mb-3">
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Enter blog URL"
            data-testid="url"
            className="blog-form-input"
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="blog-form-button">
          Create
        </Button>
      </Form>
    </Container>
  )
}


export default BlogForm
