/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework; 

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import src.framework.valueobject.VOI;

// TODO: Auto-generated Javadoc
/**
 * @author nsilva
 * 
 *         TODO Para cambiar la plantilla de este comentario generado, vaya a
 *         Ventana - Preferencias - Java - Estilo de c�digo - Plantillas de
 *         c�digo
 */
public interface HelperDaoI {

	/**
	 * Find all.
	 *
	 * @return the list
	 * @throws SQLException
	 *             the SQL exception
	 */
	public List<VOI> findAll() throws SQLException;

	/**
	 * Find by primary key.
	 *
	 * @param key
	 *            the key
	 * @return the list
	 * @throws SQLException
	 *             the SQL exception
	 */
	public List<VOI> findByPrimaryKey(Object key) throws SQLException;

	/**
	 * Update.
	 *
	 * @param actual
	 *            the actual
	 * @return the string
	 * @throws SQLException
	 *             the SQL exception
	 */
	public String update(VOI actual) throws SQLException;

	/**
	 * Insert.
	 *
	 * @param objeto
	 *            the objeto
	 * @return the string
	 * @throws SQLException
	 *             the SQL exception
	 */
	public String insert(VOI objeto) throws SQLException;

	/**
	 * Delete.
	 *
	 * @param objeto
	 *            the objeto
	 * @return the string
	 * @throws SQLException
	 *             the SQL exception
	 */
	public String delete(VOI objeto) throws SQLException;

	/**
	 * Procesar result set.
	 *
	 * @param rs
	 *            the rs
	 * @return the entidades i
	 * @throws SQLException
	 *             the SQL exception
	 */
	public VOI procesarResultSet(ResultSet rs) throws SQLException;

	public int obtenerCantidadRegistros() throws SQLException;

}