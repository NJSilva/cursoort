-- Borrar datos existentes

DELETE FROM ESQUEMA.PRESTAMOS;
DELETE FROM ESQUEMA.LIBROS;
DELETE FROM ESQUEMA.TIPOS;
DELETE FROM ESQUEMA.LOGIN;
DELETE FROM ESQUEMA.PERSONAS;


ALTER TABLE ESQUEMA.TIPOS ALTER COLUMN TIPOS_ID RESTART WITH 1;
ALTER TABLE ESQUEMA.PERSONAS ALTER COLUMN PERSONAS_ID RESTART WITH 1;
ALTER TABLE ESQUEMA.LIBROS ALTER COLUMN LIBROS_ID RESTART WITH 1;

-- TIPOS -- 
/*
Create or Replace Procedure ESQUEMA.SP_Tipos_Insert(
IN P_TIPOS_NOMBRE VARCHAR(50)
)
*/
call esquema.sp_tipos_insert('Novelas');
call esquema.sp_tipos_insert('Matematicas');
call esquema.sp_tipos_insert('Autoayuda');
call esquema.sp_tipos_insert('Geometria');
call esquema.sp_tipos_insert('Informatica');
call esquema.sp_tipos_insert('Gastronomia');
call esquema.sp_tipos_insert('Deportes');
call esquema.sp_tipos_insert('Novelas Ni�os');

-- LIBROS -- 
/*
Create or Replace Procedure ESQUEMA.SP_Libros_Insert(
IN @LIBROS_CODIGO VARCHAR(12),
IN @LIBROS_TITULO VARCHAR(150),
IN @LIBROS_ISBN VARCHAR(25),
IN @LIBROS_ANIO DECIMAL(4,0),
IN @LIBROS_DESCRIPCION VARCHAR(300),
IN @LIBROS_DISPONIBLE DECIMAL(5,0),
IN @LIBROS_IMAGEN VARCHAR(100),
IN @LIBROS_AUTOR VARCHAR(100),
IN @TIPOS_ID DECIMAL(5,0)
)
*/

select * from esquema.tipos;

call esquema.sp_libros_insert('1','El principito','35859685214',1960,'Descripcion del libro',15,'elprincipito_antoinedesaintexupery.png','Antoine de Saint-Exupery',8);
call esquema.sp_libros_insert('2','Los crimenes de la Rue Morgue','45644565',1989,'Descripcion del libro',15,'loscrimenesdelacallemorgue.png','Juan C. Morgan',1);
call esquema.sp_libros_insert('3','Matematica aplicada','18526658485',2005,'Ejercicios de matematica para todos',10,'matematicaaplicada.png','Prof. Vales',2);
call esquema.sp_libros_insert('4','Asalto al mundial','35859685214',1950,'Breve rese�a del mundial de brasil por un uruguayo',2,'AsaltoalMundial_GustaboGrabia.png','Gustavo Grabia',7);

call esquema.sp_libros_insert('5','Doce estaciones del alma','35859685214',1960,'Descripcion del libro',15,'DoceEstacionesDelAlma.png','Tamara Molina',1);
call esquema.sp_libros_insert('6','El presidente ha desaparecido','35859685214',1960,'Descripcion del libro',15,'ElPresidenteHaDesaparecido.png','Jose Llupes',1);

call esquema.sp_libros_insert('7','El diario violeta de carlota ','35859685214',1960,'Descripcion del libro',15,'ElDiarioVioletaDeCarlota.png','Carlota Gimenez',1);
call esquema.sp_libros_insert('8','La confesion','35859685214',1960,'Descripcion del libro',15,'laconfesion_jhongrisham.png','Jose Llupes',1);
call esquema.sp_libros_insert('9','La transparencia el tiempo','35859685214',1960,'Descripcion del libro',15,'LaTransparenciaDelTiempo.png','Hugo Alberto Perdomo',3);
call esquema.sp_libros_insert('10','Pon En Forma Tu Yo Interior','35859685214',1960,'Descripcion del libro',15,'PonEnFormaTuYoInterior.png','Gilberto Saint Rose',3);
call esquema.sp_libros_insert('11','Querido Noha','35859685214',1960,'Descripcion del libro',15,'querodonoha_cochinfernandez.png','Alberto Sonsol',1);
call esquema.sp_libros_insert('12','Una novela criminal','35859685214',1960,'Descripcion del libro',15,'UnaNovelaCriminal.png','Jose Llupes',1);
call esquema.sp_libros_insert('13','Viva la revolucion','35859685214',1960,'Descripcion del libro',15,'VivaLaRevolucion.png','Jose Llupes',1);





-- PERSONAS --
/*
Create or Replace Procedure ESQUEMA.SP_Personas_Insert(
--Campos de la tabla 
IN @PERSONAS_CEDULA VARCHAR(10),
IN @PERSONAS_MAIL VARCHAR(50),
IN @PERSONAS_NOMBRE VARCHAR(120)
)
*/

call esquema.sp_personas_insert('19716428','njsilva@gmail.com','Nicolas Silva');
call esquema.sp_personas_insert('12345678','rpons@gmail.com','Romina Pons');


-- PRESTAMOS --
/*
Create or Replace Procedure ESQUEMA.SP_Prestamos_Insert(
--Campos de la tabla 
IN P_LIBROS_ID DECIMAL(5,0),
IN P_PERSONAS_ID DECIMAL(5,0),
IN P_PRESTAMOS_FECHA_DESDE DATE,
IN P_PRESTAMOS_FECHA_HASTA DATE
)
*/

select * from esquema.libros;
select * from esquema.personas;
select * from esquema.prestamos;

call esquema.sp_prestamos_insert(1,1,'2018-08-31',null);
call esquema.sp_prestamos_insert(2,1,'2018-05-15',null);
call esquema.sp_prestamos_insert(3,1,'2017-11-15',null);
call esquema.sp_prestamos_insert(4,1,'2018-08-31',null);
call esquema.sp_prestamos_insert(5,1,'2017-11-15',null);
call esquema.sp_prestamos_insert(6,1,'2018-07-31',null);

call esquema.sp_prestamos_insert(1,2,'2018-08-31',null);


/* login */
select * from esquema.personas;
select * from esquema.login;

call esquema.sp_login_insert('12345678',1);
call esquema.sp_login_insert('12345678',2);




