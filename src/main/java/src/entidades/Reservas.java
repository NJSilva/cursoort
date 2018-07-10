/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import java.util.Date;
import java.sql.Time;
import src.framework.valueobject.EntidadesI;
import src.vo.ReservasVO;

public class Reservas extends ReservasVO implements EntidadesI {

    public Reservas() {
    }

    public Object[] generarCampos() {
        Object[] datos = {
            getPersonas().getPersonas_cedula(),
            getLibros().getLibros_codigo()};
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getLibros().getLibros_codigo(),
            getPersonas().getPersonas_cedula()
            };
        return datos;
    }
}
