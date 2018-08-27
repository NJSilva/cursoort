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
import src.validadores.ValidadorLogin;
import src.entidades.Login;
import src.entidades.Personas;
import src.vo.LoginVO;
import src.vo.PersonasVO;

public class ServletGrabarLogin extends HttpServlet {

    public ServletGrabarLogin() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        FacadeCliente fc = new FacadeCliente();
        MensajesError me = new MensajesError();
        me.setSucces("false");
        me.setMessage(null);
        try {
            LoginVO login = new LoginVO();
             
            String LOGIN_CLAVE = request.getParameter("login_clave");
            String PERSONAS_CEDULA = request.getParameter("personas_cedula");
       
            login.setLogin_clave((LOGIN_CLAVE != null) ? LOGIN_CLAVE : "");
            
            Personas personas = (Personas) fc.buscar(PERSONAS_CEDULA, "Personas");
            login.setPersonas(personas);

            String operacion = request.getParameter("oper");
// Validaciones del objeto
            ValidadorLogin.validar(login);

//operaciones que envia JGrid edit add del
            if (operacion.compareToIgnoreCase("add") == 0) {
                fc.grabar(login, "Login");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("edit") == 0) {
                fc.actualizar(login, "Login");
                me.setSucces("true");
            }
            if (operacion.compareToIgnoreCase("del") == 0) {
                fc.eliminar(login, "Login");
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
