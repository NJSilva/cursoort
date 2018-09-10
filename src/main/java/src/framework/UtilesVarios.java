/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

// TODO: Auto-generated Javadoc
/**
 * The Class UtilesVarios.
 */
public class UtilesVarios {

	/**
	 * Formatear fecha.
	 *
	 * @param _fecha
	 *            the _fecha
	 * @return the date
	 */
	public static Date formatearFecha(String _fecha) {
		SimpleDateFormat formatoDeFecha = new SimpleDateFormat("yyyy-MM-dd");
		Date retorno = null;

		try {
			retorno = formatoDeFecha.parse(_fecha);
		} catch (ParseException e) {
			// se retorna nulo si el formato no es valido.
		}

		return retorno;
	}

	/**
	 * Formatear time stamp.
	 *
	 * @param _fecha
	 *            the _fecha
	 * @return the date
	 */
	public static String formatearTimeStamp(String _fecha) {
		SimpleDateFormat formatoDeFecha = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
		String retorno = null;

		Date fecha1 = formatearFecha(_fecha);
		retorno = formatoDeFecha.format(fecha1);

		return retorno;
	}

	/**
	 * Formatear time stamp.
	 *
	 * @param tiempo
	 *            the tiempo
	 * @return the string
	 */
	public static String formatearTimeStamp(Timestamp tiempo) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
		String retorno = null;
		retorno = format.format(tiempo);
		return retorno;
	}

	/**
	 * Formatear time stamp archivo.
	 *
	 * @return the string
	 */
	public static String formatearTimeStampArchivo() {

		Calendar calendar = Calendar.getInstance();
		Date now = calendar.getTime();

		Timestamp currentTimestamp = new java.sql.Timestamp(now.getTime());

		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		String retorno = null;

		retorno = format.format(currentTimestamp);

		return retorno;
	}

	/**
	 * Formateo fecha.
	 *
	 * @param fecha
	 *            the fecha
	 * @return the string
	 */
	public static String formateoFecha(Date fecha) {
		SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
		if (null != fecha) {
			return formato.format(fecha);
		} else {
			return "";
		}
	}

}
