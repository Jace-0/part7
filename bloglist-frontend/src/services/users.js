import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = () => {
  return axios.get(baseUrl).then(res => res.data)
}


export default getUsers