var con = require("../lib/conexionbd.js")

function pelicula(req, res) {
    var data = {}
    con.query("select poster, trama, titulo, id from pelicula limit 12", (error, result) => {

        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        data.peliculas = result;

        console.log(req.query);
        console.log(req.params);
        res.json(data)
    });

}

function genero(req, res) {
    var data = {}
    con.query("select id, nombre from genero", (error, result) => {

        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        data.generos = result;
        res.json(data)
    });

}

module.exports = {
    pelicula,
    genero
};