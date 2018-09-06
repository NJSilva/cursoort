/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperInterfaces;

import java.sql.SQLException;
import java.util.List;
import src.framework.HelperDaoI;
import src.framework.valueobject.VOI;

public interface HelperPrestamosDaoI extends HelperDaoI {

    public List<VOI> obtenerPorCedula(String cedula) throws SQLException;
}
