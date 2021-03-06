/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src.entidades;

import src.framework.UtilesVarios;
import src.framework.valueobject.EntidadesI;
import src.framework.valueobject.VOI;
import src.vo.LibrosVO;
import src.vo.LoginVO;
import src.vo.LogsesionesVO;
import src.vo.PersonasVO;
import src.vo.PrestamosVO;
import src.vo.TiposVO;

/**
 *
 * @author Nico
 */
public class FactoryEntidadesI {

    
    public EntidadesI getTipo(VOI tipo) {

        if (tipo == null) {
            return null;
        }

        if (tipo instanceof TiposVO) {
            Tipos tipos = new Tipos();
            tipos.setTipos_id(((TiposVO) tipo).getTipos_id());
            tipos.setTipos_nombre(((TiposVO) tipo).getTipos_nombre());

            return tipos;
        }

        if (tipo instanceof PersonasVO) {
            Personas personas = new Personas();
            personas.setPersonas_id(((PersonasVO) tipo).getPersonas_id());
            personas.setPersonas_cedula(((PersonasVO) tipo).getPersonas_cedula());
            personas.setPersonas_mail(((PersonasVO) tipo).getPersonas_mail());
            personas.setPersonas_nombre(((PersonasVO) tipo).getPersonas_nombre());

            return personas;
        }

        if (tipo instanceof LoginVO) {
            Login login = new Login();
            login.setLogin_clave(((LoginVO) tipo).getLogin_clave());

            Personas persona = (Personas) getTipo(((LoginVO) tipo).getPersonas());
            login.setPersonas(persona);

            return login;
        }
        
        if(tipo instanceof LibrosVO){
            Libros libro = new Libros();
            libro.setLibros_id(((LibrosVO) tipo).getLibros_id());            
            libro.setLibros_anio(((LibrosVO) tipo).getLibros_anio());
            libro.setLibros_codigo(((LibrosVO) tipo).getLibros_codigo());
            libro.setLibros_descripcion(((LibrosVO) tipo).getLibros_descripcion());
            libro.setLibros_disponible(((LibrosVO) tipo).getLibros_disponible());
            libro.setLibros_isbn(((LibrosVO) tipo).getLibros_isbn());
            libro.setLibros_titulo(((LibrosVO) tipo).getLibros_titulo());
            
            Tipos tipos = (Tipos) getTipo(((LibrosVO) tipo).getTiposVO());
            libro.setTiposVO(tipos);
            
            return libro;
            
        }
        
        if(tipo instanceof PrestamosVO){
            Prestamos prestamo = new Prestamos();
            Libros libros = (Libros) getTipo(((PrestamosVO) tipo).getLibros());
            prestamo.setLibros(libros);
            
            Personas persona = (Personas) getTipo(((PrestamosVO) tipo).getPersonas());
            prestamo.setPersonas(persona);
            
            prestamo.setPrestamos_fecha_desde( UtilesVarios.formatearStringToDate(((PrestamosVO) tipo).getPrestamos_fecha_desde(),UtilesVarios.FORMATO_DDMMYYYY));
            prestamo.setPrestamos_fecha_hasta( UtilesVarios.formatearStringToDate(((PrestamosVO) tipo).getPrestamos_fecha_hasta(),UtilesVarios.FORMATO_DDMMYYYY));
            
            prestamo.setPrestamos_fecha_desde_string( UtilesVarios.formatearDateToString(((PrestamosVO)tipo).getPrestamos_fecha_desde_Date(),UtilesVarios.FORMATO_yyyyMMdd));
            prestamo.setPrestamos_fecha_hasta_string( UtilesVarios.formatearDateToString(((PrestamosVO)tipo).getPrestamos_fecha_hasta_Date(),UtilesVarios.FORMATO_yyyyMMdd));
            
            
            return prestamo;
        }
        
        if(tipo instanceof LogsesionesVO){
            
            Logsesiones logsesiones = new Logsesiones();
            
            Personas persona = (Personas) getTipo(((LogsesionesVO) tipo).getPersona());
            
            logsesiones.setPersona(persona);
            
            logsesiones.setInicio(((LogsesionesVO) tipo).getInicio());
            logsesiones.setFin(((LogsesionesVO) tipo).getFin());
            logsesiones.setToken(((LogsesionesVO) tipo).getToken());
            
            return logsesiones;
        }
        
        
        
       return null;
    }

}
