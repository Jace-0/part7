import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import '../styles/toggle.css'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div >
      <div style={hideWhenVisible}>
        <Button  className='btn-create' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className='btn-create' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes ={
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable