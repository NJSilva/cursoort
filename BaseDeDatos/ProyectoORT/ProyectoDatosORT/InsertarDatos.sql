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

call esquema.sp_libros_insert('1','El principito','35859685214',1960,'Descripcion del libro',15,'elprincipito_antoinedesaintexupery.jpg','Antoine de Saint-Exupery',41);



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


call esquema.sp_prestamos_insert(1,1,'2018-08-31',null);
call esquema.sp_prestamos_insert(1,2,'2018-05-15',null);










