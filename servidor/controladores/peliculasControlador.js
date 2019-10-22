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

        //Calculo el total

        /// Hay que arreglar para que funcione el callback de las funciones
        /// de manera asincrona
        var total = calcularTotalQuery(req.query);
        con.query(total, (error, result) => {

            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }

            data.total = result[0].total;
            //console.log(result);
            res.json(data);
        });
    });

}

function calcularTotalQuery(query) {
    var queryfinal = "select count (*) as total from pelicula ";
    var queryWhere = "";
    var inicio = parseInt(query.cantidad) * (parseInt(query.pagina) - 1);
    var queryOrder = " order by " + query.columna_orden + " " + query.tipo_orden;

    queryWhere = agregarWheres(query);

    //console.log(queryfinal.concat(queryWhere, queryOrder, queryLimit))
    return queryfinal.concat(queryWhere, queryOrder);


}

function resolverQuery(query) {
    var queryfinal = "select poster, trama, titulo, id from pelicula ";
    var queryWhere = "";
    var inicio = parseInt(query.cantidad) * (parseInt(query.pagina) - 1);
    var queryOrder = " order by " + query.columna_orden + " " + query.tipo_orden;
    var queryLimit = " limit " + inicio + "," + query.cantidad;

    queryWhere = agregarWheres(query);

    //console.log(queryfinal.concat(queryWhere, queryOrder, queryLimit))
    return queryfinal.concat(queryWhere, queryOrder, queryLimit);
}

function agregarWheres(query) {
    let queryWhere = "";
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

    return queryWhere;
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

function buscarInfoPelicula(req, res) {
    var data = {}
    var consulta = buscarPeliculaQuery(req.params.id);
    //console.log(req.params.id);
    con.query(consulta, (error, result) => {

        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }


        var response = {
            'pelicula': result[0],
            'genero': result[0].nombre,
            'actores': result.actores
        };

        res.json(response)

        //console.log(req.query);

    });

}

function buscarPeliculaQuery(id) {
    var query = "select p.titulo, p.duracion, p.trama, p.director, p.anio, p.fecha_lanzamiento, p.puntuacion, p.poster, a.nombre as actores, g.nombre " +
        "from pelicula p, actor a, actor_pelicula ap, genero g " +
        "where p.id = ap.pelicula_id " +
        "and a.id = ap.actor_id " +
        "and p.genero_id = g.id " +
        "and p.id = " + id + ";";
    //console.log(query);
    return query;

}

module.exports = {
    pelicula,
    genero,
    buscarInfoPelicula
};