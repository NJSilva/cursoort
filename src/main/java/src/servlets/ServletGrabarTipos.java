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
import src.validadores.ValidadorTipos;
import src.vo.TiposVO;

public class ServletGrabarTipos extends HttpServlet {

    public ServletGrabarTipos() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        FacadeCliente fc = new FacadeCliente();
        MensajesError me = new MensajesError();
        me.setSucces("false");
        me.setMessage(null);
        try {
            TiposVO tipos = new TiposVO();
            String TIPOS_ID = request.getParameter("tipos_id");
            String TIPOS_NOMBRE = request.getParameter("tipos_nombre");
            
            tipos.setTipos_id(Integer.valueOf(TIPOS_ID));
            tipos.setTipos_nombre((TIPOS_NOMBRE != null) ? TIPOS_NOMBRE : "");

            String operacion = request.getParameter("oper");
// Validaciones del objeto
            ValidadorTipos.validar(tipos);

//operaciones que envia JGrid edit add del
            if (operacion.compareToIgnoreCase("add") == 0) {
                fc.grabar(tipos, "Tipos");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("edit") == 0) {
                fc.actualizar(tipos, "Tipos");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("del") == 0) {
                fc.eliminar(tipos, "Tipos");
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
