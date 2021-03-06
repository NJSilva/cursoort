/* Archivo generado automaticamente por GeneradorValueObject */
package src.vo;

import src.entidades.*;
import java.util.Date;
import src.framework.UtilesVarios;
import src.framework.valueobject.VOI;

public class PrestamosVO implements VOI{

    private Date prestamos_fecha_desde;
    private Date prestamos_fecha_hasta;
    private LibrosVO libros;
    private PersonasVO personas;
    
    private String prestamos_fecha_desde_string;
    private String prestamos_fecha_hasta_string;
    

    public PrestamosVO() {
    }

    public String getPrestamos_fecha_desde(){
        return UtilesVarios.formatearDateToString(prestamos_fecha_desde , UtilesVarios.FORMATO_DDMMYYYY);
    }

    public void setPrestamos_fecha_desde(Date _prestamos_fecha_desde) {
        this.prestamos_fecha_desde = _prestamos_fecha_desde;
    }

    public String getPrestamos_fecha_hasta() {
        return UtilesVarios.formatearDateToString(prestamos_fecha_hasta , UtilesVarios.FORMATO_DDMMYYYY);
    }

    public void setPrestamos_fecha_hasta(Date _prestamos_fecha_hasta) {
        this.prestamos_fecha_hasta = _prestamos_fecha_hasta;
    }

    public LibrosVO getLibros() {
        return this.libros;
    }

    public void setLibros(LibrosVO _libros) {
        this.libros = _libros;
    }

    public PersonasVO getPersonas() {
        return this.personas;
    }

    public void setPersonas(PersonasVO _personas) {
        this.personas = _personas;
    }
    
    public Date getPrestamos_fecha_desde_Date() {
        return prestamos_fecha_desde;
    }

    public Date getPrestamos_fecha_hasta_Date() {
        return prestamos_fecha_hasta;
    }

    /**
     * @return the prestamos_fecha_desde_string
     */
    public String getPrestamos_fecha_desde_string() {
        return UtilesVarios.formatearDateToString(prestamos_fecha_desde , UtilesVarios.FORMATO_yyyyMMdd);
    }

    /**
     * @param prestamos_fecha_desde_string the prestamos_fecha_desde_string to set
     */
    public void setPrestamos_fecha_desde_string(String prestamos_fecha_desde_string) {
        this.prestamos_fecha_desde_string = prestamos_fecha_desde_string;
    }

    /**
     * @return the prestamos_fecha_hasta_string
     */
    public String getPrestamos_fecha_hasta_string() {
        return UtilesVarios.formatearDateToString(prestamos_fecha_hasta , UtilesVarios.FORMATO_yyyyMMdd);
    }

    /**
     * @param prestamos_fecha_hasta_string the prestamos_fecha_hasta_string to set
     */
    public void setPrestamos_fecha_hasta_string(String prestamos_fecha_hasta_string) {
        this.prestamos_fecha_hasta_string = prestamos_fecha_hasta_string;
    }
    
}
