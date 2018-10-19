-- Borrar datos existentes

DELETE FROM ESQUEMA.PRESTAMOS;
DELETE FROM ESQUEMA.LIBROS;
DELETE FROM ESQUEMA.TIPOS;

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
update esquema.tipos set tipos_nombre='Novelas niños' where tipos_id=68;

call esquema.sp_libros_insert('1','El principito','35859685214',1960,'Descripcion del libro',15,'elprincipito_antoinedesaintexupery.png','Antoine de Saint-Exupery',68);
call esquema.sp_libros_insert('2','Los crimenes de la Rue Morgue','45644565',1989,'Descripcion del libro',15,'loscrimenesdelacallemorgue.png','Juan C. Morgan',69);
call esquema.sp_libros_insert('3','Matematica aplicada','18526658485',2005,'Ejercicios de matematica para todos',10,'matematicaaplicada.png','Prof. Vales',70);
call esquema.sp_libros_insert('4','Asalto al mundial','35859685214',1950,'Breve reseña del mundial de brasil por un uruguayo',2,'AsaltoalMundial_GustaboGrabia.png','Gustavo Grabia',71);

call esquema.sp_libros_insert('5','Doce estaciones del alma','35859685214',1960,'Descripcion del libro',15,'elprincipito_antoinedesaintexupery.jpg','Antoine de Saint-Exupery',72);
call esquema.sp_libros_insert('6','El presidente ha desaparecido','35859685214',1960,'Descripcion del libro',15,'elprincipito_antoinedesaintexupery.jpg','Antoine de Saint-Exupery',73);



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
call esquema.sp_prestamos_insert(21,1,'2018-05-15',null);
call esquema.sp_prestamos_insert(22,1,'2017-11-15',null);
call esquema.sp_prestamos_insert(23,1,'2018-08-31',null);


call esquema.sp_prestamos_insert(1,1,'2018-08-31',null);


/* login */
select * from esquema.personas;
select * from esquema.login;

call esquema.sp_login_insert('12345678',1);
call esquema.sp_login_insert('12345678',2);




