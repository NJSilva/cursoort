/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework.valueobject;

import java.io.Serializable;

// TODO: Auto-generated Javadoc
/**
 * The Interface EntidadesI.
 */
public interface EntidadesI extends VOI, Serializable {

    /**
     * Generar campos.
     *
     * @return the object[]
     */
    public Object[] generarCampos();

    /**
     * Generar campos.
     *
     * @return the object[]
     */
    public Object[] generarCamposPK();

    /**
     * Generar pk.
     *
     * @return the object[]
     */
    public Object[] generarPK();

}
