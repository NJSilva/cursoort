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
import src.vo.PersonasVO;

/**
 *
 * @author rpons
 */
@Path("persona")
public class PersonasRest {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<VOI> getPersonas(@QueryParam("id") String id) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        List<VOI> name = (id != null) ? fc.buscar(id,FacadeCliente.PERSONAS) : fc.obtener(FacadeCliente.PERSONAS);
        return name;

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createPersona(PersonasVO tipo) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        String grabar = fc.grabar(tipo, FacadeCliente.PERSONAS);
        return grabar;

    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String update(PersonasVO persona) throws Exception {
        try {
            FacadeCliente fc = new FacadeCliente();
            String grabar = fc.actualizar(persona, FacadeCliente.PERSONAS);
            return grabar;
        } catch (Exception ex) {
            return Response.Status.INTERNAL_SERVER_ERROR.toString();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String delete(PersonasVO libro) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        return fc.eliminar(libro, FacadeCliente.PERSONAS);

    }
}
