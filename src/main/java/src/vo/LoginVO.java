/* Archivo generado automaticamente por GeneradorValueObject */
package src.vo;

import src.framework.valueobject.VOI;

public class LoginVO implements VOI{

    private String login_clave;
    private PersonasVO personas;

    public LoginVO() {
    }

    public String getLogin_clave() {
        return this.login_clave;
    }

    public void setLogin_clave(String _login_clave) {
        this.login_clave = _login_clave;
    }

    public PersonasVO getPersonas() {
        return this.personas;
    }

    public void setPersonas(PersonasVO _personas) {
        this.personas = _personas;
    }
}
