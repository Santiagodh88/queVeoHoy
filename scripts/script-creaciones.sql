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

show tables

describe pelicula
use queveohoy;

select * from pelicula;
