/* Archivo generado automaticamente por GeneradorValueObject */
package src.vo;

import src.framework.valueobject.VOI;

public class ReservasVO implements VOI {

    private PersonasVO personas;
    private LibrosVO libros;

    public ReservasVO() {
    }

    public PersonasVO getPersonas() {
        return this.personas;
    }

    public void setPersonas(PersonasVO _personas) {
        this.personas = _personas;
    }

    public LibrosVO getLibros() {
        return this.libros;
    }

    public void setLibros(LibrosVO _libros) {
        this.libros = _libros;
    }

}
