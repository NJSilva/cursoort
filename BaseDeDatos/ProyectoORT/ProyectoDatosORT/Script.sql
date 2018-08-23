--<ScriptOptions statementTerminator=";"/>

CREATE SCHEMA Esquema;

CREATE TABLE Esquema.Libros (
		Libros_Codigo VARCHAR(12) NOT NULL, 
		Libros_Titulo VARCHAR(150) NOT NULL, 
		Libros_ISBN VARCHAR(25) NOT NULL, 
		Libros_Anio NUMERIC(4 , 0) NOT NULL, 
		Libros_Descripcion VARCHAR(300), 
		tipos_id NUMERIC(5 , 0) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Login (
		Login_Clave VARCHAR(10) NOT NULL, 
		Personas_Cedula VARCHAR(10) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Personas (
		Personas_Cedula VARCHAR(10) NOT NULL, 
		Personas_Mail VARCHAR(50) NOT NULL, 
		Personas_Nombre VARCHAR(120) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Prestamos (
		Libros_Codigo VARCHAR(12) NOT NULL, 
		Personas_Cedula VARCHAR(10) NOT NULL, 
		Prestamos_Fecha_Desde DATE NOT NULL, 
		Prestamos_Fecha_Hasta DATE
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Reservas (
		Personas_Cedula VARCHAR(10) NOT NULL, 
		Libros_Codigo VARCHAR(12) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE Esquema.Tipos (
		tipos_id NUMERIC(5 , 0) NOT NULL GENERATED ALWAYS AS IDENTITY , 
		Tipos_Nombre VARCHAR(50) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

ALTER TABLE Esquema.Libros ADD CONSTRAINT Libros_PK PRIMARY KEY
	(Libros_Codigo);

ALTER TABLE Esquema.Personas ADD CONSTRAINT Personas_PK PRIMARY KEY
	(Personas_Cedula);

ALTER TABLE Esquema.Tipos ADD CONSTRAINT Tipos_PK PRIMARY KEY
	(tipos_id);

ALTER TABLE Esquema.Libros ADD CONSTRAINT Libros_Tipos_FK FOREIGN KEY
	(tipos_id)
	REFERENCES Esquema.Tipos
	(tipos_id)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Login ADD CONSTRAINT Login_Personas_FK FOREIGN KEY
	(Personas_Cedula)
	REFERENCES Esquema.Personas
	(Personas_Cedula)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Prestamos ADD CONSTRAINT Prestamos_Libros_FK FOREIGN KEY
	(Libros_Codigo)
	REFERENCES Esquema.Libros
	(Libros_Codigo)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Prestamos ADD CONSTRAINT Prestamos_Personas_FK FOREIGN KEY
	(Personas_Cedula)
	REFERENCES Esquema.Personas
	(Personas_Cedula)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Reservas ADD CONSTRAINT Reservas_Libros_FK FOREIGN KEY
	(Libros_Codigo)
	REFERENCES Esquema.Libros
	(Libros_Codigo)
	ON DELETE RESTRICT;

ALTER TABLE Esquema.Reservas ADD CONSTRAINT Reservas_Personas_FK FOREIGN KEY
	(Personas_Cedula)
	REFERENCES Esquema.Personas
	(Personas_Cedula)
	ON DELETE RESTRICT;

