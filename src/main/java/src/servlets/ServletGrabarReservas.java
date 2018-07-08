/* Archivo generado automaticamente por Generador_Servlet_Grabar */
package src.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import java.sql.SQLException;
import src.facade.FacadeCliente;
import src.framework.valueobject.MensajesError;
import src.framework.valueobject.UtilMensajesError;
import src.validadores.ValidadorReservas;
import src.entidades.Libros;
import src.entidades.Personas;
import src.entidades.Reservas;
import src.vo.ReservasVO;

public class ServletGrabarReservas extends HttpServlet {

    public ServletGrabarReservas() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        FacadeCliente fc = new FacadeCliente();
        MensajesError me = new MensajesError();
        me.setSucces("false");
        me.setMessage(null);
        
        try {
            ReservasVO reservas = new ReservasVO();
                    
            String PERSONAS_CEDULA = request.getParameter("personas_cedula");
            String LIBROS_CODIGO = request.getParameter("libros_codigo");
            String PERSONAS_MAIL = request.getParameter("personas.personas_mail");
            String LIBROS_TITULO = request.getParameter("libros.libros_titulo");
            
            Personas personas = (Personas) fc.buscar(PERSONAS_CEDULA, "Personas");
            reservas.setPersonas(personas);
            Libros libros = (Libros) fc.buscar(LIBROS_CODIGO, "Libros");
            reservas.setLibros(libros);
            
            reservas.setPersonas(personas);
            reservas.setLibros(libros);


            String operacion = request.getParameter("oper");
// Validaciones del objeto
            ValidadorReservas.validar(reservas);

//operaciones que envia JGrid edit add del
            if (operacion.compareToIgnoreCase("add") == 0) {
                fc.grabar(reservas, "Reservas");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("edit") == 0) {
                fc.actualizar(reservas, "Reservas");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("del") == 0) {
                fc.eliminar(reservas, "Reservas");
                me.setSucces("true");
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (e instanceof SQLException) {
                me.setMessage("Error: " + e.getMessage());
            } else {
                me.setMessage(UtilMensajesError.manejarError(e));
            }
        } finally {
            Gson gson = new Gson();
            PrintWriter out = response.getWriter();
            out.print(gson.toJson(me.getMessage()));
            out.flush();
            out.close();
        }
    }
}
