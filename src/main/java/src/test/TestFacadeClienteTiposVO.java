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
import src.vo.TiposVO;

/**
 * @author Nico
 */
public class TestFacadeClienteTiposVO {

    public static void main(String args[]) {

        FacadeCliente fc = new FacadeCliente();

        try {
            List<VOI> tipos = fc.obtener(FacadeCliente.TIPOS);
            
            for (Iterator<VOI> iterator = tipos.iterator(); iterator.hasNext();) {
                TiposVO next = (TiposVO) iterator.next();
                System.out.println(next.getTipos_id());
                System.out.println(next.getTipos_nombre());
            }
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClienteTiposVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        
//        /* TIPOS */
//        TiposVO tiposvo = new TiposVO();
////        tiposvo.setTipos_id(12);
//        tiposvo.setTipos_nombre("Nombre diez");
//
//        try {
//            fc.grabar(tiposvo, FacadeCliente.TIPOS);
////            fc.eliminar(tiposvo, FacadeCliente.TIPOS);
//
//
//            tiposvo.setTipos_nombre("Nombre 10");
//            fc.actualizar(tiposvo, FacadeCliente.TIPOS);
//        } catch (SQLException ex) {
//            Logger.getLogger(TestFacadeClienteTiposVO.class.getName()).log(Level.SEVERE, null, ex);
//        }
        
        /* TIPOS */
//        TiposVO tiposvo = new TiposVO();
//        tiposvo.setTipos_id(12);
//        tiposvo.setTipos_nombre("Nombre diez");
//
//        try {
////            fc.grabar(tiposvo, FacadeCliente.TIPOS);
////            fc.eliminar(tiposvo, FacadeCliente.TIPOS);
////            fc.grabar(tiposvo, FacadeCliente.TIPOS);
//
////            tiposvo.setTipos_nombre("Nombre 10");
////            fc.actualizar(tiposvo, FacadeCliente.TIPOS);
//        } catch (SQLException ex) {
//            Logger.getLogger(TestFacadeClienteTiposVO.class.getName()).log(Level.SEVERE, null, ex);
//        }

//        /* LIBROS */
//        LibrosVO libro = new LibrosVO();
//        libro.setLibros_anio(2018);
        //fc.grabar(objetoVO, nombreClase)
    }

}
