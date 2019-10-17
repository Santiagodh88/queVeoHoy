var con = require("../lib/conexionbd.js")

function pelicula(req, res) {
    var niIdea = {}
    con.query("select poster, trama, titulo, id from pelicula limit 12", (error, result) => {
        niIdea.peliculas = result;

        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        console.log(req.query);
        console.log(req.params);
        res.json(niIdea)
    });

}

module.exports = {
    pelicula
};