/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.conexion;

import java.sql.SQLException;

// TODO: Auto-generated Javadoc
/**
 * The Class ConnectionException.
 */
public class ConnectionException extends SQLException {

	/**
	 * Instantiates a new connection exception.
	 *
	 * @param e
	 *            the e
	 */
	public ConnectionException(Exception e){
		super(e);
	}
	
}
