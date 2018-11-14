/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src.test;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import src.entidades.Logsesiones;
import src.facade.FacadeCliente;
import src.framework.valueobject.VOI;
import src.vo.LibrosVO;
import src.vo.LogsesionesVO;
import src.vo.PersonasVO;
import src.vo.TiposVO;

/**
 * @author Nico
 */
public class TestFacadeClienteLogsesionesVO {

    public static void main(String args[]) {

            
            FacadeCliente fc = new FacadeCliente();
            
            try {
                List<VOI> ls = fc.obtener(FacadeCliente.LOGSESIONES);
                
                for (Iterator<VOI> iterator = ls.iterator(); iterator.hasNext();) {
                    LogsesionesVO next = (LogsesionesVO) iterator.next();
                    System.out.println(next.getPersona().getPersonas_nombre());
                }
            } catch (SQLException ex) {
                Logger.getLogger(TestFacadeClienteLibrosVO.class.getName()).log(Level.SEVERE, null, ex);
            }

        // Inserto un nuevo registro
            
        try {
            PersonasVO persona = (PersonasVO) fc.buscar("2" , FacadeCliente.PERSONAS).get(0);
            
            LogsesionesVO lsvo = new LogsesionesVO();
            lsvo.setPersona(persona);
            lsvo.setToken("untokenRomina");
            
            Timestamp ts = new Timestamp(new Date().getTime());
            lsvo.setInicio(ts);
            
            fc.grabar(lsvo, FacadeCliente.LOGSESIONES);
            
            
        } catch (SQLException ex) {
            ex.printStackTrace();
            Logger.getLogger(TestFacadeClienteLogsesionesVO.class.getName()).log(Level.SEVERE, null, ex);
        }
        

    }
}
