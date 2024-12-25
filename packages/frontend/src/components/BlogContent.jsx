import { useState , useEffect } from 'react'
import { Link, useParams, Route, Routes } from 'react-router-dom'
import blogService from '../services/blogs'
import '../styles/BlogContent.css'


const BlogContent = ({ blogs, updateBlogState, handleDelete, user }) => {
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const { id } = useParams()
  const [comment, setComment] = useState('')


  // useEffect(() => {
  //   setContent(blog)
  //   if (blog?.comments) {
  //   }
  // }, [id, blogs])

  useEffect(() => {
    const b = blogs.find(b => b.id === id)
    setBlog(b)
    if (blog?.comments) {
      setComments(blog.comments)
    }
  }, [id, blog])

  if (!blog) {
    return <div>Loading...</div>
  }
  // setComments(blog.comments)


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newComment = await blogService.addComment(blog.id, comment)
      setComment('')
      setComments(newComment.comments)

      // Update the parent component's blog state
      // Added updateBlog call in handleSubmit to sync the parent state
      const updatedBlog = {
        ...blog,
        comments: newComment.comments
      }
      await updateBlogState(updatedBlog)

    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }


  // Safe check for user authentication and ownership
  const canDeleteBlog = user && blog?.user && user.id === blog.user.id

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const blogUpdated  = await blogService.updateBlog(updatedBlog.id, updatedBlog)

      await updateBlogState(blogUpdated)
      setBlog(updatedBlog)
    } catch (error) {
      console.error('Error updating blog:', error)
    }

  }


  const handleDeleteClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await handleDelete(blog.id)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }


  return (
    <div>
      <h2 className='ny-times-title'>{blog.title}</h2>
      <div className='blog-url'>{blog.url}</div>
      <div>
          likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div> added by {blog.author}</div>
      {canDeleteBlog &&
          <button
            onClick={handleDeleteClick}
            style={{ backgroundColor: '#e23636', color: 'whiteSmoke', borderRadius: '5px' }}
            className='deleteBtn'
          >
            Delete
          </button>
      }

      <h3 className='ny-times-comments'>comments</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default BlogContent