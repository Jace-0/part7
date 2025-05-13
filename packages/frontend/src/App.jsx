import { useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlog } from './reducers/blogReducer'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignupForm'
import BlogContent from './components/BlogContent'
import './Notification.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/users'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'


import User from './components/User'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import './styles/app.css'
import { setUser } from './reducers/userReducer'

const UserHome = ({
  user,
  handleLogOut
}) => {
  const navStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  }

  const linkStyle = {
    paddingRight: 5,
    textDecoration: 'none'
  }

  return (
    <Navbar bg="light" variant="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/blogs" className="navbar-brand-custom">
            Blog App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <span className="navbar-user-info">
              {user.name} logged in
            </span>
            <Button variant="outline-danger" size="sm" onClick={handleLogOut} className="logout-button">
                Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
const Blogs = ({ user, sortedBlogs, handleCreateBlog, updateBlog, deleteBlog }) => {
  return(
    <div>
      <Togglable buttonLabel = 'create new blog'>
        <BlogForm
          handleCreateBlog={handleCreateBlog}
        />
      </Togglable>

      <br/>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          handleDelete={deleteBlog}
          user={user}
          blogs={sortedBlogs}
        />
      )}
    </div>
  )
}

const UserBlogs = () => {
  const [ foundUser, setFoundUser ] = useState(null)
  const id = useParams().id
  useEffect(() => {
    const fetchUser = async () => {
      const users = await userService.getUsers()
      const user = users.find(user => user.id === id)
      setFoundUser(user)
    }
    fetchUser()
  }, [id])


  if (!foundUser) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{foundUser.author}</h2>
      <strong>added blogs</strong>
      {foundUser.blogs.map(blog => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}


const App = () => {

  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        const blogs = await blogService.getAll()
        dispatch(setBlog(blogs))
      }
      fetchBlogs()
    }
  }, [user, dispatch])

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const blog = await blogService
        .createBlog(blogObject)

      dispatch(setBlog([...blogs, blog]))
      dispatch(setNotification(`a new blog ${blog.title}! by ${blog.author} added`, 'success'))
    }catch (exception){
      dispatch(setNotification('Failed to add blog', 'error - server'))
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.updateBlog(updatedBlog.id, updatedBlog)
      dispatch(setBlog(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)))
    }catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const removeBlog = await blogService.deleteBlog(id)
      dispatch(setBlog(blogs.filter(blog => blog.id !== id)))
    }catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const sortedBlogByLikes = (blogsToSort) => {
    return [...blogsToSort].sort((a,b) => b.likes - a.likes)
  }
  const sortedBlogs = sortedBlogByLikes(blogs)


  return (
    <div className='p-4'>
      <Notification/>
      {user ? <UserHome user={user} handleLogOut={handleLogOut} /> : null}
      <Container className="my-4">

        <Link to="/"></Link>

        <Routes>
          <Route path='/users/:id' element={<UserBlogs/>}/>
          <Route path='/blogs/:id' element={user ? <BlogContent blogs={sortedBlogs} updateBlogState={updateBlog} handleDelete={deleteBlog} user={user} />: <LoginForm/>} />
          <Route path='/' element={user ? <Blogs user={user} sortedBlogs={sortedBlogs} handleCreateBlog={handleCreateBlog} updateBlog={updateBlog} deleteBlog={deleteBlog}/> :  <LoginForm/>}></Route>
          <Route path='/blogs' element={<Navigate replace to="/" />}></Route>
          <Route path='/users' element={user ? <User/>: <LoginForm/>}></Route>
          <Route path='signup' element={<SignUpForm/>}></Route>
        </Routes>
      </Container>
    </div>
  )


}

export default App