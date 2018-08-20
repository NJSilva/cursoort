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
            getLibros_anio(),
            getLibros_descripcion(),
            getLibros_disponible(),
            getTiposVO().getTipos_id()};
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getLibros_id()};
        return datos;
    }
}
