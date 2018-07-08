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
import src.framework.valueobject.VOI;
import src.vo.LibrosVO;
import src.vo.PersonasVO;
import src.vo.ReservasVO;

/**
 * @author Nico
 */
public class TestFacadeClienteReservasVO {
    
    public static void main(String args[]) {
        
        FacadeCliente fc = new FacadeCliente();
        
        try {
            List<VOI> tipos = fc.obtener(FacadeCliente.RESERVAS);
            
            for (Iterator<VOI> iterator = tipos.iterator(); iterator.hasNext();) {
                ReservasVO next = (ReservasVO) iterator.next();
                System.out.println(next.getLibros().getLibros_titulo());
                System.out.println(next.getPersonas().getPersonas_nombre());
            }
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClienteReservasVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        /* TIPOS */
        try {
            ReservasVO reservasvo = new ReservasVO();
        
            VOI libro = fc.buscar("1", FacadeCliente.LIBROS).get(0);
            VOI persona = fc.buscar("19716428", FacadeCliente.PERSONAS).get(0);
            
            reservasvo.setLibros((LibrosVO) libro);
            reservasvo.setPersonas((PersonasVO) persona);
        
        
            fc.eliminar(reservasvo, FacadeCliente.RESERVAS);
            fc.grabar(reservasvo, FacadeCliente.RESERVAS);
            fc.actualizar(reservasvo, FacadeCliente.RESERVAS);
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClienteReservasVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        /* LIBROS */
        LibrosVO libro = new LibrosVO();
        libro.setLibros_anio(2018);
        //fc.grabar(objetoVO, nombreClase)
    }
    
}
