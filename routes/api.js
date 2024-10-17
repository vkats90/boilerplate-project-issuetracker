'use strict'
const {
  addIssue,
  listIssues,
  findIssueById,
  updateIssue,
  deleteById,
} = require('../database/utilFuncs.js')
const dbConnect = require('../database/dbconnect')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async function (app) {
  app
    .route('/api/issues/:project')
    // the filter currently doesn't work properly, for example filter by date doesn't work, and open=1 / open=true don't work.
    .get(async function (req, res) {
      const response = jwt.verify(req.headers.authorization.slice(7), process.env.JWT_SECRET)
      console.log(response)
      let project = req.params.project
      let arr = await listIssues(project)
      for (let i in req.query) {
        arr = arr.filter((x) => {
          if (i == 'updated_on' || i == 'created_on') {
            return x[i].getTime() === new Date(req.query[i]).getTime()
          } else if (i == 'open') return x[i] == stringToBoolean(req.query[i])
          else return x[i] == req.query[i]
        })
      }
      res.send(arr)
    })

    .post(async function (req, res) {
      let project = req.params.project
      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        res.json({ error: 'required field(s) missing' })
      } else {
        res.json(
          await addIssue(
            project,
            req.body.issue_title,
            req.body.issue_text,
            req.body.created_by,
            req.body.assigned_to,
            req.body.status_text
          )
        )
      }
    })

    .put(async function (req, res, next) {
      let project = req.params.project
      if (!req.body._id) {
        res.json({ error: 'missing _id' })
      } else {
        let update = {
          issue_title: req.body.issue_title || undefined,
          issue_text: req.body.issue_text || undefined,
          created_by: req.body.created_by || undefined,
          assigned_to: req.body.assigned_to || undefined,
          status_text: req.body.status_text || undefined,
          open: req.body.open ? false : true,
        }
        if (
          JSON.stringify(update) ==
          JSON.stringify({
            issue_title: undefined,
            issue_text: undefined,
            created_by: undefined,
            assigned_to: undefined,
            status_text: undefined,
            open: true,
          })
        ) {
          res.json({ error: 'no update field(s) sent', _id: req.body._id })
        } else if (!(await findIssueById(req.body._id))) {
          res.json({ error: 'could not update', _id: req.body._id })
        } else {
          let result = await updateIssue(req.body._id, update)
          res.json({ result: 'successfully updated', _id: req.body._id })
        }
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project
      if (!req.body._id) {
        res.json({ error: 'missing _id' })
      } else {
        if (!(await findIssueById(req.body._id))) {
          res.json({ error: 'could not delete', _id: req.body._id })
        } else {
          await deleteById(req.body._id)
          res.json({ result: 'successfully deleted', _id: req.body._id })
        }
      }
    })
}

const stringToBoolean = (stringValue) => {
  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true

    case 'false':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false

    default:
      return JSON.parse(stringValue)
  }
}
