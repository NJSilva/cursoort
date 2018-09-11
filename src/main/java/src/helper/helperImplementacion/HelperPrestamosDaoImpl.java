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
import src.framework.UtilesVarios;
import src.framework.valueobject.VOI;
import src.helper.helperInterfaces.HelperLibrosDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.helper.helperInterfaces.HelperPrestamosDaoI;
import src.vo.LibrosVO;
import src.vo.PersonasVO;
import src.vo.PrestamosVO;

public class HelperPrestamosDaoImpl extends HelperAbstractDao implements HelperPrestamosDaoI {

    private HelperLibrosDaoI helperLibros = new HelperLibrosDaoImpl();
    private HelperPersonasDaoI helperPersonas = new HelperPersonasDaoImpl();
    private final String consultaFindByCedula;

    public HelperPrestamosDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_PRESTAMOS_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_PRESTAMOS_Insert(?,?,?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_PRESTAMOS_Update(?,?,?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_PRESTAMOS_ObtenerPK()";
        consultaDelete = "CALL ESQUEMA.SP_PRESTAMOS_Delete()";
        consultaFindByCedula = "CALL ESQUEMA.SP_PRESTAMOS_OBTENER_POR_CEDULA(?)";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        PrestamosVO prestamos = new PrestamosVO();
        prestamos.setPrestamos_fecha_desde(rs.getDate("PRESTAMOS_FECHA_DESDE"));
        prestamos.setPrestamos_fecha_hasta(rs.getDate("PRESTAMOS_FECHA_HASTA"));
        LibrosVO libros = (LibrosVO) helperLibros.procesarResultSet(rs);
        prestamos.setLibros(libros);
        PersonasVO personas = (PersonasVO) helperPersonas.procesarResultSet(rs);
        prestamos.setPersonas(personas);
        return prestamos;
    }

    @Override
    public List<VOI> obtenerPorCedula(String cedula) throws SQLException {

        CallableStatement cs = null;
        ResultSet resultSet = null;
        Connection con = null;
        VOI entidad = null;
        List<VOI> listaPrestamos = new ArrayList<>();
        try {

            con = getConnection();
            cs = con.prepareCall(consultaFindByCedula);
            cs.setObject(1, cedula);
            resultSet = cs.executeQuery();

            while (resultSet.next()) {
                entidad = (procesarResultSet(resultSet));
                listaPrestamos.add(entidad);
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
                throw new SQLException(e1.getMessage());
            }

        }

        return listaPrestamos;

    }
}
