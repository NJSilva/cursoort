/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src.entidades;

import src.framework.valueobject.EntidadesI;
import src.framework.valueobject.VOI;
import src.vo.LibrosVO;
import src.vo.LoginVO;
import src.vo.PersonasVO;
import src.vo.TiposVO;

/**
 *
 * @author Nico
 */
public class FactoryEntidadesI {

    private FactoryEntidadesI fei = new FactoryEntidadesI();

    //use getShape method to get object of type shape 
    public EntidadesI getTipo(VOI tipo) {

        if (tipo == null) {
            return null;
        }

        if (tipo instanceof TiposVO) {
            Tipos tipos = new Tipos();
            tipos.setTipos_codigo(((TiposVO) tipo).getTipos_codigo());
            tipos.setTipos_nombre(((TiposVO) tipo).getTipos_nombre());

            return tipos;
        }

        if (tipo instanceof PersonasVO) {
            Personas personas = new Personas();
            personas.setPersonas_cedula(((PersonasVO) tipo).getPersonas_cedula());
            personas.setPersonas_mail(((PersonasVO) tipo).getPersonas_mail());
            personas.setPersonas_nombre(((PersonasVO) tipo).getPersonas_nombre());

            return personas;
        }

        if (tipo instanceof LoginVO) {
            Login login = new Login();
            login.setLogin_clave(((LoginVO) tipo).getLogin_clave());

            Personas persona = (Personas) fei.getTipo(((LoginVO) tipo).getPersonas());
            login.setPersonas(persona);

            return login;
        }
        
        if(tipo instanceof LibrosVO){
            Libros libro = new Libros();
            libro.setLibros_anio(((LibrosVO) tipo).getLibros_anio());
            libro.setLibros_codigo(((LibrosVO) tipo).getLibros_codigo());
            libro.setLibros_descripcion(((LibrosVO) tipo).getLibros_descripcion());
            libro.setLibros_disponible(((LibrosVO) tipo).getLibros_disponible());
            libro.setLibros_isbn(((LibrosVO) tipo).getLibros_isbn());
            libro.setLibros_titulo(((LibrosVO) tipo).getLibros_titulo());
            
            Tipos tipos = (Tipos) fei.getTipo(((LibrosVO) tipo).getTiposVO());
            libro.setTiposVO(tipos);
            
        }
        
        if(tipo instanceof Prestamos){
            Prestamos prestamo = new Prestamos();
            Libros libros = (Libros) fei.getTipo(((Prestamos) tipo).getLibros());
            prestamo.setLibros(libros);
            
            Personas persona = (Personas) fei.getTipo(((LoginVO) tipo).getPersonas());
            prestamo.setPersonas(persona);
            
            prestamo.setPrestamos_fecha_desde(((Prestamos) tipo).getPrestamos_fecha_desde());
            prestamo.setPrestamos_fecha_hasta(((Prestamos) tipo).getPrestamos_fecha_hasta());
            
            return prestamo;
        }
        
        if(tipo instanceof Reservas){
            Reservas reserva = new Reservas();
            
            Libros libros = (Libros) fei.getTipo(((Prestamos) tipo).getLibros());
            reserva.setLibros(libros);
            
            Personas persona = (Personas) fei.getTipo(((LoginVO) tipo).getPersonas());
            reserva.setPersonas(persona);
            
            return reserva;
        }

       return null;
    }

}
