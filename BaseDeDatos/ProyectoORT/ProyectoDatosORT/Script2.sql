--<ScriptOptions statementTerminator=";"/>

ALTER TABLE Esquema.Libros DROP CONSTRAINT Libros_Tipos_FK;

ALTER TABLE Esquema.Login DROP CONSTRAINT Login_Personas_FK;

ALTER TABLE Esquema.Prestamos DROP CONSTRAINT Prestamos_Libros_FK;

ALTER TABLE Esquema.Prestamos DROP CONSTRAINT Prestamos_Personas_FK;

ALTER TABLE Esquema.Reservas DROP CONSTRAINT Reservas_Libros_FK;

ALTER TABLE Esquema.Reservas DROP CONSTRAINT Reservas_Personas_FK;

ALTER TABLE Esquema.Libros DROP CONSTRAINT Libros_PK;

ALTER TABLE Esquema.Personas DROP CONSTRAINT Personas_PK;

ALTER TABLE Esquema.Tipos DROP CONSTRAINT Tipos_PK;

DROP TABLE Esquema.Libros;

DROP TABLE Esquema.Login;

DROP TABLE Esquema.Personas;

DROP TABLE Esquema.Prestamos;

DROP TABLE Esquema.Reservas;

DROP TABLE Esquema.Tipos;

DROP SCHEMA Esquema RESTRICT;

CREATE SCHEMA Esquema;

CREATE TABLE Esquema.Libros (
		Libros_Codigo VARCHAR(12) NOT NULL, 
		Libros_Titulo VARCHAR(150) NOT NULL, 
		Libros_ISBN VARCHAR(25) NOT NULL, 
		Libros_Anio NUMERIC(4 , 0) NOT NULL, 
		Libros_Descripcion VARCHAR(300), 
		Libros_Disponible NUMERIC(5 , 0) NOT NULL, 
		Tipos_Codigo NUMERIC(5 , 0) NOT NULL, 
		CONSTRAINT Libros_PK PRIMARY KEY
		(Libros_Codigo)
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
		Personas_Nombre VARCHAR(120) NOT NULL, 
		CONSTRAINT Personas_PK PRIMARY KEY
		(Personas_Cedula)
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
		Tipos_Codigo NUMERIC(5 , 0) NOT NULL GENERATED ALWAYS AS IDENTITY , 
		Tipos_Nombre VARCHAR(50) NOT NULL, 
		CONSTRAINT Tipos_PK PRIMARY KEY
		(Tipos_Codigo)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

ALTER TABLE Esquema.Libros ADD CONSTRAINT Libros_Tipos_FK FOREIGN KEY
	(Tipos_Codigo)
	REFERENCES Esquema.Tipos
	(Tipos_Codigo)
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

