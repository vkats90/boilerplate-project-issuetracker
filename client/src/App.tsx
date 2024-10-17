import './App.css'
import { useState } from 'react'
import IssuesViewer from './components/viewissues'
import LoginPage from './components/loginPage'
import PageChooser from './components/pageChooser'
import RegisterPage from './components/registerPage'

function App() {
  const [display, setDisplay] = useState('issues')

  return (
    <div>
      <PageChooser display={display} setDisplay={setDisplay} />
      {display == 'issues' && <IssuesViewer />}
      {display == 'login' && <LoginPage />}
      {display == 'register' && <RegisterPage />}
    </div>
  )
}

export default App
