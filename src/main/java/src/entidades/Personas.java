/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import src.framework.valueobject.EntidadesI;
import src.vo.PersonasVO;

public class Personas extends PersonasVO implements EntidadesI {

    public Personas() {
    }

    public Object[] generarCampos() {
        Object[] datos = {
            getPersonas_cedula(),
            getPersonas_mail(),
            getPersonas_nombre()};
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getPersonas_cedula()};
        return datos;
    }

    @Override
    public Object[] generarCamposPK() {
        Object[] datos = {
            getPersonas_id(),
            getPersonas_cedula(),
            getPersonas_mail(),
            getPersonas_nombre()};
        return datos;
    }
}
