"use strict";
const {
  addIssue,
  listIssues,
  findIssueById,
  updateIssue,
} = require("../database/utilFuncs.js");
const dbConnect = require("../database/dbconnect");

module.exports = async function (app) {
  app
    .route("/api/issues/:project")

    .get(async function (req, res) {
      let project = req.params.project;
      res.send(await listIssues(project));
    })

    .post(async function (req, res) {
      let project = req.params.project;
      res.json(
        await addIssue(
          project,
          req.body.issue_title,
          req.body.issue_text,
          req.body.created_by,
          req.body.assigned_to,
          req.body.status_text
        )
      );
    })

    .put(async function (req, res, next) {
      let project = req.params.project;
      let update = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text || undefined,
        created_by: req.body.created_by || undefined,
        assigned_to: req.body.assigned_to || undefined,
        status_text: req.body.status_text || undefined,
        open: req.body.open ? false : true,
      };
      if (!(await findIssueById(req.body._id))) {
        res.json({ error: "could not update", _id: req.body._id });
      } else {
        let result = await updateIssue(req.body._id, update);
        res.json({ result: "successfully updated", _id: req.body._id });
      }
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
