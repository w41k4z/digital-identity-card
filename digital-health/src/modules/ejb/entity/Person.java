package entity;

import orm.annotation.Column;
import orm.annotation.Entity;
import orm.annotation.PrimaryKey;
import orm.database.object.relation.Relation;

@Entity(name = "person", columnCount = 6)
public class Person extends Relation<Person> {
    /* FIELDS SECTION */
    @PrimaryKey(column = @Column(name = "nic"))
    private String nationalIdentityCard;

    @Column
    private String name;

    @Column(name = "first_name")
    private String firstName;

    @Column
    private String address;

    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "blood_type")
    private String bloodType;

    /* CONSTRUCTOR SECTION */
    public Person() throws Exception {
    }

    /* SETTERS */
    public void setNationalIdentityCard(String nationalIdentityCard) {
        this.nationalIdentityCard = nationalIdentityCard;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhoneNumber(String phone) {
        this.phoneNumber = phone;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    /* GETTERS */
    public String getNationalIdentityCard() {
        return nationalIdentityCard;
    }

    public String getName() {
        return name;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getAddress() {
        return address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getBloodType() {
        return bloodType;
    }

    /* METHOD */
    public service.dto.PersonDTO toDTO() {
        return new service.dto.PersonDTO(nationalIdentityCard, name, firstName, address, phoneNumber, bloodType);
    }
}