import { useState, useReducer } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Container, Row, Col } from 'react-bootstrap'
import '../styles/login.css'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  Link,
} from 'react-router-dom'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      // save user to browser local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification('Successfully logged in', 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'))
    }

  }



  return (
    <>
      <Container className='login-form-container'>
        <Row className='justify-content-center'>
          <Col xs={20} sm={8} md={60}>
            <h2 className='login-title'>Log in to Blog app</h2>
            <form onSubmit={handleLogin}>
              <div>
              username
                <input
                  type='text'
                  value={username}
                  name='Username'
                  onChange={({ target }) => setUsername(target.value)}
                  data-testid='username' />
              </div>
              <div>
              password
                <input
                  type='password'
                  value={password}
                  name='Password'
                  onChange={({ target }) => setPassword(target.value)}
                  data-testid='password' />
              </div>
              <Button variant='dark' type='submit' className='login-button'>login</Button>
            </form>
            <p>Create an account <Link to='signup'>Here</Link></p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginForm