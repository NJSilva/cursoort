/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework;

import java.sql.SQLException;
import java.util.List;

import src.conexion.ConnectionException;
import src.framework.valueobject.VOI;

// TODO: Auto-generated Javadoc
/**
 * TODO Falta escribir definicion de la clase
 *
 * @author Nicolas Silva
 *
 * @version: 20160101/A
 *
 */
public interface AbstractFacadeI {

	/**
	 * Desconectar.
	 *
	 * @throws ConnectionException
	 *             the connection exception
	 */
	public void desconectar() throws ConnectionException;

	/**
	 * Probar conexion.
	 *
	 * @param uname
	 *            the uname
	 * @param pwd
	 *            the pwd
	 * @param database
	 *            the database
	 * @return the user
	 * @throws ConnectionException
	 *             the connection exception
	 */
	public boolean probarConexion(String uname, String pwd, String database) throws ConnectionException;

	/**
	 * Obtener.
	 *
	 * @param nombreClase
	 *            the nombre clase
	 * @return the list
	 * @throws SQLException
	 *             the SQL exception
	 */
	public List<VOI> obtener(String nombreClase) throws SQLException;

	/**
	 * Grabar.
	 *
	 * @param objetoVO
	 *            the objeto vo
	 * @param nombreClase
	 *            the nombre clase
	 * @return the string
	 * @throws SQLException
	 *             the SQL exception
	 */
	public String grabar(VOI objetoVO, String nombreClase) throws SQLException;

	/**
	 * Eliminar.
	 *
	 * @param objetoVO
	 *            the objeto vo
	 * @param nombreClase
	 *            the nombre clase
	 * @return the string
	 * @throws SQLException
	 *             the SQL exception
	 */
	public String eliminar(VOI objetoVO, String nombreClase) throws SQLException;

	/**
	 * Actualizar.
	 *
	 * @param objetoVO
	 *            the objeto vo
	 * @param nombreClase
	 *            the nombre clase
	 * @return the string
	 * @throws SQLException
	 *             the SQL exception
	 */
	public String actualizar(VOI objetoVO, String nombreClase) throws SQLException;

	/**
	 * Buscar.
	 *
	 * @param buscarCadena
	 *            the buscar cadena
	 * @param nombreFrame
	 *            the nombre frame
	 * @return the list
	 * @throws SQLException
	 *             the SQL exception
	 */
	public List<VOI> buscar(String buscarCadena, String nombreFrame) throws SQLException;

	/**
	 * Obtener cantidad registros.
	 *
	 * @param nombreFrame
	 *            the nombre frame
	 * @return the int
	 * @throws SQLException
	 *             the SQL exception
	 */
	public int obtenerCantidadRegistros(String nombreFrame) throws SQLException;

}