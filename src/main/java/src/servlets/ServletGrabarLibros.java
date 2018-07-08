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
import src.validadores.ValidadorLibros;
import src.entidades.Libros;
import src.entidades.Tipos;
import src.vo.LibrosVO;
import src.vo.TiposVO;

public class ServletGrabarLibros extends HttpServlet {

    public ServletGrabarLibros() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        FacadeCliente fc = new FacadeCliente();
        MensajesError me = new MensajesError();
        me.setSucces("false");
        me.setMessage(null);
        try {
            LibrosVO libros = new LibrosVO();
            String LIBROS_CODIGO = request.getParameter("libros_codigo");
            String LIBROS_TITULO = request.getParameter("libros_titulo");
            String LIBROS_ISBN = request.getParameter("libros_isbn");
            String LIBROS_ANIO = request.getParameter("libros_anio");
            String LIBROS_DESCRIPCION = request.getParameter("libros_descripcion");
            String LIBROS_DISPONIBLE = request.getParameter("libros_disponible");
            String TIPOS_CODIGO = request.getParameter("tipos_codigo");
            String TIPOS_NOMBRE = request.getParameter("tipos.tipos_nombre");
            
            libros.setLibros_codigo((LIBROS_CODIGO != null) ? LIBROS_CODIGO : "");
            libros.setLibros_titulo((LIBROS_TITULO != null) ? LIBROS_TITULO : "");
            libros.setLibros_isbn((LIBROS_ISBN != null) ? LIBROS_ISBN : "");
            libros.setLibros_anio((LIBROS_ANIO.length() != 0) ? Integer.parseInt(LIBROS_ANIO) : 0);
            libros.setLibros_descripcion((LIBROS_DESCRIPCION != null) ? LIBROS_DESCRIPCION : "");
            libros.setLibros_disponible((LIBROS_DISPONIBLE.length() != 0) ? Integer.parseInt(LIBROS_DISPONIBLE) : 0);

            TiposVO tipos = (TiposVO) fc.buscar(TIPOS_CODIGO, "Tipos");
            libros.setTiposVO(tipos);

            String operacion = request.getParameter("oper");
// Validaciones del objeto
            ValidadorLibros.validar(libros);

//operaciones que envia JGrid edit add del
            if (operacion.compareToIgnoreCase("add") == 0) {
                fc.grabar(libros, "Libros");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("edit") == 0) {
                fc.actualizar(libros, "Libros");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("del") == 0) {
                fc.eliminar(libros, "Libros");
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
