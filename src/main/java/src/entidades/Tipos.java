/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import src.framework.valueobject.EntidadesI;
import src.framework.valueobject.VOI;
import src.vo.TiposVO;

public class Tipos extends TiposVO implements EntidadesI , VOI {

    public Tipos() {
    }

    public Object[] generarCampos() {
        Object[] datos = {
            getTipos_codigo(),
            getTipos_nombre()};
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {getTipos_codigo()}
    ;
    return datos ;
}
}
