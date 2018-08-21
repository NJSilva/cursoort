/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ResourceBundle;

// TODO: Auto-generated Javadoc
/**
 * @author Nicolas Silva
 * @version 1.0
 */
public class ConexionSql {

	/** The conexion sql. */
	private static ConexionSql conexionSQL = null;

	/** The conexion connection. */
	// Variables para la conexion
	private Connection conexionConnection;

	/** The user. */
	private String user = "rpons";

	/** The pass. */
	private String pass = "f2a3Pc!h2";

	/**
	 * Nombre del schema o base de datos a utilizar
	 */
	private String ddbb = "CURSOORT";

	/** The for name. */
	private String FOR_NAME = "com.ibm.db2.jcc.DB2Driver";

	/** The driver manager. */
	private String DRIVER_MANAGER = "jdbc:db2://localhost:50000/";

	/** The rb. */
	private ResourceBundle rb = null;

	/**
	 * Instantiates a new conexion sql.
	 */
	private ConexionSql() {
	}

	/**
	 * Gets the single instance of ConexionSql.
	 *
	 * @return single instance of ConexionSql
	 */
	public synchronized static ConexionSql getInstance() {
		if (conexionSQL == null) {
			conexionSQL = new ConexionSql();
		}
		return conexionSQL;
	}

	/**
	 * Gets the connection.
	 *
	 * @return the connection
	 * @throws ConnectionException
	 *             the connection exception
	 */
	public Connection getConnection() throws ConnectionException {
		boolean mensaje = false;
		try {

                    if (conexionConnection == null) {
				System.out.println("Creando conexion a la base de datos");
				System.out.println(FOR_NAME);
				System.out.println(DRIVER_MANAGER + ddbb);
				Class.forName(FOR_NAME).newInstance();
				conexionConnection = DriverManager.getConnection(DRIVER_MANAGER + ddbb, user, pass);
				conexionConnection.setAutoCommit(false);
				PreparedStatement ps = conexionConnection.prepareStatement("Set path = 'WEBSOLTRA' , 'GRILLAS'");
				ps.execute();
			}
			// else
			// {
			// System.out.println("Conexion dada de la instancia.");
			// }
		} catch (SQLException e) {
			mensaje = true;
			e.printStackTrace();
			throw new ConnectionException(e);
		} catch (InstantiationException e) {
			mensaje = true;
			e.printStackTrace();
			throw new ConnectionException(e);
		} catch (IllegalAccessException e) {
			mensaje = true;
			e.printStackTrace();
			throw new ConnectionException(e);
		} catch (ClassNotFoundException e) {
			mensaje = true;
			e.printStackTrace();
			throw new ConnectionException(e);
		} finally {
			if (mensaje) {
				System.out.println("Error al obtener la conexion");
				System.out.println("*** Sistema abortado ***");
				System.out.println("Se perdio la conexion con el servidor ");
				System.out.println("o no se pudo obtener la conexion con el servidor");
			}
		}

		return conexionConnection;

	}

	/**
	 * Desconectar.
	 *
	 * @throws ConnectionException
	 *             the connection exception
	 */
	public void desconectar() throws ConnectionException {
		try {
			if (conexionConnection != null) {
				conexionSQL = null;
				conexionConnection.rollback();
				conexionConnection.close();
				conexionConnection = null;
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new ConnectionException(e);
		}
	}

	/**
	 * Commit.
	 *
	 * @throws ConnectionException
	 *             the connection exception
	 */
	public void commit() throws ConnectionException {
		try {
			conexionConnection.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new ConnectionException(e);
		}
	}

	/**
	 * Sets the user.
	 *
	 * @param uname
	 *            the new user
	 */
	public void setUser(String uname) {
		this.user = uname;
	}

	/**
	 * Sets the password.
	 *
	 * @param pwd
	 *            the new password
	 */
	public void setPassword(String pwd) {
		this.pass = pwd;
	}

	/**
	 * Sets the nombre del schema o base de datos a utilizar.
	 *
	 * @param database
	 *            the new nombre del schema o base de datos a utilizar
	 */
	public void setDdbb(String database) {
		this.ddbb = database;
	}

	/**
	 * @return Devuelve user.
	 */
	public String getUser() {
		return user;
	}

	/**
	 * The main method.
	 *
	 * @param args
	 *            the arguments
	 */
	public static void main(String args[]) {
		ConexionSql con = ConexionSql.getInstance();
		con.setUser("");
		con.setPassword("");
		con.setDdbb("");
		try {
			con.getConnection();
		} catch (ConnectionException e) {
			e.printStackTrace();
		}
	}
}
