"use strict";
const {
  addIssue,
  listIssues,
  findIssueById,
  updateIssue,
  deleteById,
} = require("../database/utilFuncs.js");
const dbConnect = require("../database/dbconnect");

module.exports = async function (app) {
  app
    .route("/api/issues/:project")
    // the filter currently doesn't work properly, for example filter by date doesn't work, and open=1 / open=true don't work.
    .get(async function (req, res) {
      let project = req.params.project;
      let arr = await listIssues(project);
      for (let i in req.query) {
        arr = arr.filter((x) => x[i] == req.query[i]);
      }
      res.send(arr);
    })

    .post(async function (req, res) {
      let project = req.params.project;
      if (
        !req.body.issue_title ||
        !req.body.issue_text ||
        !req.body.created_by
      ) {
        res.json({ error: "required field(s) missing" });
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
        );
      }
    })

    .put(async function (req, res, next) {
      let project = req.params.project;
      if (!req.body._id) {
        res.json({ error: "missing _id" });
      } else {
        let update = {
          issue_title: req.body.issue_title || undefined,
          issue_text: req.body.issue_text || undefined,
          created_by: req.body.created_by || undefined,
          assigned_to: req.body.assigned_to || undefined,
          status_text: req.body.status_text || undefined,
          open: req.body.open ? false : true,
        };
        console.log(update);
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
          console.log("empty");
          res.json({ error: "no update field(s) sent", _id: req.body._id });
        } else if (!(await findIssueById(req.body._id))) {
          console.log("failed");
          res.json({ error: "could not update", _id: req.body._id });
        } else {
          let result = await updateIssue(req.body._id, update);
          console.log("success");
          res.json({ result: "successfully updated", _id: req.body._id });
        }
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;
      if (!req.body._id) {
        res.json({ error: "missing _id" });
      } else {
        if (!(await findIssueById(req.body._id))) {
          res.json({ error: "could not delete", _id: req.body._id });
        } else {
          await deleteById(req.body._id);
          res.json({ result: "successfully deleted", _id: req.body._id });
        }
      }
    });
};
