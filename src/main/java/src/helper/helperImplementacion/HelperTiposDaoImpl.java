/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.ResultSet;
import java.sql.SQLException;
import src.framework.HelperAbstractDao;
import src.framework.valueobject.VOI;
import src.helper.helperInterfaces.HelperTiposDaoI;
import src.vo.TiposVO;

public class HelperTiposDaoImpl extends HelperAbstractDao implements HelperTiposDaoI {

    public HelperTiposDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_TIPOS_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_TIPOS_Insert(?)";
        consultaUpdate = "CALL ESQUEMA.SP_TIPOS_Update(?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_TIPOS_ObtenerPK(?)";
        consultaDelete = "CALL ESQUEMA.SP_TIPOS_Delete(?)";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        TiposVO tipos = new TiposVO();
        tipos.setTipos_id(rs.getInt("TIPOS_ID"));
        tipos.setTipos_nombre(rs.getString("TIPOS_NOMBRE"));
        return tipos;
    }
}
