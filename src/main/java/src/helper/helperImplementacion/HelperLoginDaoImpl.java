/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import src.conexion.UtilConexion;
import src.framework.HelperAbstractDao;
import src.helper.helperInterfaces.HelperLoginDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.framework.valueobject.VOI;
import src.vo.LoginVO;
import src.vo.PersonasVO;
import src.vo.Sesion;

public class HelperLoginDaoImpl extends HelperAbstractDao implements HelperLoginDaoI {

    private HelperPersonasDaoI helperPersonas = new HelperPersonasDaoImpl();
    private String consultaAutenticar;

    public HelperLoginDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_LOGIN_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_LOGIN_Insert(?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_LOGIN_Update(?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_LOGIN_ObtenerPK(?)";
        consultaDelete = "CALL ESQUEMA.SP_LOGIN_Delete(?)";
        consultaAutenticar = "CALL ESQUEMA.SP_LOGIN_AUTENTICAR(?,?)";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        LoginVO login = new LoginVO();
        login.setLogin_clave(rs.getString("LOGIN_CLAVE"));
        PersonasVO personas = (PersonasVO) helperPersonas.procesarResultSet(rs);
        login.setPersonas(personas);
        return login;
    }

    public PersonasVO autenticar(LoginVO login) throws SQLException {

        VOI res = null;
        CallableStatement cs = null;
        ResultSet resultSet = null;
        Connection con = null;
        try {

            con = getConnection();
            cs = con.prepareCall(consultaAutenticar);
            cs.setObject(1, login.getPersonas().getPersonas_cedula());
            cs.setObject(2, login.getLogin_clave());
            resultSet = cs.executeQuery();

            res = helperPersonas.procesarResultSet(resultSet);

        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException(UtilConexion.printSQLException(e).getMessage());
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }

                if (cs != null) {
                    cs.close();
                }
            } catch (SQLException e1) {
                e1.printStackTrace();
                throw new SQLException(e1.getMessage());
            }

        }

        return (PersonasVO) res;

    }
}
