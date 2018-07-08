/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import src.framework.valueobject.EntidadesI;
import src.vo.LibrosVO;

public class Libros extends LibrosVO implements EntidadesI {


    public Libros() {
    }



    public Object[] generarCampos() {
        Object[] datos = {
            getLibros_codigo(),
            getLibros_titulo(),
            getLibros_isbn(),
            Integer.valueOf(getLibros_anio()),
            getLibros_descripcion(),
            Integer.valueOf(getLibros_disponible()),
            getTiposVO().getTipos_codigo()};
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getLibros_codigo()};
        return datos;
    }
}
