/* Archivo generado automaticamente por Generador_Servlets_Obtener */
package src.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import src.facade.FacadeCliente;

public class ServletObtenerTipos extends HttpServlet {

    public ServletObtenerTipos() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        response.setContentType("text/html; charset=utf-8");
        try {
            FacadeCliente fc = new FacadeCliente();
            List lista = fc.obtener("Tipos");
            if (lista != null) {
                Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
                PrintWriter out = response.getWriter();
                out.print(gson.toJson(lista));
                out.flush();
                out.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
            PrintWriter out = response.getWriter();
            out.print("[]");
            out.flush();
            out.close();
        }
    }
}
