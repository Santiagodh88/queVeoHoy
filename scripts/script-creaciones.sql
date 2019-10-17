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

use queveohoy;
ALTER TABLE pelicula
ADD genero_id int ;

ALTER TABLE pelicula
ADD FOREIGN KEY (genero_id) REFERENCES genero(id);