import { FormEventHandler } from 'react'
import { login } from '../services/users'

const LoginPage = () => {
  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault()
    login(e.currentTarget.elements)
  }
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Login</h1>
      <span>
        Username:
        <input type="text" name="username" id="username" />
      </span>
      <span>
        Password:
        <input type="password" name="password" id="password" />
      </span>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
