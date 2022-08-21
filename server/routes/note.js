const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

router.get("/fetch-notes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/add-note",
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("discription", "Discription should at least have 5 characters").isLength({ min: 5 }),
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = await Note.create({
        user: req.user,
        title: req.body.title,
        description: req.body.discription,
        tag: req.body.tag,
      });
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put("/update-note/:id", fetchUser, async (req, res) => {
  const { title, discription, tag } = req.body;
  const newNote = {};
  try {
    if (title) {
      newNote.title = title;
    }
    if (discription) {
      newNote.description = discription;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Not Found" });
    }
    if (note.user.toString() !== req.user) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-note/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Not Found" });
    }
    if (note.user.toString() !== req.user) {
      return res.status(401).json({ error: "Not Allowed" });
    }
    note = await Note.findOneAndDelete(req.params.id);
    res.json({ success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
