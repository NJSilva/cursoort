--<ScriptOptions statementTerminator=";"/>

ALTER TABLE Esquema.Reservas DROP CONSTRAINT Reservas_Libros_FK;

ALTER TABLE Esquema.Reservas DROP CONSTRAINT Reservas_Personas_FK;

DROP TABLE Esquema.Reservas;

CREATE TABLE Esquema.Reservas (
		Personas_id NUMERIC(5 , 0) NOT NULL, 
		Libros_id NUMERIC(5 , 0) NOT NULL
	)
	ORGANIZE BY ROW
	DATA CAPTURE NONE 
	IN USERSPACE1
	COMPRESS NO;

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

