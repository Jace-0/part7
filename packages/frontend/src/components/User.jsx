import getUsers from '../services/users'
import { useState, useEffect } from 'react'
import {
  Link
} from 'react-router-dom'

import { Container, Table } from 'react-bootstrap'
import '../styles/User.css'

const User = () => {
  const [users, setUsers] = useState([])


  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data)
      })
      .catch(error => console.error('Error fetching users:', error))
  }, [])


  return (
    <Container className="nyt-container mt-5">
      <h2 className="nyt-header mb-4">Users</h2>
      <Table striped bordered hover variant="light" className="nyt-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="nyt-link">
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}


export default User