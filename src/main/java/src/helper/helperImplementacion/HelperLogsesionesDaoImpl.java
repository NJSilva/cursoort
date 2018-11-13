/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.ResultSet;
import java.sql.SQLException;
import src.framework.HelperAbstractDao;
import src.framework.valueobject.VOI;
import src.helper.helperInterfaces.HelperLogsesionesDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.vo.LogsesionesVO;
import src.vo.PersonasVO;

public class HelperLogsesionesDaoImpl extends HelperAbstractDao implements HelperLogsesionesDaoI {

    private HelperPersonasDaoI helperPersona = new HelperPersonasDaoImpl();

    public HelperLogsesionesDaoImpl() {
        super();
        
        consultaFindAll = "CALL ESQUEMA.SP_LOGSESIONES_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_LOGSESIONES_Insert(?,?,?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_LOGSESIONES_Update(?,?,?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_LOGSESIONES_ObtenerPK(?,?,?)";
        consultaDelete = "CALL ESQUEMA.SP_LOGSESIONES_Delete(?,?,?)";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        LogsesionesVO lsvo = new LogsesionesVO();
        
        PersonasVO persona = (PersonasVO) helperPersona.procesarResultSet(rs);
        
        lsvo.setPersona(persona);
        
        lsvo.setInicio(rs.getTimestamp("INGRESO"));
        lsvo.setFin(rs.getTimestamp("FIN"));
        lsvo.setToken("TOKEN");
        
        return lsvo;
    }
}
