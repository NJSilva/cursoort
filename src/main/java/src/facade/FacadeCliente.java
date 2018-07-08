/* Archivo generado automaticamente por GeneradorFacade */
package src.facade;

import src.helper.helperInterfaces.HelperLoginDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.helper.helperInterfaces.HelperPrestamosDaoI;
import src.helper.helperInterfaces.HelperReservasDaoI;
import src.helper.helperInterfaces.HelperTiposDaoI;
import src.framework.AbstractFacade;
import src.helper.helperImplementacion.HelperLibrosDaoImpl;
import src.helper.helperImplementacion.HelperLoginDaoImpl;
import src.helper.helperImplementacion.HelperPersonasDaoImpl;
import src.helper.helperImplementacion.HelperPrestamosDaoImpl;
import src.helper.helperImplementacion.HelperReservasDaoImpl;
import src.helper.helperImplementacion.HelperTiposDaoImpl;
import src.helper.helperInterfaces.HelperLibrosDaoI;

public class FacadeCliente extends AbstractFacade {
    
    public static String LIBROS = "Libros";
    public static String LOGIN = "Login";
    public static String PERSONAS = "Personas";
    public static String PRESTAMOS = "Prestamos";
    public static String RESERVAS = "Reservas";
    public static String TIPOS = "Tipos";
    

    HelperLibrosDaoI helperLibros = new HelperLibrosDaoImpl();
    HelperLoginDaoI helperLogin = new HelperLoginDaoImpl();
    HelperPersonasDaoI helperPersonas = new HelperPersonasDaoImpl();
    HelperPrestamosDaoI helperPrestamos = new HelperPrestamosDaoImpl();
    HelperReservasDaoI helperReservas = new HelperReservasDaoImpl();
    HelperTiposDaoI helperTipos = new HelperTiposDaoImpl();

    public FacadeCliente() {
        mapa.put(LIBROS , helperLibros);
        mapa.put(LOGIN, helperLogin);
        mapa.put(PERSONAS, helperPersonas);
        mapa.put(PRESTAMOS, helperPrestamos);
        mapa.put(RESERVAS, helperReservas);
        mapa.put(TIPOS, helperTipos);
    }
}
