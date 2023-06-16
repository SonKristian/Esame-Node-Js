import fs from "node:fs/promises";
import album from "../db/album.json" assert { type: "json" };
import foto from "../db/foto.json" assert { type: "json" };

let DB_PATH_ALBUM = "./db/album.json";

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

export let nextId = Object.keys(album).reduce(
  (biggest, id) => (biggest > parseInt(id, 10) ? biggest : parseInt(id, 10)),
  0
);

export const allAlbum = (req, res) => {
  res.send(album);
};

export const albumIdName = (req, res) => {
  let albumOnly = [];
  for (let i = 0; i < album.length; i++) {
    if (album[i].id == req.params.id) {
      albumOnly.push(album[i].nome);
      res.send(albumOnly);
    }
  }
  res.status(200).send({
    message: "Album has not been found",
  }).end();
};

export const albumUpdate = async (req, res) => {
  let updatedAlbum = album[req.params.id];
  if (updatedAlbum) {
    let addDate = { ...updatedAlbum, data_modifica: time };
    let newAlbum = { ...addDate, ...req.body };
    album[req.params.id] = newAlbum;
    
    await fs.writeFile(DB_PATH_ALBUM, JSON.stringify(album, null, "  "));
    res.send(album);
  } else {
    res.status(200).send({
      data: {}, error: true, message: "Album hasn't been found",
    });
  }
};

export const albumDelete = (req, res) => {
 
};

export const albumCreate = async (req, res) => {
  nextId++;
  let newAlbum = {
    [nextId]: { ...req.body, data_creazione: time },
  };
  // console.log(nextId)
  // console.log(req.body)

  //allAlbum permette di aggiungere l'album creato al db
  let allAlbum = { ...album, ...newAlbum };

  await fs.writeFile(DB_PATH_ALBUM, JSON.stringify(allAlbum, null, "  "));
  res.status(200).send({
      message: "Album has been created",
    }).end();
};
