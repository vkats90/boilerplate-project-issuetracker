const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("Create an issue with every field: POST request to /api/issues/{project}", function () {
    chai
      .request(server)
      .post("/api/issues/Test_Project")
      .type("form")
      .send({
        issue_title: "title",
        issue_text: "desc",
        created_by: "by",
        assigned_to: "me",
        open: true,
        status_text: "status",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body._id = undefined;
        res.body.created_on = undefined;
        res.body.updated_on = undefined;
        assert.equal(
          JSON.stringify(res.body),
          JSON.stringify({
            issue_title: "title",
            issue_text: "desc",
            created_by: "by",
            assigned_to: "me",
            open: true,
            status_text: "status",
          })
        );
      });
  });
  test("Create an issue with only required fields: POST request to /api/issues/{project}", function () {
    chai
      .request(server)
      .post("/api/issues/Test_Project")
      .type("form")
      .send({
        issue_title: "title",
        issue_text: "desc",
        created_by: "by",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body._id = undefined;
        res.body.created_on = undefined;
        res.body.updated_on = undefined;
        assert.equal(
          JSON.stringify(res.body),
          JSON.stringify({
            issue_title: "title",
            issue_text: "desc",
            created_by: "by",
            assigned_to: "",
            open: true,
            status_text: "",
          })
        );
      });
  });
  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function () {
    chai
      .request(server)
      .post("/api/issues/Test_Project")
      .type("form")
      .send({
        issue_title: "title",
        created_by: "by",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body._id = undefined;
        res.body.created_on = undefined;
        res.body.updated_on = undefined;
        assert.equal(
          JSON.stringify(res.body),
          JSON.stringify({ error: "required field(s) missing" })
        );
      });
  });
  test("View issues on a project: GET request to /api/issues/{project}", function () {
    chai
      .request(server)
      .get("/api/issues/Test_Project")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.isNotEmpty(res.body);
      });
  });
  test("View issues on a project with one filter: GET request to /api/issues/{project}", function () {
    chai
      .request(server)
      .get("/api/issues/apitest?created_on=2023-01-07T23:55:00.194Z")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.isNotEmpty(res.body);
      });
  });
  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function () {
    chai
      .request(server)
      .get("/api/issues/apitest?created_on=2023-01-07T23:55:00.194Z&open=true")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.isNotEmpty(res.body);
      });
  });
  test("Update one field on an issue: PUT request to /api/issues/{project}", function () {
    chai
      .request(server)
      .put("/api/issues/Test_Project")
      .type("form")
      .send({
        _id: "63ba04c8bf239d4cd20ff0d0",
        issue_title: "Updated name",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          JSON.stringify({
            result: "successfully updated",
            _id: "63ba04c8bf239d4cd20ff0d0",
          })
        );
      });
  });
  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function () {
    chai
      .request(server)
      .put("/api/issues/Test_Project")
      .type("form")
      .send({
        _id: "63ba04c8bf239d4cd20ff0d0",
        issue_title: "Updated name",
        issue_text: "This got updated too",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          JSON.stringify({
            result: "successfully updated",
            _id: "63ba04c8bf239d4cd20ff0d0",
          })
        );
      });
  });
  test("Update an issue with missing _id: PUT request to /api/issues/{project}", function () {
    chai
      .request(server)
      .put("/api/issues/Test_Project")
      .type("form")
      .send({
        issue_title: "Updated name",
        issue_text: "This got updated too",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, JSON.stringify({ error: "missing _id" }));
      });
  });
  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function () {
    chai
      .request(server)
      .put("/api/issues/Test_Project")
      .type("form")
      .send({
        _id: "63ba04c8bf239d4cd20ff0d0",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          JSON.stringify({
            error: "no update field(s) sent",
            _id: "63ba04c8bf239d4cd20ff0d0",
          })
        );
      });
  });
  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function () {
    chai
      .request(server)
      .put("/api/issues/Test_Project")
      .type("form")
      .send({
        _id: "invaid id",
        issue_title: "Updated name",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          JSON.stringify({
            error: "could not update",
            _id: "invaid id",
          })
        );
      });
  });
  test("Delete an issue: DELETE request to /api/issues/{project}", function () {
    chai
      .request(server)
      .post("/api/issues/Test_Project")
      .type("form")
      .send({
        issue_title: "for deletion",
        issue_text: "for deletion",
        created_by: "for deletion",
      })
      .end(function (err, res) {
        let newId = res.body._id;
        chai
          .request(server)
          .delete("/api/issues/Test_Project")
          .type("form")
          .send({ _id: newId })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              JSON.stringify({
                result: "successfully deleted",
                _id: newId,
              })
            );
          });
      });
  });
  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function () {
    chai
      .request(server)
      .delete("/api/issues/Test_Project")
      .type("form")
      .send({ _id: "invalid id" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          JSON.stringify({ error: "could not delete", _id: "invalid id" })
        );
      });
  });
  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function () {
    chai
      .request(server)
      .delete("/api/issues/Test_Project")
      .type("form")
      .send({ _id: "" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, JSON.stringify({ error: "missing _id" }));
      });
  });
});
