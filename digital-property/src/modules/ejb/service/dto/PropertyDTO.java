package service.dto;

import java.sql.Date;

import orm.database.object.type.Polygon;

public class PropertyDTO {
    /* FIELDS */
    private String ID;
    private String personNationalIdentityCard;
    private Date acquisitionDate;
    private String description;
    private Polygon polygon;

    /* CONSTRUCTOR */
    public PropertyDTO(String id, String nic, Date date, String description, Polygon polygon) {
        this.ID = id;
        this.personNationalIdentityCard = nic;
        this.acquisitionDate = date;
        this.description = description;
        this.polygon = polygon;
    }
}
