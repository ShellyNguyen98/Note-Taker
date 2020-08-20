const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')


// GET 
router.get('/api/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POST
router.post('/api/notes', (req, res) => {
    
    fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) { console.log(err) }
        let notes = JSON.parse(data)
        let note = {
            id: uuid.v1(),
            title: req.body.title,
            text: req.body.text,
        }
        notes.push(note)
        fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
            if (err) { console.log(err) }
        })
        res.json(note)
    })
})

// DELETE
router.delete('/api/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    notes = notes.filter(note => note.id !== req.params.id)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router