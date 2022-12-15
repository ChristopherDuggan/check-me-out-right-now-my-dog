import express from 'express'
import connection from './connection.js'
import List from './models/List.js'

const app = express()
app.use(express.json())

app.listen(3000, () => console.log('listening on 3000'))


app.get('/',  (req, res) => {
    res.send('my dope list api')
})

app.get('/list', async (req, res) => {
    res.json(await List.find({}))
})

app.get('/list/:id', (req, res) => {
  List.findById(req.params.id).then(list => {
    res.json(list)
  })
})


app.get('/list/name/:name', (req, res) => {
    List.find({name: req.params.name}).then(lists => {
      res.json(lists)
  })
})

app.post('/list', (req, res) => {
  List.create(req.body).then(list => {
    res.json(list)
  })
})

app.post('/list/:id/item', (req, res) => {
  List.findByIdAndUpdate(
    req.params.id,
    { $push: { items: req.body } },
    { new: true }
  ).then(list => {
    res.json(list)
  })
})








