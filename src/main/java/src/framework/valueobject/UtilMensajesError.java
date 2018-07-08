/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework.valueobject;

import java.sql.SQLException;
import java.text.ParseException;

import src.framework.validador.ValidacionException;

// TODO: Auto-generated Javadoc
/**
 * The Class UtilMensajesError.
 */
public class UtilMensajesError {

	/**
	 * Manejar error.
	 *
	 * @param e
	 *            the e
	 * @return the string
	 */
	public static String manejarError(Exception e) {

		String mensajeError = null;

		if (e instanceof NumberFormatException) {
			mensajeError = "El numero ingresado no es valido.";
		} else if (e instanceof ParseException) {
			mensajeError = "La fecha no es valida.";
		} else if (e instanceof ValidacionException) {
			mensajeError = e.getMessage();
		} else if (e instanceof SQLException) {
			mensajeError = e.getMessage();
		} else if (e instanceof java.lang.IndexOutOfBoundsException) {
			mensajeError = "Falta seleccionar un parametro";
		} else {
			mensajeError = e.getMessage();
		}

		return mensajeError;

	}

}
