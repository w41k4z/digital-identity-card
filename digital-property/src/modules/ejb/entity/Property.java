package entity;

import java.sql.Date;

import orm.annotation.Column;
import orm.annotation.Entity;
import orm.annotation.PrimaryKey;
import orm.database.object.relation.Relation;

@Entity(name = "property", columnCount = 5)
public class Property extends Relation<Property> {
    /* FIELDS SECTION */
    @PrimaryKey(column = @Column(name = "id"), sequence = "property_id_seq", length = 8, prefix = "PRP")
    private String ID;

    @Column(name = "person_nic")
    private String personNationalIdentityCard;

    @Column(name = "aquisition_date")
    private Date acquisitionDate;

    @Column
    private String name;

    @Column
    private String description;

    /* CONSTRUCTOR */
    public Property() throws Exception {
        super();
        // TODO Auto-generated constructor stub
    }

    /* GETTERS AND SETTERS */
    public String getID() {
        return ID;
    }

    public void setID(String iD) {
        ID = iD;
    }

    public String getPersonNationalIdentityCard() {
        return personNationalIdentityCard;
    }

    public void setPersonNationalIdentityCard(String personNationalIdentityCard) {
        this.personNationalIdentityCard = personNationalIdentityCard;
    }

    public Date getAcquisitionDate() {
        return acquisitionDate;
    }

    public void setAcquisitionDate(Date acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /* METHOD */
    public service.dto.PropertyDTO toDTO() {
        return new service.dto.PropertyDTO(this.ID, this.personNationalIdentityCard, this.acquisitionDate, this.name,
                this.description);
    }
}
