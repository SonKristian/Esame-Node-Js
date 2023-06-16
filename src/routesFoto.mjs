import fs from 'fs/promises'
import foto from "../db/foto.json" assert { type: 'json' }

let DB_PATH_FOTO = "./db/foto.json";

function getCurrentTime() {
    const data = new Date();
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, "0");
    const day = String(data.getDate()).padStart(2, "0");
    const hours = String(data.getHours()).padStart(2, "0");
    const minutes = String(data.getMinutes()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
    return dateString;
  }
  let time = getCurrentTime();

export let nextId = Object.keys(foto).reduce(
(biggest, id) => biggest > parseInt(id, 10) ? biggest : parseInt(id, 10), 0)

export const allFoto = async (req, res) => {
    res.send(foto)
}

export const albumIdFoto = async (req, res) => {
  res.send(foto[req.params.idf])
}

export const fotoCreate = async (req, res) => {
  nextId++
  let newFoto = { [nextId]: { ...req.body, "data_creazione": time } }

  let updatedFoto = { ...foto, ...newFoto }
  await fs.writeFile(DB_PATH_FOTO, JSON.stringify(updatedFoto, null, '  '))
  
  res.status(200).send({
      message: 'Foto has been created'
    }).end()
}


export const fotoUpdate = async (req, res) => {
  let updatedfoto = foto[req.params.idf]
  if (updatedfoto) {
    let date = { ...updatedfoto, "data_modifica": time }
    let newFoto = { ...date, ...req.body }
    
    foto[req.params.idf] = newFoto
    await fs.writeFile(DB_PATH_FOTO, JSON.stringify(foto, null, '  '))

    res.send(newFoto)
  } else {
    res.status(200).send({
        data: {}, error: true, message: 'Foto has been not found'
    })
  }
}

export const fotoDelete = async (req, res) => {
  let delFoto = foto[req.params.idf]
  if (delFoto) {
    delete foto[req.params.idf]

    await fs.writeFile(DB_PATH_FOTO, JSON.stringify(foto, null, '  '))
    res.status(200).send('Foto has been deleted').end()
  } else {
    res.status(200).send({
        data: {}, error: true, message: 'Foto has not been found'
      })
  }

}