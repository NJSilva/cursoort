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
import src.validadores.ValidadorPersonas;
import src.entidades.Personas;

public class ServletGrabarPersonas extends HttpServlet {

    public ServletGrabarPersonas() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        FacadeCliente fc = new FacadeCliente();
        MensajesError me = new MensajesError();
        me.setSucces("false");
        me.setMessage(null);
        try {
            Personas personas = new Personas();
            String PERSONAS_CEDULA = request.getParameter("personas_cedula");
            String PERSONAS_MAIL = request.getParameter("personas_mail");
            String PERSONAS_NOMBRE = request.getParameter("personas_nombre");
            personas.setPersonas_cedula((PERSONAS_CEDULA != null) ? PERSONAS_CEDULA : "");
            personas.setPersonas_mail((PERSONAS_MAIL != null) ? PERSONAS_MAIL : "");
            personas.setPersonas_nombre((PERSONAS_NOMBRE != null) ? PERSONAS_NOMBRE : "");

            String operacion = request.getParameter("oper");
// Validaciones del objeto
            ValidadorPersonas.validar(personas);

//operaciones que envia JGrid edit add del
            if (operacion.compareToIgnoreCase("add") == 0) {
                fc.grabar(personas, "Personas");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("edit") == 0) {
                fc.actualizar(personas, "Personas");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("del") == 0) {
                fc.eliminar(personas, "Personas");
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
