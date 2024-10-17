import { FormEventHandler } from 'react'
import { register } from '../services/users'

const RegisterPage = () => {
  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault()
    register(e.currentTarget.elements)
  }
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Register</h1>
      <span>
        Username:
        <input type="text" name="username" id="username" />
      </span>
      <span>
        Password:
        <input type="password" name="password" id="password" />
      </span>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterPage
