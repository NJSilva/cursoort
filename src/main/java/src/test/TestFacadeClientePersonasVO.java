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

/**
 * @author Nico
 */
public class TestFacadeClientePersonasVO {
    
    public static void main(String args[]) {
        
        FacadeCliente fc = new FacadeCliente();
        
        try {
            List<VOI> tipos = fc.obtener(FacadeCliente.PERSONAS);
            
            for (Iterator<VOI> iterator = tipos.iterator(); iterator.hasNext();) {
                PersonasVO next = (PersonasVO) iterator.next();
                System.out.println(next.getPersonas_cedula());
                System.out.println(next.getPersonas_mail());
                System.out.println(next.getPersonas_nombre());
            }
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClientePersonasVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        /* PERSONAS */
        PersonasVO personasvo = new PersonasVO();
        personasvo.setPersonas_cedula("19716428");
        personasvo.setPersonas_mail("nsilva@gmail.com");
        personasvo.setPersonas_nombre("Nicolas Javier Silva Martinez");
        
        try {
            fc.eliminar(personasvo, FacadeCliente.PERSONAS);
            fc.grabar(personasvo, FacadeCliente.PERSONAS);
            
            personasvo.setPersonas_nombre("Nico Cambiado");
            personasvo.setPersonas_mail("njsilva@gmail.com");
            fc.actualizar(personasvo, FacadeCliente.PERSONAS);
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClientePersonasVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        /* LIBROS */
        LibrosVO libro = new LibrosVO();
        libro.setLibros_anio(2018);
        //fc.grabar(objetoVO, nombreClase)
    }
    
}
