import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser'
const app = express()
const port = 3000

import * as album from './routesAlbum.mjs'
import * as foto from './routesFoto.mjs'

app.use(bodyParser.json())
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//crud sul json album

//get
app.get('/album', album.allAlbum)  //get per prendere tutte le info per id
app.get('/album/:id/name', album.albumIdName)  //get per prendere solo il nome dell'album per id

//update
app.put('/album/:id', album.albumUpdate)

//delete
app.delete('/album/:id', album.albumDelete)

//create
app.post('/album', album.albumCreate) //create che permette la creazione di album e in automatico fornisce l'ora

/* crud sul json foto */

//get
app.get('/album/:id/foto', foto.getAllFoto)
app.get('/foto', foto.getFoto)

//create
app.post('/foto', foto.createFoto)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})