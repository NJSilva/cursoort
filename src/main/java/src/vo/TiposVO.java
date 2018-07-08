/* Archivo generado automaticamente por GeneradorValueObject */
package src.vo;

import src.framework.valueobject.VOI;

public class TiposVO implements VOI{

    private Integer tipos_codigo;
    private String tipos_nombre;

    public TiposVO() {
    }

    public String getTipos_nombre() {
        return this.tipos_nombre;
    }

    public void setTipos_nombre(String _tipos_nombre) {
        this.tipos_nombre = _tipos_nombre;
    }

    /**
     * @return the tipos_codigo
     */
    public Integer getTipos_codigo() {
        return tipos_codigo;
    }

    /**
     * @param tipos_codigo the tipos_codigo to set
     */
    public void setTipos_codigo(Integer tipos_codigo) {
        this.tipos_codigo = tipos_codigo;
    }
    
    

}
