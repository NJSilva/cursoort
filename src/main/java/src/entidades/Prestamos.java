/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import java.util.Date;
import src.framework.valueobject.EntidadesI;
import src.vo.PrestamosVO;

public class Prestamos extends PrestamosVO implements EntidadesI {

    public Prestamos() {
    }

    public Object[] generarCampos() {
        Object[] datos = {
            new java.sql.Date(getPrestamos_fecha_desde().getTime()),
            new java.sql.Date(getPrestamos_fecha_hasta().getTime()),
            getLibros().getLibros_codigo(),
            getPersonas().getPersonas_cedula()};
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getLibros().getLibros_codigo(),
            getPersonas().getPersonas_cedula()};
        return datos;
    }
}
