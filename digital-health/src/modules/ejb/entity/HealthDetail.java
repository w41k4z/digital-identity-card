package entity;

import java.sql.Date;

import orm.annotation.Column;
import orm.annotation.Entity;
import orm.annotation.PrimaryKey;
import orm.database.object.relation.Relation;

// VIEW
@Entity(name = "person_health_detail", columnCount = 5)
public class HealthDetail extends Relation<HealthDetail> {
    /* FIELDS SECTION */
    @PrimaryKey(column = @Column(name = "id"), sequence = "person_health_detail_id_seq", length = 8, prefix = "PHD")
    private String ID;

    @Column(name = "person_nic")
    private String personNationalIdentityCard;

    @Column(name = "from_date")
    private Date fromDate;

    @Column
    private String category;

    @Column
    private String description;

    /* CONSTRUCTOR SECTION */
    public HealthDetail() throws Exception {
    }

    /* SETTERS */
    public void setID(String ID) {
        this.ID = ID;
    }

    public void setPersonNationalIdentityCard(String nationalIdentityCard) {
        this.personNationalIdentityCard = nationalIdentityCard;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public void setCategory(String categ) {
        this.category = categ;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /* GETTERS */
    public String getID() {
        return ID;
    }

    public String getPersonNationalIdentityCard() {
        return personNationalIdentityCard;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    /* METHOD SECTION */
    public service.dto.HealthDetailDTO toDTO() {
        return new service.dto.HealthDetailDTO(ID, personNationalIdentityCard, fromDate, category, description);
    }
}
