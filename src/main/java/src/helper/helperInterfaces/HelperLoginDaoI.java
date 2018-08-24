/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperInterfaces;

import java.sql.SQLException;
import src.framework.HelperDaoI;
import src.framework.valueobject.VOI;
import src.vo.LoginVO;

public interface HelperLoginDaoI extends HelperDaoI {

    public VOI autenticar(LoginVO key)throws SQLException ;
}
