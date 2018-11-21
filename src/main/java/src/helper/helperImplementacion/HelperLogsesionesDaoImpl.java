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
import src.framework.valueobject.VOI;
import src.helper.helperInterfaces.HelperLogsesionesDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.vo.LogsesionesVO;
import src.vo.PersonasVO;

public class HelperLogsesionesDaoImpl extends HelperAbstractDao implements HelperLogsesionesDaoI {

    private HelperPersonasDaoI helperPersona = new HelperPersonasDaoImpl();
    protected String consultaBuscarPorToken=null;

    public HelperLogsesionesDaoImpl() {
        super();
        
        consultaFindAll = "CALL ESQUEMA.SP_LOGSESIONES_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_LOGSESIONES_Insert(?,?,?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_LOGSESIONES_Update(?,?,?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_LOGSESIONES_ObtenerPK(?,?,?)";
        consultaDelete = "CALL ESQUEMA.SP_LOGSESIONES_Delete(?,?,?)";
        
        consultaBuscarPorToken="CALL ESQUEMA.SP_LOGSESIONES_OBTENER_POR_TOKEN(?)";
    }
    
    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        LogsesionesVO lsvo = new LogsesionesVO();
        
        PersonasVO persona = (PersonasVO) helperPersona.procesarResultSet(rs);
        
        lsvo.setPersona(persona);
        
        lsvo.setInicio(rs.getTimestamp("INGRESO"));
        lsvo.setFin(rs.getTimestamp("FIN"));
        lsvo.setToken(rs.getString("TOKEN"));
        
        return lsvo;
    }
    
 /**
     *
     * @param key
     * @return
     * @throws SQLException
     */
    public synchronized List<VOI> findByToken(Object key) throws SQLException {

        CallableStatement cs = null;
        ResultSet resultSet = null;
        Connection con = null;
        VOI entidad = null;
        List<VOI> lista = new ArrayList<VOI>();

        try {
            logger.debug(consultaBuscarPorToken);
            con = getConnection();
            cs = con.prepareCall(consultaBuscarPorToken);
            cs.setObject(1, key);

            resultSet = cs.executeQuery();

            while (resultSet.next()) {
                entidad = (procesarResultSet(resultSet));
                lista.add(entidad);
            }

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
                throw new SQLException(UtilConexion.printSQLException(e1).getMessage());
            }
        }

        return lista;
    }
    
    
    
    
}
