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

import src.framework.valueobject.MensajesError;

// TODO: Auto-generated Javadoc
/**
 * The Class UtilConexion.
 */
public class UtilConexion {
	
	/**
	 * Prints the sql exception.
	 *
	 * @param ex
	 *            the ex
	 * @return the mensajes error
	 */
	public static MensajesError printSQLException(SQLException ex) {
		
		MensajesError me = new MensajesError();

		for (Throwable e : ex) {
			if (e instanceof SQLException) {
				String error = ((SQLException) e).getSQLState();
				
//				String mensaje = ((SQLException) e).getLocalizedMessage();

				if(error.compareToIgnoreCase("23505")==0){
					me.setMessage("El objeto esta duplicado");
				}
				
				if(error.compareToIgnoreCase("23001")==0 || error.compareToIgnoreCase("23504")==0){
					me.setMessage("El objeto es utilizado por otros");
				}

				if(error.compareToIgnoreCase("23513")==0){
					me.setMessage("Un valor ingresado no es correcto (IntegrityConstraintViolation)");
				}
				
			}
		}
		
		return me;
	}


}
