/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva 
 * 
 * @version 20160101/A
 */
package src.framework;

import src.framework.valueobject.EntidadesI;

// TODO: Auto-generated Javadoc
/**
 * @author nsilva
 * 
 *         TODO Para cambiar la plantilla de este comentario generado, vaya a
 *         Ventana - Preferencias - Java - Estilo de c�digo - Plantillas de
 *         c�digo
 */
public abstract class User implements EntidadesI {

	/** The nombre. */
	private String nombre;

	/** The clave. */
	private String clave;

	/**
	 * Instantiates a new user.
	 */
	public User() {
	}

	/**
	 * Gets the nombre.
	 *
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Sets the nombre.
	 *
	 * @param nombre
	 *            the new nombre
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Gets the clave.
	 *
	 * @return the clave
	 */
	public String getClave() {
		return clave;
	}

	/**
	 * Sets the clave.
	 *
	 * @param clave
	 *            the new clave
	 */
	public void setClave(String clave) {
		this.clave = clave;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.valueobject.EntidadesI#generarCampos()
	 */
	@Override
	public Object[] generarCampos() {
		Object[] datos = { getNombre(), getClave() };

		return datos;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see framework.valueobject.EntidadesI#generarPK()
	 */
	@Override
	public Object[] generarPK() {
		Object[] datos = { getNombre() };

		return datos;
	}

}
