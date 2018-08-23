/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.ResultSet;
import java.sql.SQLException;
import src.framework.HelperAbstractDao;
import src.framework.valueobject.VOI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.vo.PersonasVO;

public class HelperPersonasDaoImpl extends HelperAbstractDao implements HelperPersonasDaoI {

    public HelperPersonasDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_PERSONAS_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_PERSONAS_Insert(?,?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_PERSONAS_Update(?,?,?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_PERSONAS_ObtenerPK(?)";
        consultaDelete = "CALL ESQUEMA.SP_PERSONAS_Delete(?)";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        PersonasVO personas = new PersonasVO();
        personas.setPersonas_id(rs.getInt("PERSONAS_ID"));
        personas.setPersonas_cedula(rs.getString("PERSONAS_CEDULA"));
        personas.setPersonas_mail(rs.getString("PERSONAS_MAIL"));
        personas.setPersonas_nombre(rs.getString("PERSONAS_NOMBRE"));
        return personas;
    }
}