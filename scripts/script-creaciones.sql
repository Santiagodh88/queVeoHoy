create table pelicula (
    id int AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    anio int (5),
    duracion int ,
    director VARCHAR(400) NOT NULL,
    fecha_lanzamiento date,
    puntuacion int (2), 
    poster VARCHAR (300),
    trama VARCHAR (700)
)

use queveohoy;

create table genero (
      id int AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(30) NOT NULL
);


show tables;
use queveohoy;
describe genero;


ALTER TABLE pelicula
ADD genero_id int ;


ALTER TABLE pelicula
ADD FOREIGN KEY (genero_id) REFERENCES genero(id);


describe pelicula;

use queveohoy;
select * from genero;


use queveohoy;
select poster, trama, titulo, id from pelicula
        where genero_id = 13
        and anio = 2004
        and titulo like '%Butterfly %'
        order by id asc;

use queveohoy;
select * from pelicula
limit 10, 10;


CREATE TABLE actor (
    id Int Not Null auto_increment,
    nombre varchar(30) Not Null,
    PRIMARY KEY (id)
    );
    
CREATE TABLE actor_pelicula (
    id Int Not Null auto_increment,
    actor_id int,
    pelicula_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (actor_id) REFERENCES actor(id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
    );
