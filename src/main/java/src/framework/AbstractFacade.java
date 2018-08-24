/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import src.conexion.ConexionSql;
import src.conexion.ConnectionException;
import src.framework.valueobject.VOI;
import src.vo.LoginVO;

// TODO: Auto-generated Javadoc
/**
 * The Class AbstractFacade.
 */
public abstract class AbstractFacade implements AbstractFacadeI {

	/** The logger. */
	protected static Logger logger = Logger.getLogger(AbstractFacade.class);

	/** The mapa. */
	// Mapa de objetos
	protected Map<String, HelperDaoI> mapa = new HashMap<String, HelperDaoI>();

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.AbstractFacadeI#desconectar()
	 */
	@Override
	public void desconectar() throws ConnectionException {
		ConexionSql.getInstance().desconectar();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.AbstractFacadeI#probarConexion(java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public boolean probarConexion(String uname, String pwd, String database) throws ConnectionException {
		logger.debug("Probando conexion");

		// Trato de establecer la conexion
		ConexionSql.getInstance().setUser(uname);
		ConexionSql.getInstance().setPassword(pwd);
		ConexionSql.getInstance().setDdbb(database);

		return (ConexionSql.getInstance().getConnection() != null);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.AbstractFacadeI#obtener(java.lang.String)
	 */
	@Override
	public List<VOI> obtener(String nombreClase) throws SQLException {
		logger.debug("Obtener " + nombreClase);
		List<VOI> lista = null;
		HelperDaoI helper = mapa.get(nombreClase);
		lista = helper.findAll();

		return lista;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.AbstractFacadeI#grabar(framework.valueobject.VOI,
	 * java.lang.String)
	 */
	@Override
	public String grabar(VOI objetoVO, String nombreClase) throws SQLException {
		logger.debug("Grabar " + nombreClase);
		String retorno = null;
		HelperDaoI helper = mapa.get(nombreClase);
		retorno = helper.insert(objetoVO);

		return retorno;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.AbstractFacadeI#eliminar(framework.valueobject.VOI,
	 * java.lang.String)
	 */
	@Override
	public String eliminar(VOI objetoVO, String nombreClase) throws SQLException {
		logger.debug("Eliminar " + nombreClase);
		HelperDaoI helper = mapa.get(nombreClase);
		return helper.delete(objetoVO);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * framework.AbstractFacadeI#actualizar(framework.valueobject.VOI,
	 * java.lang.String)
	 */
	@Override
	public String actualizar(VOI objetoVO, String nombreClase) throws SQLException {
		logger.debug("Actualizar " + nombreClase);
		HelperDaoI helper = mapa.get(nombreClase);
		return helper.update(objetoVO);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.AbstractFacadeI#buscar(java.lang.String, java.lang.String)
	 */
	@Override
	public List<VOI> buscar(String buscarCadena, String nombreFrame) throws SQLException {
		logger.debug("Buscar " + nombreFrame);
		List<VOI> lista = null;
		HelperDaoI helper = mapa.get(nombreFrame);
		lista = helper.findByPrimaryKey(buscarCadena);

		return lista;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.AbstractFacadeI#obtenerCantidadRegistros(java.lang.String)
	 */
	@Override
	public int obtenerCantidadRegistros(String nombreFrame) throws SQLException {
		logger.debug("Buscar " + nombreFrame);
		int cantidad = 0;
		HelperDaoI helper = mapa.get(nombreFrame);
		cantidad = helper.obtenerCantidadRegistros();

		return cantidad;

	}

}
