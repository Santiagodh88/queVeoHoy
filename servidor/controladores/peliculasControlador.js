var con = require("../lib/conexionbd.js")

function pelicula(req, res) {
    var data = {}

    var consulta = resolverQuery(req.query);

    //console.log(consulta);
    con.query(consulta, (error, result) => {

        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        data.peliculas = result;
        //console.log(req.query);
        //console.log(req.params);
        res.json(data)
    });

}

function resolverQuery(query) {
    var queryfinal = "select poster, trama, titulo, id from pelicula ";
    var queryWhere = "";
    var inicio = parseInt(query.cantidad) * (parseInt(query.pagina) - 1);
    var queryOrder = " order by " + query.columna_orden + " " + query.tipo_orden;
    var queryLimit = " limit " + inicio + "," + query.cantidad;

    for (const prop in query) {
        switch (prop) {
            case "titulo":
                queryWhere += !queryWhere ? " titulo like '%" + query.titulo + "%' " : " and titulo like '%" + query.titulo + "%' ";
                break;
            case "genero":
                queryWhere += !queryWhere ? " genero_id = " + query.genero : " and genero_id = " + query.genero;
                break;
            case "anio":
                queryWhere += !queryWhere ? " anio = " + query.anio : " and anio = " + query.anio;
                break;
            default:
                break;
        }
    }

    if (queryWhere) {
        queryWhere = " where " + queryWhere;
    }


    //console.log(queryfinal.concat(queryWhere, queryOrder, queryLimit))
    return queryfinal.concat(queryWhere, queryOrder, queryLimit);
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