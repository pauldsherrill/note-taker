const notesRouter = require("express").Router();
const fs = require("fs");
const path = require("path");

const notesFilePath = path.join(__dirname, "../db/db.json");

const readNotes = () => {
  try {
    const data = fs.readFileSync(notesFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading notes:", err);
    throw err;
  }
};

const writeNotes = (notes) => {
  try {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
  } catch (err) {
    console.error("Error writing notes:", err);
    throw err;
  }
};

notesRouter.get("/notes", (req, res) => {
  try {
    const notes = readNotes();
    res.json(notes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get notes", details: err.message });
  }
});

notesRouter.post("/notes", (req, res) => {
  try {
    const notes = readNotes();
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to save note", details: err.message });
  }
});

notesRouter.delete("/notes/:id", (req, res) => {
  try {
    const notes = readNotes();
    const updatedNotes = notes.filter((note) => note.id !== req.params.id);
    writeNotes(updatedNotes);
    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete note", details: err.message });
  }
});

module.exports = { notesRouter };
