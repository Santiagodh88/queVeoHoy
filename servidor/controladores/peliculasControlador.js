var con = require("../lib/conexionbd.js")

function pelicula(req, res) {
    var niIdea = {}
    con.query("select poster, trama, titulo, id from pelicula limit 12", (error, result) => {
        niIdea.peliculas = result;
        console.log(req.query);
        console.log(req.params);
        res.json(niIdea)
    });

}

module.exports = {
    pelicula
};