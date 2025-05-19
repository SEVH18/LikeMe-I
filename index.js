const express = require("express");
const { agregarPost, obtenerPosts, modificarLikesPosts, eliminarPost } = require("./consultas");
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

app.put("/posts/likes/:id", async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;
   /*  console.log("Recibido", likes) */
    await modificarLikesPosts(likes, id);
    res.send("Likes modificado con éxito!")
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarPost(id);
        res.send("Post eliminado")
    }
    catch ({ code, message }) {
        res.status(code).send(message)
    }
})