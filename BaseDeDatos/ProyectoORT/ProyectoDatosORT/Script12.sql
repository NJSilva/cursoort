--<ScriptOptions statementTerminator=";"/>

ALTER TABLE Esquema.LogSesiones DROP CONSTRAINT LogSesiones_Personas_FK;

DROP TABLE Esquema.LogSesiones;

CREATE TABLE Esquema.LogSesiones (
		Personas_id NUMERIC(5 , 0) NOT NULL, 
		Ingreso TIMESTAMP NOT NULL, 
		Fin TIMESTAMP, 
		Token VARCHAR(30) NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

ALTER TABLE Esquema.LogSesiones ADD CONSTRAINT LogSesiones_Personas_FK FOREIGN KEY
	(Personas_id)
	REFERENCES Esquema.Personas
	(Personas_id)
	ON DELETE RESTRICT;

