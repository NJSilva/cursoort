/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.ResultSet;
import java.sql.SQLException;
import src.framework.HelperAbstractDao;
import src.framework.valueobject.EntidadesI;
import src.helper.helperInterfaces.HelperLoginDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.entidades.Login;
import src.framework.valueobject.VOI;
import src.vo.LoginVO;
import src.vo.PersonasVO;

public class HelperLoginDaoImpl extends HelperAbstractDao implements HelperLoginDaoI {

    private HelperPersonasDaoI helperPersonas = new HelperPersonasDaoImpl();

    public HelperLoginDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_LOGIN_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_LOGIN_Insert(?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_LOGIN_Update(?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_LOGIN_ObtenerPK()";
        consultaDelete = "CALL ESQUEMA.SP_LOGIN_Delete()";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        LoginVO login = new LoginVO();
        login.setLogin_clave(rs.getString("LOGIN_CLAVE"));
        PersonasVO personas = (PersonasVO) helperPersonas.procesarResultSet(rs);
        login.setPersonas(personas);
        return login;
    }
}
