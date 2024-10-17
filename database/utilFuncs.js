const IssueModel = require('./IssueModel')

const errorHandle = (err) => {
  console.log('Eroor: ' + err)
}

async function addIssue(project, title, desc, by, to, status) {
  try {
    let issue = await IssueModel.create({
      project: project,
      issue_title: title,
      issue_text: desc,
      created_on: new Date(),
      updated_on: new Date(),
      created_by: by,
      assigned_to: to || '',
      open: true,
      status_text: status || '',
    })
    issue.project = undefined
    issue.__v = undefined
    return issue
  } catch (err) {
    errorHandle(err)
  }
}

async function listIssues(project) {
  try {
    let issues = await IssueModel.find({ project: project }, '-project')
    return issues
  } catch (err) {
    errorHandle(err)
  }
}

async function findIssueById(id) {
  try {
    let issue = await IssueModel.findById({ _id: id })
    return issue
  } catch (err) {
    errorHandle(err)
  }
}

async function updateIssue(id, update) {
  try {
    update.updated_on = new Date()
    let result = await IssueModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
      rawResult: true,
    })
    return result
  } catch (err) {
    errorHandle(err)
    return undefined
  }
}

async function deleteById(id) {
  await IssueModel.deleteOne({ _id: id })
}

module.exports = {
  addIssue,
  listIssues,
  findIssueById,
  updateIssue,
  deleteById,
}
