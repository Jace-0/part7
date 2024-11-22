import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
const Notification = () => {
  const { message, type } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  const variant = type === 'success' ? 'success' : 'error'
  return (
    <Alert variant={variant} className="nytimes-alert">
      {message}
    </Alert>
  )
}

export default Notification