/* Archivo generado automaticamente por GeneradorValueObject */
package src.vo;

import src.framework.valueobject.VOI;

public class LibrosVO implements VOI {

    private int libros_id;
    private String libros_codigo;
    private String libros_titulo;
    private String libros_isbn;
    private int libros_anio;
    private String libros_descripcion;
    private int libros_disponible;
    private String libros_imagen;
    private String libros_autor;
    private TiposVO tipos;

    public LibrosVO() {
    }

    public String getLibros_codigo() {
        return this.libros_codigo;
    }

    public void setLibros_codigo(String _libros_codigo) {
        this.libros_codigo = _libros_codigo;
    }

    public String getLibros_titulo() {
        return this.libros_titulo;
    }

    public void setLibros_titulo(String _libros_titulo) {
        this.libros_titulo = _libros_titulo;
    }

    public String getLibros_isbn() {
        return this.libros_isbn;
    }

    public void setLibros_isbn(String _libros_isbn) {
        this.libros_isbn = _libros_isbn;
    }

    public int getLibros_anio() {
        return this.libros_anio;
    }

    public void setLibros_anio(int _libros_anio) {
        this.libros_anio = _libros_anio;
    }

    public String getLibros_descripcion() {
        return this.libros_descripcion;
    }

    public void setLibros_descripcion(String _libros_descripcion) {
        this.libros_descripcion = _libros_descripcion;
    }

    public int getLibros_disponible() {
        return this.libros_disponible;
    }

    public void setLibros_disponible(int _libros_disponible) {
        this.libros_disponible = _libros_disponible;
    }

    public TiposVO getTiposVO() {
        return this.tipos;
    }

    public void setTiposVO(TiposVO _tipos) {
        this.tipos = _tipos;
    }

    /**
     * @return the libros_id
     */
    public int getLibros_id() {
        return libros_id;
    }

    /**
     * @param libros_id the libros_id to set
     */
    public void setLibros_id(int libros_id) {
        this.libros_id = libros_id;
    }

    /**
     * @return the libros_imagen
     */
    public String getLibros_imagen() {
        return libros_imagen;
    }

    /**
     * @param libros_imagen the libros_imagen to set
     */
    public void setLibros_imagen(String libros_imagen) {
        this.libros_imagen = libros_imagen;
    }

    /**
     * @return the libros_autor
     */
    public String getLibros_autor() {
        return libros_autor;
    }

    /**
     * @param libros_autor the libros_autor to set
     */
    public void setLibros_autor(String libros_autor) {
        this.libros_autor = libros_autor;
    }

}
