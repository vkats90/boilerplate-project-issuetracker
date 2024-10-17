import axios from 'axios'

interface IssueType {
  issue_title: string
  issue_text: string
  created_on: Date
  updated_on: Date
  assigned_to: string
  open: boolean
  status_text: string
}

let token = ''

export const setToken = (responseToken: string) => {
  token = 'bearer ' + responseToken
}

export const getIssues = async () => {
  const issues = await axios.get('http://localhost:3000/api/issues/apitest/', {
    headers: { Authorization: token },
  })

  return issues.data ? (issues.data as IssueType) : []
}
