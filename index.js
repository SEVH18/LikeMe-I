const express = require("express");
const { agregarPost, obtenerPosts } = require("./consultas");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())

app.listen(3000, console.log("Servidor encendido!"));

app.get("/posts", async (req, res) => {
    const posts = await obtenerPosts();
    res.json(posts);
})

app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    await agregarPost(titulo, img, descripcion, likes);
    res.send("Elementos agregados con éxito!")
})

