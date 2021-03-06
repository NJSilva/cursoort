/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import java.sql.Types;
import java.util.Date;
import src.framework.UtilesVarios;
import src.framework.valueobject.EntidadesI;
import src.vo.PrestamosVO;

public class Prestamos extends PrestamosVO implements EntidadesI {

    public Prestamos() {
    }

    public Object[] generarCampos() {
        Object[] datos = {
            getLibros().getLibros_id(),
            getPersonas().getPersonas_id(),
            new java.sql.Date(getPrestamos_fecha_desde_Date().getTime()),
            (null != getPrestamos_fecha_hasta_Date()? new java.sql.Date(getPrestamos_fecha_hasta_Date().getTime()) : null)
        };
        return datos;
    }

    @Override
    public Object[] generarCamposPK() {
        Object[] datos = {
            getLibros().getLibros_id(),
            getPersonas().getPersonas_id(),
            new java.sql.Date(getPrestamos_fecha_desde_Date().getTime()),
            (null != getPrestamos_fecha_hasta() ? new java.sql.Date(getPrestamos_fecha_hasta_Date().getTime()) : null)
        };
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getLibros().getLibros_codigo(),
            getPersonas().getPersonas_cedula()};
        return datos;
    }
}
