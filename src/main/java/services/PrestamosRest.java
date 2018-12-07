/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import src.facade.FacadeCliente;
import src.framework.valueobject.VOI;
import src.vo.PrestamosVO;

/**
 *
 * @author rpons
 */
@Path("prestamo")
public class PrestamosRest {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<VOI> getPrestamos(@QueryParam("cedula") String cedula) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        List<VOI> name = (cedula != null) ? fc.obtenerPorCedula(cedula) : fc.obtener(FacadeCliente.PRESTAMOS);
        return name;

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createPrestamo(PrestamosVO libro) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        
        // Busco la persona asi tengo el ID
//        LoginVO login = new LoginVO();
//        login.setPersonas(libro.getPersonas());
//
//        // Seteo la persona al libro
//        PersonasVO persona = fc.autenticar(login);
//        libro.setPersonas(persona);
        
        String grabar = fc.grabar(libro, FacadeCliente.PRESTAMOS);
        return grabar;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String update(PrestamosVO libro) throws Exception {
        try {
            FacadeCliente fc = new FacadeCliente();
            String grabar = fc.actualizar(libro, FacadeCliente.PRESTAMOS);
            return grabar;
        } catch (Exception ex) {
            return Response.Status.INTERNAL_SERVER_ERROR.toString();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String delete(PrestamosVO libro) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        return fc.eliminar(libro, FacadeCliente.PRESTAMOS);

    }
}
