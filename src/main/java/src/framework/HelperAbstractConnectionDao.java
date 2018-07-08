/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework;

import java.sql.Connection;
import java.sql.SQLException;

import src.conexion.ConexionSql;
import src.conexion.ConnectionException;

// TODO: Auto-generated Javadoc
/**
 * The Class HelperAbstractConnectionDao.
 */
public abstract class HelperAbstractConnectionDao {

	/**
	 * Instantiates a new helper abstract connection dao.
	 */
	public HelperAbstractConnectionDao() {
	}

	/**
	 * Gets the connection.
	 *
	 * @return the connection
	 * @throws ConnectionException
	 *             the connection exception
	 */
	protected static Connection getConnection() throws ConnectionException {
		return ConexionSql.getInstance().getConnection();
	}

	/**
	 * Release connection.
	 *
	 * @param con
	 *            the con
	 * @throws SQLException
	 *             the SQL exception
	 */
	protected static void releaseConnection(Connection con) throws SQLException {
		if (con != null) {
			ConexionSql.getInstance().desconectar();
		}
	}

}
