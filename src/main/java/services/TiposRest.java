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
import src.vo.TiposVO;

/**
 *
 * @author rpons
 */
@Path("tipo")
public class TiposRest {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<VOI> getTipos(@QueryParam("id") String id) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        List<VOI> name = (id != null) ? fc.buscar(id,FacadeCliente.TIPOS) : fc.obtener(FacadeCliente.TIPOS);
        return name;

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createTipo(TiposVO tipo) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        String grabar = fc.grabar(tipo, FacadeCliente.TIPOS);
        return grabar;

    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String update(TiposVO libro) throws Exception {
        try {
            FacadeCliente fc = new FacadeCliente();
            String grabar = fc.actualizar(libro, FacadeCliente.TIPOS);
            return grabar;
        } catch (Exception ex) {
            return Response.Status.INTERNAL_SERVER_ERROR.toString();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String delete(TiposVO libro) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        return fc.eliminar(libro, FacadeCliente.TIPOS);

    }
}
