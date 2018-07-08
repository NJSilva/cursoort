/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework.validador;

import src.framework.validador.ValidacionException;
import src.framework.valueobject.EntidadesI;
import src.framework.valueobject.VOI;

// TODO: Auto-generated Javadoc
/**
 * The Class AbstractValidador.
 */
abstract public class AbstractValidador {
	
	/**
	 * Instantiates a new abstract validador.
	 */
	public AbstractValidador(){
		
	}
	
	/**
	 * Validar.
	 *
	 * @param entidad
	 *            the entidad
	 * @throws ValidacionException
	 *             the validacion exception
	 */
	public static void validar(VOI entidad) throws ValidacionException{
		
	}
	
	/**
	 * Validar.
	 *
	 * @param entidad1
	 *            the entidad1
	 * @param entidad2
	 *            the entidad2
	 * @throws ValidacionException
	 *             the validacion exception
	 */
	public static void validar(VOI entidad1 , VOI entidad2) throws ValidacionException{
	}

	
}
