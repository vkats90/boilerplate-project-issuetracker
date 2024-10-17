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

export const getIssues = async () => {
  const issues = await axios.get('http://localhost:3000/api/issues/apitest/')

  return issues.data ? (issues.data as IssueType) : []
}
