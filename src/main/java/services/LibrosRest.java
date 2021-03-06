/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import filters.Secured;
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
import src.vo.LibrosVO;

/**
 *
 * @author rpons
 */
@Path("libro")
public class LibrosRest {

    @GET
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public List<VOI> getLibros(@QueryParam("id") String id) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        List<VOI> name = (id != null) ? fc.buscar(id,FacadeCliente.LIBROS) : fc.obtener(FacadeCliente.LIBROS);
        return name;

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createLibro(LibrosVO libro) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        String grabar = fc.grabar(libro, FacadeCliente.LIBROS);
        return grabar;

    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String update(LibrosVO libro) throws Exception {
        try {
            FacadeCliente fc = new FacadeCliente();
            String grabar = fc.actualizar(libro, FacadeCliente.LIBROS);
            return grabar;
        } catch (Exception ex) {
            return Response.Status.INTERNAL_SERVER_ERROR.toString();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String delete(LibrosVO libro) throws Exception {
        FacadeCliente fc = new FacadeCliente();
        return fc.eliminar(libro, FacadeCliente.LIBROS);

    }
}
