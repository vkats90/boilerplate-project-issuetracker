import { ReactNode } from 'react'

type Buttons = {
  login: ReactNode
  issues: ReactNode
  addIssue: ReactNode
  editIssue: ReactNode
}

type P = keyof Buttons

const PageChooser = ({
  display,
  setDisplay,
}: {
  display: string
  setDisplay: (display: string) => void
}) => {
  const buttons = {
    login: <button onClick={() => setDisplay('login')}>Login</button>,
    register: <button onClick={() => setDisplay('register')}>Register</button>,
    issues: <button onClick={() => setDisplay('issues')}>Issues</button>,
    addIssue: <button onClick={() => setDisplay('addIssue')}>Add Issue</button>,
    editIssue: <button onClick={() => setDisplay('editIssue')}>Edit Issue</button>,
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        margin: 'auto',
        justifyContent: 'center',
      }}
    >
      {Object.keys(buttons).map((key) => {
        if (key != display) return buttons[key as P]
      })}
    </div>
  )
}

export default PageChooser
