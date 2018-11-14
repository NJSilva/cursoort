/* Archivo generado automaticamente por GeneradorFacade */
package src.facade;

import java.sql.SQLException;
import java.util.List;
import src.helper.helperInterfaces.HelperLoginDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.helper.helperInterfaces.HelperPrestamosDaoI;
import src.helper.helperInterfaces.HelperTiposDaoI;
import src.framework.AbstractFacade;
import src.framework.valueobject.VOI;
import src.helper.helperImplementacion.HelperLibrosDaoImpl;
import src.helper.helperImplementacion.HelperLoginDaoImpl;
import src.helper.helperImplementacion.HelperLogsesionesDaoImpl;
import src.helper.helperImplementacion.HelperPersonasDaoImpl;
import src.helper.helperImplementacion.HelperPrestamosDaoImpl;
import src.helper.helperImplementacion.HelperTiposDaoImpl;
import src.helper.helperInterfaces.HelperLibrosDaoI;
import src.helper.helperInterfaces.HelperLogsesionesDaoI;
import src.vo.LoginVO;
import src.vo.PersonasVO;

public class FacadeCliente extends AbstractFacade {

    public static String LIBROS = "Libros";
    public static String LOGIN = "Login";
    public static String PERSONAS = "Personas";
    public static String PRESTAMOS = "Prestamos";
    public static String TIPOS = "Tipos";
    public static String LOGSESIONES = "Logsesiones";

    HelperLibrosDaoI helperLibros = new HelperLibrosDaoImpl();
    HelperLoginDaoI helperLogin = new HelperLoginDaoImpl();
    HelperPersonasDaoI helperPersonas = new HelperPersonasDaoImpl();
    HelperPrestamosDaoI helperPrestamos = new HelperPrestamosDaoImpl();
    HelperTiposDaoI helperTipos = new HelperTiposDaoImpl();
    HelperLogsesionesDaoI helperLogsesiones = new HelperLogsesionesDaoImpl();
    

    public FacadeCliente() {
        mapa.put(LIBROS, helperLibros);
        mapa.put(LOGIN, helperLogin);
        mapa.put(PERSONAS, helperPersonas);
        mapa.put(PRESTAMOS, helperPrestamos);
        mapa.put(TIPOS, helperTipos);
        mapa.put(LOGSESIONES , helperLogsesiones);
                
    }

    public PersonasVO autenticar(LoginVO login) throws SQLException {
        return (PersonasVO) helperLogin.autenticar(login);
    }
    public List<VOI> obtenerPorCedula(String cedula) throws SQLException {
        return (List<VOI>) helperPrestamos.obtenerPorCedula(cedula);
    }
}
