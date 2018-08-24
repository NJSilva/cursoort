/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import src.facade.FacadeCliente;
import src.vo.LoginVO;
import src.vo.PersonasVO;
import src.vo.Sesion;

/**
 *
 * @author rpons
 */
@Path("login")
public class LoginRest {

    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public PersonasVO login(LoginVO login) {
        FacadeCliente fc = new FacadeCliente();
        PersonasVO autenticar = null;
        try {
            autenticar = fc.autenticar(login);
        } catch (SQLException ex) {
            Logger.getLogger(LoginRest.class.getName()).log(Level.SEVERE, null, ex);
        }
        return autenticar;
    }
}
