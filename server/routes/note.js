import express from "express";
import Note from "../models/Note.js";
import fetchUser from "../middleware/fetchUser.js"; 
import { body, validationResult } from "express-validator";

const router = express.Router();

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
  body("description", "description should at least have 5 characters").isLength({ min: 5 }),
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
        description: req.body.description,
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
  const { title, description, tag } = req.body;
  const newNote = {};
  try {
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
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
    await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ success: "Note has been updated" });
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
    await Note.findByIdAndDelete(req.params.id)
    res.json({ success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
