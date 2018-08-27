package src.vo;

import src.framework.valueobject.VOI;

/**
 *
 * @author rpons
 */
public class Sesion implements VOI{

    private String fullname;
    private String hash;

    public Sesion() {
    }

    public Sesion(String fullname, String hash) {
        this.fullname = fullname;
        this.hash = hash;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

}
