const LoginPage = () => {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Login</h1>
      <span>
        Username:
        <input type="text" name="username" id="username" />
      </span>
      <span>
        Password:
        <input type="password" name="password" />
      </span>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
