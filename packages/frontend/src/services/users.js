import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const createUser = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}


export default { getUsers, createUser }