/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src.test;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import src.facade.FacadeCliente;
import src.framework.UtilesVarios;
import src.framework.valueobject.VOI;
import src.vo.LibrosVO;
import src.vo.PersonasVO;
import src.vo.PrestamosVO;

/**
 * @author Nico
 */
public class TestFacadeClientePrestamosVO {

    public static void main(String args[]) {

        FacadeCliente fc = new FacadeCliente();

        try {
            List<VOI> tipos = fc.obtener(FacadeCliente.PRESTAMOS);

            for (Iterator<VOI> iterator = tipos.iterator(); iterator.hasNext();) {
                PrestamosVO next = (PrestamosVO) iterator.next();
                System.out.println(next.getPersonas().getPersonas_nombre());
                System.out.println(next.getLibros().getLibros_titulo());
                System.out.println(next.getPrestamos_fecha_desde());
                System.out.println(next.getPrestamos_fecha_hasta());
            }
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClientePrestamosVO.class.getName()).log(Level.SEVERE, null, ex);
        }

        /* PERSONAS */
        try {
            PrestamosVO prestamosvo = new PrestamosVO();
            
            VOI libro = fc.obtener(FacadeCliente.LIBROS).get(0);
            VOI persona = fc.obtener(FacadeCliente.PERSONAS).get(0);
            
            prestamosvo.setLibros((LibrosVO) libro);
            prestamosvo.setPersonas((PersonasVO) persona);
            prestamosvo.setPrestamos_fecha_desde(UtilesVarios.formatearStringToDate("30/11/1975" , UtilesVarios.FORMATO_DDMMYYYY));
            
          //  fc.eliminar(prestamosvo, FacadeCliente.PRESTAMOS);
            fc.grabar(prestamosvo, FacadeCliente.PRESTAMOS);

            prestamosvo.setPrestamos_fecha_desde(UtilesVarios.formatearStringToDate("05/12/2018" , UtilesVarios.FORMATO_DDMMYYYY));

            fc.actualizar(prestamosvo, FacadeCliente.PRESTAMOS);
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClientePrestamosVO.class.getName()).log(Level.SEVERE, null, ex);
        }

        /* LIBROS */
        LibrosVO libro = new LibrosVO();
        libro.setLibros_anio(2018);
        //fc.grabar(objetoVO, nombreClase)
    }

}
