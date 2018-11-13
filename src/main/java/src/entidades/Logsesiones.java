/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import src.framework.valueobject.EntidadesI;
import src.vo.LogsesionesVO;

public class Logsesiones extends LogsesionesVO implements EntidadesI {

    public Logsesiones() {
    }

    public Object[] generarCamposPK() {
        Object[] datos = {
            getPersona().getPersonas_id(),
            getInicio(),
            getFin(),
            getToken()
            };
        return datos;
    }

    public Object[] generarCampos() {
        Object[] datos = {
            getFin(),
            getToken()
        };
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getPersona().getPersonas_id(),
            getInicio()
        };
        return datos;
    }
}
