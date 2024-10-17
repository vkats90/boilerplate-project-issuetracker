import axios from 'axios'
import { setToken } from './getIssues'

export const login = async (formData: HTMLFormElement) => {
  const res = await axios.post('http://localhost:3000/api/users/login/', {
    username: formData.username.value,
    password: formData.password.value,
  })

  setToken(res.data)
  return res
}

export const register = async (formData: HTMLFormElement) => {
  const res = await axios.post('http://localhost:3000/api/users/register', {
    username: formData.username.value,
    password: formData.password.value,
  })

  return res
}
