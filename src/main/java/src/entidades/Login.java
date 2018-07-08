/* Archivo generado automaticamente por GeneradorValueObject */
package src.entidades;

import src.framework.valueobject.EntidadesI;
import src.vo.LoginVO;

public class Login extends LoginVO implements EntidadesI {

    private String login_clave;
    private Personas personas;

    public Login() {
    }

    public Object[] generarCampos() {
        Object[] datos = {
            getLogin_clave(),
            getPersonas().getPersonas_cedula()};
        return datos;
    }

    public Object[] generarPK() {
        Object[] datos = {
            getPersonas().getPersonas_cedula()};
        return datos;
    }
}
