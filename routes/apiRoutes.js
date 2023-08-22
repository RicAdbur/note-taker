const router = require("express").Router();
const path = require("path");
const fs = require("fs/promises")
const dbPath = path.join(__dirname, "..", "db", "db.json")
const nanoid = require("nanoid")

// GET route
router.get("/api/notes", async (req, res) => {
  try {
    const parsedDbJson = JSON.parse(await fs.readFile(dbPath))
    res.json(parsedDbJson)
  } catch (err) {
    res.status(500).send(err)
    console.error(err)
  }
});

// POST route
router.post("/api/notes", async (req, res) => {
  try {
    const notes = JSON.parse(await fs.readFile(dbPath, "utf-8"))
    notes.push({
      title: req.body.title,
      text: req.body.text,
      id: nanoid()
    })
    await fs.writeFile(dbPath, JSON.stringify(notes))
    res.status(201).json(notes)
  } catch(err) {
    res.status(500).send(err)
    console.error(err)
  }
})

// DELETE route
router.delete("/api/notes/:id", async (req, res) => {
  try{
    const notes = JSON.parse(await fs.readFile(dbPath, "utf-8"))
    const noteIndex = notes.findIndex((note) => note.id === req.params.id)
    if (noteIndex === -1) {
      res.status(404).json("No note found")
      return
    } else {
      notes.splice(noteIndex)
    }
    await fs.writeFile(dbPath, JSON.stringify(notes))
    res.json(notes)
  } catch(err) {
    res.status(500).send(err)
    console.error(err)
  }
})

module.exports = router;