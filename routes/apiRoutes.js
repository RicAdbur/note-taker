const router = require("express").Router();
const path = require("path");
const fs = require("fs/promises")
const dbPath = path.join(__dirname, "..", "db", "db.json")
const nanoid = require("nanoid")

router.get("/api/notes", async (req, res) => {
  try {
    const parsedDbJson = JSON.parse(await fs.readFile(dbPath))
    res.json(parsedDbJson)
  } catch (err) {
    res.status(500).send(err)
    console.error(err)
  }
});

router.post("/api/notes", async (req, res) => {
  try {
    const notes = JSON.parse(await fs.readFile(dbPath, "utf-8"))
    notes.push({
      title: req.body.title,
      text: req.body.text,
      id: nanoid()
    })
    await fs.writeFile(dbPath, JSON.stringify(notes))
    res.json(notes)
  } catch(err) {
    res.status(500).send(err)
    console.error(err)
  }
})







module.exports = router;