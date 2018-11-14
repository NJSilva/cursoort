--<ScriptOptions statementTerminator=";"/>

ALTER TABLE Esquema.Prestamos DROP CONSTRAINT Prestamos_Libros_FK;

ALTER TABLE Esquema.Prestamos DROP CONSTRAINT Prestamos_Personas_FK;

ALTER TABLE Esquema.Prestamos DROP CONSTRAINT Prestamos_PK;

DROP TABLE Esquema.Prestamos;

CREATE TABLE Esquema.Prestamos (
		Prestamos_Fecha_Desde DATE NOT NULL, 
		Prestamos_Fecha_Hasta DATE, 
		Personas_id NUMERIC(5 , 0) NOT NULL, 
		Libros_id NUMERIC(5 , 0) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

ALTER TABLE Esquema.Prestamos ADD CONSTRAINT Prestamos_PK PRIMARY KEY
	(Prestamos_Fecha_Desde, 
	 Personas_id, 
	 Libros_id);

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

