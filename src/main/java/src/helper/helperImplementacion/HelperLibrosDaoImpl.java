/* Archivo generado automaticamente por GeneradorHelperInterfaces */
package src.helper.helperImplementacion;

import java.sql.ResultSet;
import java.sql.SQLException;
import src.framework.HelperAbstractDao;
import src.helper.helperInterfaces.HelperLibrosDaoI;
import src.helper.helperInterfaces.HelperTiposDaoI;
import src.framework.valueobject.VOI;
import src.vo.LibrosVO;
import src.vo.TiposVO;

public class HelperLibrosDaoImpl extends HelperAbstractDao implements HelperLibrosDaoI {

    private HelperTiposDaoI helperTipos = new HelperTiposDaoImpl();

    public HelperLibrosDaoImpl() {
        super();
        consultaFindAll = "CALL ESQUEMA.SP_LIBROS_Obtener()";
        consultaInsert = "CALL ESQUEMA.SP_LIBROS_Insert(?,?,?,?,?,?,?,?,?)";
        consultaUpdate = "CALL ESQUEMA.SP_LIBROS_Update(?,?,?,?,?,?,?,?,?,?)";
        consultaFindByPrimaryKey = "CALL ESQUEMA.SP_LIBROS_ObtenerPK(?)";
        consultaDelete = "CALL ESQUEMA.SP_LIBROS_Delete(?)";
    }

    public VOI procesarResultSet(ResultSet rs) throws SQLException {
        LibrosVO libros = new LibrosVO();
        libros.setLibros_codigo(rs.getString("LIBROS_CODIGO"));
        libros.setLibros_titulo(rs.getString("LIBROS_TITULO"));
        libros.setLibros_isbn(rs.getString("LIBROS_ISBN"));
        libros.setLibros_anio(rs.getInt("LIBROS_ANIO"));
        libros.setLibros_descripcion(rs.getString("LIBROS_DESCRIPCION"));
        libros.setLibros_disponible(rs.getInt("LIBROS_DISPONIBLE"));
        libros.setLibros_imagen(rs.getString("LIBROS_IMAGEN"));
        libros.setLibros_autor(rs.getString("LIBROS_AUTOR"));
        TiposVO tipos = (TiposVO) helperTipos.procesarResultSet(rs);
        libros.setTiposVO(tipos);
        return libros;
    }
}
