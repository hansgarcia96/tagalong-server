const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Shenanigan = require("../models/shenanigan-model");
const Transportation = require("../models/transportation-model");
const Comment = require("../models/comment-model");

// POST NEW EVENT
router.post("/events", (req, res, next) => {
  console.log("this is the req body info for the event ======= ", req.body);
  console.log("the current user info >>>>>>> ", req.user);

  const myEventBody = req.body;
  myEventBody.author = req.user._id;

  console.log("this is the event info ---- ", myEventBody);

  Shenanigan.create(myEventBody)
    .then(response => {
      console.log("this is the newly created event info ########## ", reponse);
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//CREATE A COMMENT
router.post("/comments", (req, res, next) => {
  const myCommentBody = req.body;
  // myCommentBody.owner = req.user._id;

  // HOW TO GET EVENT ID???

  Comment.create(myCommentBody)
    .then(response => {
      console.log("this is the newly created comment info ########## ", reponse);
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET ALL EVENTS
router.get("/events", (req, res, next) => {



  console.log("this is the session", req.session);
  Shenanigan.find()
    .populate("transportation")
    .then(allTheEvents => {
      res.json(allTheEvents);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET SPECIFIC EVENT
router.get("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Shenanigan.findById(req.params.id) //.populate('User') <------ USER??
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT/EDIT SPECIFIC EVENT
router.put("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Shenanigan.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Event with ${req.body.eventName} is updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE SPECIFIC EVENT
router.delete("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Shenanigan.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Event with ${req.body.eventName} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
