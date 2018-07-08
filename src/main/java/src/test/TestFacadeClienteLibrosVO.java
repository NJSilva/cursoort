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
import src.vo.LibrosVO;
import src.vo.TiposVO;

/**
 * @author Nico
 */
public class TestFacadeClienteLibrosVO {

    public static void main(String args[]) {

        FacadeCliente fc = new FacadeCliente();

        try {
            List<VOI> tipos = fc.obtener(FacadeCliente.LIBROS);

            for (Iterator<VOI> iterator = tipos.iterator(); iterator.hasNext();) {
                LibrosVO next = (LibrosVO) iterator.next();
                System.out.println(next.getLibros_anio());
                System.out.println(next.getLibros_codigo());
                System.out.println(next.getLibros_descripcion());
                System.out.println(next.getLibros_disponible());
                System.out.println(next.getLibros_isbn());
                System.out.println(next.getLibros_titulo());
            }
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClienteLibrosVO.class.getName()).log(Level.SEVERE, null, ex);
        }

        /* PERSONAS */
        try {
        LibrosVO librosvo = new LibrosVO();
        librosvo.setLibros_anio(2018);
        librosvo.setLibros_codigo("1501");
        librosvo.setLibros_descripcion("Esta es la descripcion del libro");
        librosvo.setLibros_disponible(12);
        librosvo.setLibros_isbn("225413358");
        librosvo.setLibros_titulo("El principito");
        
        VOI tiposvo = fc.obtener(FacadeCliente.TIPOS).get(0);
        librosvo.setTiposVO((TiposVO) tiposvo);
        
            fc.eliminar(librosvo, FacadeCliente.LIBROS);
            fc.grabar(librosvo, FacadeCliente.LIBROS);

            librosvo.setLibros_titulo("El principito modificado");
            librosvo.setLibros_anio(1985);
            fc.actualizar(librosvo, FacadeCliente.LIBROS);
        } catch (SQLException ex) {
            Logger.getLogger(TestFacadeClienteLibrosVO.class.getName()).log(Level.SEVERE, null, ex);
        }

        /* LIBROS */
        LibrosVO libro = new LibrosVO();
        libro.setLibros_anio(2018);
        //fc.grabar(objetoVO, nombreClase)
    }

}
