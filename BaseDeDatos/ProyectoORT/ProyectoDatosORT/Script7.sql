--<ScriptOptions statementTerminator=";"/>

CREATE SCHEMA Esquema;

CREATE TABLE Esquema.Libros (
		Libros_id NUMERIC(5 , 0) NOT NULL GENERATED ALWAYS AS IDENTITY , 
		Libros_Codigo VARCHAR(12) NOT NULL, 
		Libros_Titulo VARCHAR(150) NOT NULL, 
		Libros_ISBN VARCHAR(25) NOT NULL, 
		Libros_Anio NUMERIC(4 , 0) NOT NULL, 
		Libros_Descripcion VARCHAR(300), 
		Libros_Disponible NUMERIC(5 , 0) NOT NULL, 
		Libros_imagen VARCHAR(100), 
		Libros_Autor VARCHAR(100) NOT NULL, 
		Tipos_id NUMERIC(5 , 0) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Login (
		Login_Clave VARCHAR(10) NOT NULL, 
		Personas_id NUMERIC(5 , 0)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Personas (
		Personas_id NUMERIC(5 , 0) NOT NULL GENERATED ALWAYS AS IDENTITY , 
		Personas_Cedula VARCHAR(10) NOT NULL, 
		Personas_Mail VARCHAR(50) NOT NULL, 
		Personas_Nombre VARCHAR(120) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Prestamos (
		Prestamos_Fecha_Desde DATE NOT NULL, 
		Prestamos_Fecha_Hasta DATE, 
		Personas_id NUMERIC(5 , 0), 
		Libros_id NUMERIC(5 , 0)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Reservas (
		Personas_id NUMERIC(5 , 0) NOT NULL, 
		Libros_id NUMERIC(5 , 0) NOT NULL
	)
	ORGANIZE BY ROW
	DATA CAPTURE NONE 
	IN USERSPACE1
	COMPRESS NO;

CREATE TABLE Esquema.Tipos (
		Tipos_id NUMERIC(5 , 0) NOT NULL GENERATED ALWAYS AS IDENTITY , 
		Tipos_Nombre VARCHAR(50) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

ALTER TABLE Esquema.Libros ADD CONSTRAINT Libros_Libros_id_UN UNIQUE
	(Libros_Codigo);

ALTER TABLE Esquema.Libros ADD CONSTRAINT Libros_PK PRIMARY KEY
	(Libros_id);

ALTER TABLE Esquema.Personas ADD CONSTRAINT Personas_PK PRIMARY KEY
	(Personas_id);

ALTER TABLE Esquema.Personas ADD CONSTRAINT Personas_Personas_id_UN UNIQUE
	(Personas_Cedula);

ALTER TABLE Esquema.Tipos ADD CONSTRAINT Tipos_PK PRIMARY KEY
	(Tipos_id);

ALTER TABLE Esquema.Tipos ADD CONSTRAINT Tipos_Tipos_id_UN UNIQUE
	(Tipos_Nombre);

ALTER TABLE Esquema.Libros ADD CONSTRAINT Libros_Tipos_FK FOREIGN KEY
	(Tipos_id)
	REFERENCES Esquema.Tipos
	(Tipos_id)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Login ADD CONSTRAINT Login_Personas_FK FOREIGN KEY
	(Personas_id)
	REFERENCES Esquema.Personas
	(Personas_id)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Prestamos ADD CONSTRAINT Prestamos_Libros_FK FOREIGN KEY
	(Libros_id)
	REFERENCES Esquema.Libros
	(Libros_id)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Prestamos ADD CONSTRAINT Prestamos_Personas_FK FOREIGN KEY
	(Personas_id)
	REFERENCES Esquema.Personas
	(Personas_id)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Reservas ADD CONSTRAINT Reservas_Libros_FK FOREIGN KEY
	(Libros_id)
	REFERENCES Esquema.Libros
	(Libros_id)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Reservas ADD CONSTRAINT Reservas_Personas_FK FOREIGN KEY
	(Personas_id)
	REFERENCES Esquema.Personas
	(Personas_id)
	ON DELETE RESTRICT;

