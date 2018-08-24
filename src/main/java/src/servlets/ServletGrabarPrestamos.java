/* Archivo generado automaticamente por Generador_Servlet_Grabar */
package src.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import src.entidades.Libros;
import src.entidades.Personas;
import src.entidades.Prestamos;
import src.facade.FacadeCliente;
import src.framework.UtilesVarios;
import src.framework.valueobject.MensajesError;
import src.framework.valueobject.UtilMensajesError;
import src.validadores.ValidadorPrestamos;
import src.vo.PrestamosVO;

public class ServletGrabarPrestamos extends HttpServlet {

    public ServletGrabarPrestamos() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        FacadeCliente fc = new FacadeCliente();
        MensajesError me = new MensajesError();
        me.setSucces("false");
        me.setMessage(null);
        try {
            PrestamosVO prestamos = new PrestamosVO();
            
            String LIBROS_CODIGO = request.getParameter("libros_codigo");
            String PERSONAS_CEDULA = request.getParameter("personas_cedula");
            String PRESTAMOS_FECHA_DESDE = request.getParameter("prestamos_fecha_desde");
            String PRESTAMOS_FECHA_HASTA = request.getParameter("prestamos_fecha_hasta");
            String LIBROS_TITULO = request.getParameter("libros.libros_titulo");
            
            prestamos.setPrestamos_fecha_desde((PRESTAMOS_FECHA_DESDE.length() != 0 ? UtilesVarios.formatearFecha(PRESTAMOS_FECHA_DESDE) : null));
            prestamos.setPrestamos_fecha_hasta((PRESTAMOS_FECHA_HASTA.length() != 0 ? UtilesVarios.formatearFecha(PRESTAMOS_FECHA_HASTA) : null));
            
            Libros libros = (Libros) fc.buscar(LIBROS_CODIGO, "Libros");
            prestamos.setLibros(libros);
            
            Personas personas = (Personas) fc.buscar(PERSONAS_CEDULA, "Personas");
            prestamos.setPersonas(personas);

            String operacion = request.getParameter("oper");
// Validaciones del objeto
            ValidadorPrestamos.validar(prestamos);

//operaciones que envia JGrid edit add del
            if (operacion.compareToIgnoreCase("add") == 0) {
                fc.grabar(prestamos, "Prestamos");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("edit") == 0) {
                fc.actualizar(prestamos, "Prestamos");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("del") == 0) {
                fc.eliminar(prestamos, "Prestamos");
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
