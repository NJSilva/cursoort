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
 * The Class MensajesError.
 */
public class MensajesError {

	/** The error grave. */
	public static int ERROR_GRAVE = 1;

	/** The error advertencia. */
	public static int ERROR_ADVERTENCIA = 2;

	public static int INFORMACION = 3;

	/** The severidad. */
	private int severidad = 0;

	/** The message. */
	private String message;
        
        private String succes;

	/**
	 * Gets the message.
	 *
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * Sets the message.
	 *
	 * @param message
	 *            the new message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * Gets the severidad.
	 *
	 * @return the severidad
	 */
	public int getSeveridad() {
		return severidad;
	}

	/**
	 * Sets the severidad.
	 *
	 * @param severidad
	 *            the new severidad
	 */
	public void setSeveridad(int severidad) {
		this.severidad = severidad;
	}

    /**
     * @return the succes
     */
    public String getSucces() {
        return succes;
    }

    /**
     * @param succes the succes to set
     */
    public void setSucces(String succes) {
        this.succes = succes;
    }

}
