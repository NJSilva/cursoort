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

    public static String FORMATO_yyyyMMdd = "yyyy-MM-dd";

    public static String FORMATO_DDMMYYYY = "dd/MM/yyyy";

    public static String FORMATO_TIMESTAMP = "yyyy-MM-dd HH:mm:ss.SSSSSS";

    public static String FORMATO_TIMESTAMPARCHIVO = "yyyyMMddHHmmss";

    /**
     *
     * @param _fecha
     * @param formato
     * @return
     */
    public static Date formatearStringToDate(String _fecha, String formato) {
        SimpleDateFormat formatoDeFecha = new SimpleDateFormat(formato);
        Date retorno = null;
        if (null != _fecha) {
            try {
                retorno = formatoDeFecha.parse(_fecha);
            } catch (ParseException e) {
                // se retorna nulo si el formato no es valido.
            }
        }
        return retorno;
    }

    /**
     * Formatear time stamp.
     *
     * @param _fecha the _fecha
     * @return the date
     */
    public static String formatearTimeStampToString(String _fecha, String formato) {
        SimpleDateFormat formatoDeFecha = new SimpleDateFormat(formato);
        String retorno = null;

        Date fecha1 = formatearStringToDate(_fecha, formato);
        retorno = formatoDeFecha.format(fecha1);

        return retorno;
    }

    /**
     * Formatear time stamp.
     *
     * @param tiempo the tiempo
     * @return the string
     */
    public static String formatearTimeStampToString(Timestamp tiempo, String formato) {
        SimpleDateFormat format = new SimpleDateFormat(formato);
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

        SimpleDateFormat format = new SimpleDateFormat(FORMATO_TIMESTAMPARCHIVO);
        String retorno = null;

        retorno = format.format(currentTimestamp);

        return retorno;
    }

    /**
     * Formateo fecha.
     *
     * @param fecha the fecha
     * @return the string
     */
    public static String formatearDateToString(Date fecha, String formato) {
        SimpleDateFormat formatoFecha = new SimpleDateFormat(formato);
        if (null != fecha) {
            return formatoFecha.format(fecha);
        } else {
            return null;
        }
    }

//	public static Date formatearFechaVO(String _fecha) {
//		SimpleDateFormat formatoDeFecha = new SimpleDateFormat(FORMATO_DDMMYYYY);
//		Date retorno = null;
//
//                if(null != _fecha){
//                    try {
//                            retorno = formatoDeFecha.parse(_fecha);
//                    } catch (ParseException e) {
//                            // se retorna nulo si el formato no es valido.
//                    }
//                }
//		return retorno;
//	}        
}
