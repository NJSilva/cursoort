/*
 * Proyecto WebSolTra
 * Solicitudes de trabajo web
 *
 * @autor Nicolas Silva
 * 
 * @version 20160101/A
 */
package src.framework;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import src.framework.valueobject.MensajesError;

// TODO: Auto-generated Javadoc
/**
 * The Class ServletGenerico.
 */
public abstract class ServletGenerico extends HttpServlet {

	/** The session. */
	protected HttpSession session = null;

	/** The lista errores. */
	protected List<MensajesError> listaErrores;

	/**
	 * Instantiates a new servlet generico.
	 */
	public ServletGenerico() {
		super();
	}

	/**
	 * 
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/*********************************************************************/
		// Validacion de session de usuarios
		session = request.getSession();
		boolean haySesion = validarSesion(session);
		if (!haySesion) {
			System.out.println("Login por expiracion");
			String loginURL = request.getContextPath();
			response.sendRedirect(loginURL);
		} else {
			listaErrores = new ArrayList<MensajesError>();
			response.setContentType("text/html; charset=utf-8");
		}

	}

	/**
	 * 
	 * @param session
	 */
	protected boolean validarSesion(HttpSession session) {
		User usuario = (User) session.getAttribute("USUARIO");
		return (null != usuario);
	}

	/**
	 * 
	 * @return
	 */
	protected User getUsuario() {
		return (User) session.getAttribute("USUARIO");
	}

	/**
	 * Agregar mensaje error.
	 *
	 * @param severidad
	 *            the severidad
	 * @param mensaje
	 *            the mensaje
	 */
	protected void agregarMensajeError(int severidad, String mensaje) {

		MensajesError me = new MensajesError();
		me.setMessage(mensaje);
		me.setSeveridad(severidad);
		listaErrores.add(me);
	}

	/**
	 * Gets the mensajes error.
	 *
	 * @return the mensajes error
	 */
	protected String getMensajesError() {
		StringBuffer sb = new StringBuffer();

		if (listaErrores.size() > 0) {

			for (Iterator<MensajesError> iterator = listaErrores.iterator(); iterator.hasNext();) {
				MensajesError mensajesError = iterator.next();
				sb.append(mensajesError.getMessage());
			}
		} else {
			sb.append("OK");
		}

		return sb.toString();
	}

}
