/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.ResultSet;
import java.sql.SQLException;
import src.framework.HelperAbstractDao;
import src.framework.valueobject.VOI;
import src.helper.helperInterfaces.HelperLibrosDaoI;
import src.helper.helperInterfaces.HelperPersonasDaoI;
import src.helper.helperInterfaces.HelperReservasDaoI;
import src.entidades.Libros;
import src.vo.PersonasVO;
import src.vo.ReservasVO;

public class HelperReservasDaoImpl extends HelperAbstractDao implements HelperReservasDaoI {

    private HelperPersonasDaoI helperPersonas = new HelperPersonasDaoImpl();
    private HelperLibrosDaoI helperLibros = new HelperLibrosDaoImpl();

    public HelperReservasDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_RESERVAS_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_RESERVAS_Insert(?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_RESERVAS_Update(?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_RESERVAS_ObtenerPK()";
        consultaDelete = "CALL ESQUEMA.SP_RESERVAS_Delete()";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        ReservasVO reservas = new ReservasVO();
        PersonasVO personas = (PersonasVO) helperPersonas.procesarResultSet(rs);
        reservas.setPersonas(personas);
        Libros libros = (Libros) helperLibros.procesarResultSet(rs);
        reservas.setLibros(libros);
        return reservas;
    }
}
