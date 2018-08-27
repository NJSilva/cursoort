/* Archivo generado automaticamente por GeneradorValueObject */
package src.vo;

import src.framework.valueobject.VOI;

public class PersonasVO implements VOI{

    private int personas_id;
    private String personas_cedula;
    private String personas_mail;
    private String personas_nombre;

    public PersonasVO() {
    }

    public String getPersonas_cedula() {
        return this.personas_cedula;
    }

    public void setPersonas_cedula(String _personas_cedula) {
        this.personas_cedula = _personas_cedula;
    }

    public String getPersonas_mail() {
        return this.personas_mail;
    }

    public void setPersonas_mail(String _personas_mail) {
        this.personas_mail = _personas_mail;
    }

    public String getPersonas_nombre() {
        return this.personas_nombre;
    }

    public void setPersonas_nombre(String _personas_nombre) {
        this.personas_nombre = _personas_nombre;
    }

    /**
     * @return the personas_id
     */
    public int getPersonas_id() {
        return personas_id;
    }

    /**
     * @param personas_id the personas_id to set
     */
    public void setPersonas_id(int personas_id) {
        this.personas_id = personas_id;
    }

}
