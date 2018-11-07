/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src.vo;

import java.sql.Timestamp;
import src.framework.valueobject.VOI;

/**
 *
 * @author nsilva
 */
public class LogsesionesVO implements VOI {
    
    private PersonasVO persona;
    private Timestamp inicio;
    private Timestamp fin;
    private String token;

    /**
     * @return the persona
     */
    public PersonasVO getPersona() {
        return persona;
    }

    /**
     * @param persona the persona to set
     */
    public void setPersona(PersonasVO persona) {
        this.persona = persona;
    }

    /**
     * @return the inicio
     */
    public Timestamp getInicio() {
        return inicio;
    }

    /**
     * @param inicio the inicio to set
     */
    public void setInicio(Timestamp inicio) {
        this.inicio = inicio;
    }

    /**
     * @return the fin
     */
    public Timestamp getFin() {
        return fin;
    }

    /**
     * @param fin the fin to set
     */
    public void setFin(Timestamp fin) {
        this.fin = fin;
    }

    /**
     * @return the token
     */
    public String getToken() {
        return token;
    }

    /**
     * @param token the token to set
     */
    public void setToken(String token) {
        this.token = token;
    }
    
    
    
    
}
