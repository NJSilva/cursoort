/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;

import src.conexion.UtilConexion;
import src.entidades.FactoryEntidadesI;
import src.framework.valueobject.EntidadesI;
import src.framework.valueobject.VOI;

// TODO: Auto-generated Javadoc
/**
 * The Class HelperAbstractDao.
 */
public abstract class HelperAbstractDao extends HelperAbstractConnectionDao {

    /**
     * The logger.
     */
    protected static Logger logger = Logger.getLogger(HelperAbstractDao.class);

    /**
     * The consulta find all.
     */
    protected String consultaFindAll = null;

    /**
     * The consulta find by primary key.
     */
    protected String consultaFindByPrimaryKey = null;

    /**
     * The consulta insert.
     */
    protected String consultaInsert = null;

    /**
     * The consulta delete.
     */
    protected String consultaDelete = null;

    /**
     * The consulta update.
     */
    protected String consultaUpdate = null;

    /**
     * The consulta cantidad.
     */
    protected String consultaCantidad = null;

    protected FactoryEntidadesI factoryEntidadesI = new FactoryEntidadesI();

    /**
     * Instantiates a new helper abstract dao.
     */
    protected HelperAbstractDao() {

    }

    /**
     * Gets the timestamp.
     *
     * @return the timestamp
     */
    protected Timestamp getTimestamp() {

        Calendar calendar = Calendar.getInstance();
        Date now = calendar.getTime();

        Timestamp currentTimestamp = new java.sql.Timestamp(now.getTime());

        return currentTimestamp;
    }

    /**
     *
     * @param rs
     * @return
     * @throws SQLException
     */
    protected abstract VOI procesarResultSet(ResultSet rs) throws SQLException;

    /**
     *
     * @return @throws SQLException
     */
    public synchronized List<VOI> findAll() throws SQLException {

        List<VOI> lista = null;
        CallableStatement cs = null;
        ResultSet resultSet = null;
        Connection con = null;
        try {

            con = getConnection();
            cs = con.prepareCall(consultaFindAll);
            resultSet = cs.executeQuery();
            lista = new ArrayList<VOI>();

            while (resultSet.next()) {
                VOI objeto = procesarResultSet(resultSet);
                lista.add(objeto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException(UtilConexion.printSQLException(e).getMessage());
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }

                if (cs != null) {
                    cs.close();
                }
            } catch (SQLException e1) {
                e1.printStackTrace();
                throw new SQLException(e1.getMessage());
            }

        }

        if (lista != null && lista.size() == 0) {
            throw new SQLException("No hay datos");
        }

        return lista;
    }

    /**
     *
     * @param key
     * @return
     * @throws SQLException
     */
    public synchronized List<VOI> findByPrimaryKey(Object key) throws SQLException {

        CallableStatement cs = null;
        ResultSet resultSet = null;
        Connection con = null;
        VOI entidad = null;
        List<VOI> lista = new ArrayList<VOI>();

        try {
            logger.debug(consultaFindByPrimaryKey);
            con = getConnection();
            cs = con.prepareCall(consultaFindByPrimaryKey);
            cs.setObject(1, key);

            resultSet = cs.executeQuery();

            while (resultSet.next()) {
                entidad = (procesarResultSet(resultSet));
                lista.add(entidad);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException(UtilConexion.printSQLException(e).getMessage());
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }

                if (cs != null) {
                    cs.close();
                }
            } catch (SQLException e1) {
                e1.printStackTrace();
                throw new SQLException(UtilConexion.printSQLException(e1).getMessage());
            }
        }

        return lista;
    }

    /**
     *
     * @param objeto
     * @return
     * @throws SQLException
     */
    public synchronized String insert(VOI objeto) throws SQLException {

        int insertado = 0;
        Connection con = null;
        CallableStatement cs = null;
        try {

            EntidadesI entidadI = factoryEntidadesI.getTipo(objeto);
            Object[] campos = entidadI.generarCampos();
            logger.debug(campos);
            con = getConnection();

            for (int i = 0; i < campos.length; i++) {
                logger.info(campos[i]);
            }

            logger.info(consultaInsert);
            cs = con.prepareCall(consultaInsert);

            for (int i = 0; i < campos.length; i++) {
                if (null == campos[i]) {
                    cs.setNull(i+1 , Types.NULL);
                } else {
                    cs.setObject(i + 1, campos[i]);
                }

            }

            insertado = cs.executeUpdate();

            con.commit();

        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException(UtilConexion.printSQLException(e).getMessage());
        } finally {
            try {
                if (cs != null) {
                    cs.close();
                }
            } catch (SQLException e1) {
                throw new SQLException(UtilConexion.printSQLException(e1).getMessage());
            }
        }

        if (insertado == 0) {
            throw new SQLException("No se inserto");
        }

        return String.valueOf(insertado);
    }

    /**
     * Update.
     *
     * @param objeto the objeto
     * @return the string
     * @throws SQLException the SQL exception
     */
    public synchronized String update(VOI objeto) throws SQLException {

        Timestamp inicio = getTimestamp();

        int insertado = 0;
        Connection con = null;
        CallableStatement cs = null;
        try {
            EntidadesI entidadI = factoryEntidadesI.getTipo(objeto);
            Object[] campos = entidadI.generarCamposPK();
            con = getConnection();
            cs = con.prepareCall(consultaUpdate);
            
            for (int i = 0; i < campos.length; i++) {
                if (campos[i] != null) {
                    cs.setObject(i + 1, campos[i]);
                } else {
                    cs.setNull(i + 1, Types.NULL);
                }
            }

            insertado = cs.executeUpdate();

            con.commit();

        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException(UtilConexion.printSQLException(e).getMessage());
        } finally {
            try {
                if (cs != null) {
                    cs.close();
                }
            } catch (SQLException e1) {
                throw new SQLException(UtilConexion.printSQLException(e1).getMessage());
            }
        }

        if (insertado == 0) {
            throw new SQLException("No se actualizo");
        }

        return String.valueOf(insertado);

    }

    /**
     * Delete.
     *
     * @param objeto the objeto
     * @return the string
     * @throws SQLException the SQL exception
     */
    public synchronized String delete(VOI objeto) throws SQLException {

        int eliminado = 0;
        Connection con = null;
        CallableStatement cs = null;

        try {
            EntidadesI entidadI = factoryEntidadesI.getTipo(objeto);
            Object[] campos = entidadI.generarPK();
            logger.debug(campos);

            for (int i = 0; i < campos.length; i++) {
                logger.info(campos[i]);
            }

            con = getConnection();
            cs = con.prepareCall(consultaDelete);
            logger.debug(consultaDelete);

            for (int i = 0; i < campos.length; i++) {
                cs.setObject(i + 1, campos[i]);
            }

            eliminado = cs.executeUpdate();

            con.commit();

        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException(UtilConexion.printSQLException(e).getMessage());
        } finally {
            if (cs != null) {
                cs.close();
            }
        }

        if (eliminado == 0) {
            throw new SQLException("No se elimino");
        }

        return String.valueOf(eliminado);
    }

    /**
     * Obtener cantidad registros.
     *
     * @return the int
     * @throws SQLException
     */
    /*
	 * (non-Javadoc)
	 * 
	 * @see framework.HelperDaoI#obtenerCantidadRegistros()
     */
    public int obtenerCantidadRegistros() throws SQLException {

        Timestamp inicio = getTimestamp();

        int cantidad = 0;
        Connection con = null;
        CallableStatement cs = null;

        try {
            con = getConnection();
            logger.info(consultaCantidad);
            cs = con.prepareCall(consultaCantidad);
            cs.registerOutParameter(1, Types.INTEGER);

            cs.execute();

            // Ver si retorno clave
            cantidad = cs.getInt(1);

        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException(UtilConexion.printSQLException(e).getMessage());
        } finally {
            try {
                if (cs != null) {
                    cs.close();
                }
            } catch (SQLException e1) {
                throw new SQLException(UtilConexion.printSQLException(e1).getMessage());
            }
        }

        return cantidad;
    }

}
