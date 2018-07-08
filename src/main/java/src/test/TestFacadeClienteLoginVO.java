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
import src.vo.LoginVO;
import src.vo.PersonasVO;

/**
 * @author Nico
 */
public class TestFacadeClienteLoginVO {
    
    public static void main(String args[]) {
        
        FacadeCliente fc = new FacadeCliente();
        
        try {
            List<VOI> tipos = fc.obtener(FacadeCliente.LOGIN);
            
            for (Iterator<VOI> iterator = tipos.iterator(); iterator.hasNext();) {
                LoginVO next = (LoginVO) iterator.next();
                System.out.println(next.getLogin_clave());
                System.out.println(next.getPersonas().getPersonas_nombre());
            }
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClienteLoginVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        /* TIPOS */
        try{
            
        VOI persona = fc.obtener(FacadeCliente.PERSONAS).get(0);
            
        LoginVO loginvo = new LoginVO();
        loginvo.setLogin_clave("clave");
        loginvo.setPersonas((PersonasVO) persona);
        
        
            fc.eliminar(loginvo, FacadeCliente.LOGIN);
            fc.grabar(loginvo, FacadeCliente.LOGIN);
            
            loginvo.setLogin_clave("nuevaclave");
            fc.actualizar(loginvo, FacadeCliente.LOGIN);
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClienteLoginVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        /* LIBROS */
        LibrosVO libro = new LibrosVO();
        libro.setLibros_anio(2018);
        //fc.grabar(objetoVO, nombreClase)
    }
    
}
