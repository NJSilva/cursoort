/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.ResultSet;
import java.sql.SQLException;
import src.framework.HelperAbstractDao;
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

    public HelperPrestamosDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_PRESTAMOS_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_PRESTAMOS_Insert(?,?,?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_PRESTAMOS_Update(?,?,?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_PRESTAMOS_ObtenerPK()";
        consultaDelete = "CALL ESQUEMA.SP_PRESTAMOS_Delete()";
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
}
