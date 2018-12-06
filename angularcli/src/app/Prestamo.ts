export interface Prestamo {

    "prestamos_fecha_desde": string;
    "prestamos_fecha_hasta": string;
    "libros": {
        "libros_id": number;
        "libros_codigo": string;
        "libros_titulo": string;
        "libros_isbn": string;
        "libros_anio": number;
        "libros_descripcion": string;
        "libros_disponible": number;
        "libros_imagen": string;
        "libros_autor": string;
        "tiposVO": {
            "tipos_id": number;
            "tipos_nombre": string;
        }
    }
}