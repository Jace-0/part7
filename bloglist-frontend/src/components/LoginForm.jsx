import PropTypes from 'prop-types'
import { Button, Container, Row, Col } from 'react-bootstrap'
import '../styles/login.css'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password
}) => (
  <Container className='login-form-container'>
    <Row className='justify-content-center'>
      <Col xs={12} sm={8} md={6}>
        <h2 className='login-title'>Log in to Blog app</h2>
        <form onSubmit={handleLogin}>
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
        password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
              data-testid='password'

            />
          </div>
          <Button  variant='dark' type='submit' className='login-button'>login</Button>
        </form>
      </Col>
    </Row>
  </Container>
)


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm