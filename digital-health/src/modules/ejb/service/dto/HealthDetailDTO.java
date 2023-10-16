package service.dto;

import java.sql.Date;

public class HealthDetailDTO {
    /* FIELDS SECTION */
    public String ID;
    public String personNationalIdentityCard;
    public Date fromDate;
    public String category;
    public String description;

    /* CONSTRUCTOR */
    public HealthDetailDTO(String ID, String personNationalIdentityCard, Date fromDate, String categ, String desc) {
        this.ID = ID;
        this.personNationalIdentityCard = personNationalIdentityCard;
        this.fromDate = fromDate;
        this.category = categ;
        this.description = desc;
    }
}
