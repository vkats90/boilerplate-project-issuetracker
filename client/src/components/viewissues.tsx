import { useState, useEffect } from 'react'
import { getIssues } from '../services/getIssues'
interface IssueType {
  issue_title: string
  issue_text: string
  created_on: string
  updated_on: string
  created_by: string
  assigned_to: string
  open: boolean
  status_text: string
}

const IssuesViewer = () => {
  const [issues, setIssues] = useState<IssueType[]>()

  useEffect(() => {
    getIssues().then((res) => {
      if (res) setIssues(res as IssueType[])
    })
  }, [getIssues])

  return (
    <div>
      <h1>Project apitest issues</h1>
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Created On</th>
          <th>Updated On</th>
          <th>Created By</th>
          <th>Assigned to</th>
          <th>Open</th>
          <th>Status</th>
        </tr>
        {issues?.map((i) => (
          <tr>
            <td>{i.issue_title}</td>
            <td>{i.issue_text}</td>
            <td>{i.created_on}</td>
            <td>{i.updated_on}</td>
            <td>{i.created_by}</td>
            <td>{i.assigned_to}</td>
            <td>
              <input type="checkbox" checked={i.open} />
            </td>
            <td>{i.status_text}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default IssuesViewer
