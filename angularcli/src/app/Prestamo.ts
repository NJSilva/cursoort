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
    "personas": {
        "personas_id": number;
        "personas_cedula": string;
        "personas_mail": string;
        "personas_nombre": string;
    },
    "prestamos_fecha_desde_string": string;
    "prestamos_fecha_hasta_string": string;
    "prestamos_fecha_desde_Date": string;
    "prestamos_fecha_hasta_Date": string;
}