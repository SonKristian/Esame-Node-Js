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
  res.send('Benvenuto nel nostro servizio di Album fotografici')
})


//crud sul json album

//get
app.get('/album', album.allAlbum)  //get per prendere tutte le info per id
app.get('/album/:id/name', album.albumIdName)  //get per prendere solo il nome dell'album per id

//update
app.put('/album/:id', album.albumUpdate) //update dell'album con l'id richiesto

//delete
app.delete('/album/:id', album.albumDelete) //delete dell'album chiesto

//create
app.post('/album', album.albumCreate) //create che permette la creazione di album e in automatico fornisce l'ora


/* crud sul json foto */

//get
app.get('/album/foto', foto.allFoto) //get per prendere tutte le foto dal db
app.get('/album/:id/foto/:idf', foto.albumIdFoto) //get per prendere in base all'album la foto

//create
app.post('/album/:id/foto', foto.fotoCreate) //create per creare foto

//update
app.put('/album/:id/foto/:idf', foto.fotoUpdate) //update della foto

//delete
app.delete('/album/:id/foto/:idf', foto.fotoDelete) //delete delle foto 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})