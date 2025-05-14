const { Pool } = require("pg");

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'tiago123',
    database: 'likeme',
    allowExitOnIdle: true
})

const agregarPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log("Datos agregados exitosamente!")
} 

/* agregarPost(
  "prueba",
  "https://random.dog/b031bb2e-7dfa-4d76-83b7-369e2f4ff454.jpg",
  "es una prueba",
  1
); */


const obtenerPosts = async () => {
    const { rows } = await pool.query("Select * FROM posts")
    console.log(rows);
    return rows;
}

obtenerPosts()

module.exports = {agregarPost, obtenerPosts}