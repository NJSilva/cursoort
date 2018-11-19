/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperInterfaces;

import java.sql.SQLException;
import java.util.List;
import src.framework.HelperDaoI;
import src.framework.valueobject.VOI;

public interface HelperLogsesionesDaoI extends HelperDaoI {
    
    public List<VOI> findByToken(Object key) throws SQLException;
    
}
