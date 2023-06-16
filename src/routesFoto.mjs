import foto from "../db/foto.json" assert { type: 'json' }

let DB_PATH_FOTO = "./db/album.json";

export const getAllFoto= (req, res) => {
    res.send(foto)
}

export const getFoto =  (req, res) => {
    const fotografia = foto.filter((foto) => foto.album_id == req.params.id)
    res.send(fotografia)
}

export const createFoto = async (req, res) => {
    
    res.status(200).end()
    await fs.writeFile(DB_PATH_FOTO, JSON.stringify(foto, null, "  "));
}
