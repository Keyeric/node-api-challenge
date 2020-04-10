const express = require("express");

const projects = require("../helpers/projectModel");

const router = express.Router();

//POST Requests
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  if (body.name && body.description) {
    projects
      .insert(body)
      .then((newProject) => {
        res.status(201).json(newProject);
      })
      .catch((error) => {
        res.status(500).json({
          message: "server error creating project",
          error: error,
        });
      });
  } else {
    res.status(400).json({ message: `Please add a name and description` });
  }
});

//GET Requests
router.get("/", (req, res) => {
  projects
    .get()
    .then((work) => {
      res.status(200).json(work);
    })
    .catch((error) => {
      res.status(500).json({
        message: "server error retrieving the projects...",
        error: error,
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    projects
      .get(id)
      .then((projectWithActions) => {
        res.status(200).json(projectWithActions);
      })
      .catch((err) => {
        //   console.log(err);
        res.status(500).json({
          message: "Server error retrieving specified project",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  }
});

router.get("/:id/actions", (req, res) => {
  const id = req.params.id;

  if (id) {
    projects
      .getProjectActions(id)
      .then((projectActions) => {
        res.status(418).json(projectActions);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server error retrieving specified project's actions",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  }
});

//PUT Requests
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (id && body.name && body.description) {
    projects
      .update(id, body)
      .then((updatedProject) => {
        res.status(201).json(updatedProject);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server error updating specified project",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  } else if (!body.name || !body.description) {
    res.status(400).json({ message: `name and description are required` });
  }
});

//DELETE Requests
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    projects
      .remove(id)
      .then((byebye) => {
        res.status(200).json(byebye);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server error deleting specified project",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  }
});

module.exports = router;
