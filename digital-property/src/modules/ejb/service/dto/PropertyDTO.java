package service.dto;

import java.sql.Date;

public class PropertyDTO {
    /* FIELDS */
    private String ID;
    private String personNationalIdentityCard;
    private Date acquisitionDate;
    private String name;
    private String description;

    /* CONSTRUCTOR */
    public PropertyDTO(String id, String nic, Date date, String name, String description) {
        this.ID = id;
        this.personNationalIdentityCard = nic;
        this.acquisitionDate = date;
        this.name = name;
        this.description = description;
    }
}
