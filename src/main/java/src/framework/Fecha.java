/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */

package framework;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.SimpleTimeZone;
import java.util.TimeZone;

import org.apache.log4j.Logger;


// TODO: Auto-generated Javadoc
/**
 * The Class Fecha.
 */
public class Fecha extends GregorianCalendar {

	/** The ids. */
	// get the supported ids for GMT-03:00
	private String[] ids = TimeZone.getAvailableIDs(-0 * 60 * 60 * 1000);
	
	/** The pdt. */
	private SimpleTimeZone pdt = new SimpleTimeZone(-0 * 60 * 60 * 1000, ids[0]);
	
	/** The dia. */
	private String dia;

	/** The mes. */
	private String mes;

	/** The anio. */
	private String anio;

	/** The fecha. */
	private String fecha;

	/** The logger. */
	private Logger logger = Logger.getLogger(Fecha.class);

	/**
	 * 
	 *  
	 */
	public Fecha() {
		super();
//		this.setTimeZone(pdt);
		this.setLenient(true);
	}

	/**
	 * Instantiates a new fecha.
	 *
	 * @param fechaString
	 *            the fecha string
	 */
	public Fecha(String fechaString) {
//		this.setTimeZone(pdt);
		this.setLenient(true);		
		this.setFechaAS(fechaString);
	}

	/**
	 * Sets the fecha as.
	 *
	 * @param cadenaFecha
	 *            the new fecha as
	 */
	public void setFechaAS(String cadenaFecha) {
		
		this.setTimeZone(pdt);
		this.setLenient(true);
		
		if (cadenaFecha.trim().length() == 8) {

			int Stringanio = Integer.parseInt(cadenaFecha.substring(0, 4));
			int Stringmes = Integer.parseInt(cadenaFecha.substring(4, 6));
			int Stringdia = Integer.parseInt(cadenaFecha.substring(6, 8));

			this.setFecha(Stringdia, Stringmes, Stringanio);
		} else if (cadenaFecha.trim().length() == 10) {

			int Stringanio = Integer.parseInt(cadenaFecha.substring(0, 2));
			int Stringmes = Integer.parseInt(cadenaFecha.substring(3, 5));
			int Stringdia = Integer.parseInt(cadenaFecha.substring(6, 8));

			this.setFecha(Stringdia, Stringmes, Stringanio);

		} else if (cadenaFecha.trim().length() == 12) {

			int Stringanio = Integer.parseInt(cadenaFecha.substring(0, 2));
			int Stringmes = Integer.parseInt(cadenaFecha.substring(2, 4));
			int Stringdia = Integer.parseInt(cadenaFecha.substring(4, 6));

			int StringHora = Integer.parseInt(cadenaFecha.substring(6, 8));
			int StringMinuto = Integer.parseInt(cadenaFecha.substring(8, 10));
			int StringSegundo = Integer.parseInt(cadenaFecha.substring(10, 12));

			
			this.setFecha(Stringdia, Stringmes, Stringanio,StringHora,StringMinuto , StringSegundo);

		} else if (cadenaFecha.trim().length() == 6) {

			int Stringanio = Integer.parseInt(cadenaFecha.substring(0, 2));
			int Stringmes = Integer.parseInt(cadenaFecha.substring(2, 4));
			int Stringdia = Integer.parseInt(cadenaFecha.substring(4, 6));

			this.setFecha(Stringdia, Stringmes, Stringanio);
		}

	}

	/**
	 * @param stringdia
	 * @param stringmes
	 * @param stringanio
	 * @param stringHora
	 * @param stringMinuto
	 * @param stringSegundo
	 */
	private void setFecha(int stringdia, int stringmes, int stringanio, int stringHora, int stringMinuto, int stringSegundo) {
		this.set(stringanio+2000, stringmes-1 , stringdia, stringHora , stringMinuto , stringSegundo);		
	}

	/**
	 * 
	 * @param fecha
	 * @throws Exception
	 */
	public Fecha(Date fecha) {
//		this.setTimeZone(pdt);
		this.setLenient(true);
		if (fecha != null) {
			this.setFecha(fecha.getDate(), fecha.getMonth() + 1, fecha.getYear() + 2000);
		}
	}

	/**
	 * 
	 * @param cadenaFecha
	 * @throws Exception
	 */
	public void setFecha(String cadenaFecha) {
		if (cadenaFecha.trim().length() == 8) {
			int Stringanio = Integer.parseInt(cadenaFecha.substring(0, 4));
			int Stringmes = Integer.parseInt(cadenaFecha.substring(4, 6));
			int Stringdia = Integer.parseInt(cadenaFecha.substring(6, 8));

			this.setFecha(Stringdia, Stringmes, Stringanio);
		} else if (cadenaFecha.trim().length() == 10) {

			int Stringanio = Integer.parseInt(cadenaFecha.substring(6, 10));
			int Stringmes = Integer.parseInt(cadenaFecha.substring(3, 5));
			int Stringdia = Integer.parseInt(cadenaFecha.substring(0, 2));

			this.setFecha(Stringdia, Stringmes, Stringanio);

		}

	}

	/**
	 * 
	 * @param dia
	 * @param mes
	 * @param anio
	 */
	public void setFecha(int dia, int mes, int anio) {
		this.set(anio+2000, mes - 1, dia);
	}

	/**
	 * Devuelve la fecha como string en formato dd-mm-yyyy
	 * 
	 * @return String
	 */
	public String getFechaDMY() {

		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yy");
		String fechaDMY = sdf.format(getFechaSQL());
		return fechaDMY;
	}
	
	/**
	 * Gets the fecha dmyhms.
	 *
	 * @return the fecha dmyhms
	 */
	public String getFechaDMYHMS() {

		//SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yy HH:MM:SS");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss");
		String fechaDMY = sdf.format(getFechaSQL());
		return fechaDMY;

	}
	

	/**
	 * 
	 * @return String en formato yyyy/MM/dd
	 */
	public String getFechaYMD() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		String fechaDMY = sdf.format(getFechaSQL());
		return fechaDMY;
	}

	/**
	 * Este metodo devuelve una fecha en formato sql.
	 * 
	 * @return java.sql.Date
	 */
	public java.sql.Date getFechaSQL() {
		return new java.sql.Date(getTimeInMillis());
	}

	/**
	 * 
	 * @return String
	 */
	public String getDia() {
		dia = String.valueOf(get(DATE));

		if (Integer.parseInt(dia) < 10) {
			dia = "0" + dia;
		}

		return dia;
	}

	/**
	 * 
	 * @return String
	 */
	public String getMes() {
		mes = String.valueOf(get(MONTH) + 1);

		if (Calendar.MONTH < 10) {
			mes = "0" + mes;
		}

		return mes;

	}

	/**
	 * 
	 * @return String
	 */
	public String getAnio() {
		anio = String.valueOf(get(YEAR));
		return anio;
	}
	
	/**
	 * Gets the date.
	 *
	 * @return the date
	 */
	public Date getDate(){
		Date date = new Date(getTimeInMillis());
		return date;
	}
	
	/**
	 * Convertir juliano.
	 *
	 * @param numero
	 *            the numero
	 * @return the string
	 */
	public static String convertirJuliano(int numero){
		Fecha temp = new Fecha();
		temp.set(Calendar.DAY_OF_YEAR , numero);
		return temp.getFechaDMY();
	}
	
	

}