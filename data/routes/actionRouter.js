const express = require("express");

const actions = require("../helpers/actionModel");

const router = express.Router();

//POST Requests
router.post("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const action = { ...body, project_id: id };

  if (body.notes && body.description) {
    actions
      .insert(action)
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch((error) => {
        res.status(500).json({
          message: "server error creating action",
          error: error,
        });
      });
  } else {
    res.status(400).json({ message: `Please add notes and a description` });
  }
});

//GET Requests
router.get("/", (req, res) => {
  actions
    .get()
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "server error retrieving the actions..." });
    });
});

//PUT Requests
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (id && body.notes && body.description) {
    actions
      .update(id, body)
      .then((updatedAction) => {
        res.status(201).json(updatedAction);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server error updating specified action",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  } else if (!body.notes || !body.description) {
    res.status(400).json({ message: `notes and a description are required` });
  }
});

//DELETE Requests
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    actions
      .remove(id)
      .then((noAction) => {
        res.status(200).json(noAction);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server error deleting specified action",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  }
});

module.exports = router;
