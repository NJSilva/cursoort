/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework.valueobject;

// TODO: Auto-generated Javadoc
/**
 * The Class LogSession.
 */
public class LogSession {
	
	/** The sb. */
	private StringBuffer sb = new StringBuffer();
	
	/**
	 * Agregar texto.
	 *
	 * @param texto
	 *            the texto
	 */
	public void agregarTexto(String texto){
		sb.append(texto);
		sb.append("<br>");
	}
	
	/**
	 * Gets the texto.
	 *
	 * @return the texto
	 */
	public String getTexto(){
		return sb.toString();
	}
	

}
