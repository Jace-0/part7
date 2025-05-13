import { useState, useReducer } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Container, Row, Col } from 'react-bootstrap'
import '../styles/login.css'
import signUpService from '../services/users'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async (event) => {
    event.preventDefault()

    try {
      const user = await signUpService.createUser({
        username, fullName, password
      })

      // save user to browser local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      dispatch(setUser(user))

      setUsername('')
      setPassword('')
      navigate('/')
      dispatch(setNotification('Successfully signed up', 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'))
    }

  }



  return (
    <Container className='login-form-container'>
      <Row className='justify-content-center'>
        <Col xs={12} sm={8} md={6}>
          <h2 className='login-title'>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div>
        username
              <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
                data-testid='username'
              />
            </div>
            <div>
        fullName
              <input
                type='text'
                value={fullName}
                name='FullName'
                onChange={({ target }) => setFullName(target.value)}
                data-testid='fullname'
              />
            </div>
            <div>
        password
              <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
                data-testid='password'

              />
            </div>
            <Button  variant='dark' type='submit' className='login-button'>Sign Up</Button>
          </form>
        </Col>
      </Row>
    </Container>
  )
}


export default SignUpForm