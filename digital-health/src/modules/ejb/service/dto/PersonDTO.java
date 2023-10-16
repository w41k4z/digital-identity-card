package service.dto;

import java.io.Serializable;

public class PersonDTO implements Serializable {
    /* FIELDS SECTION */
    public String nationalIdentityCard;
    public String name;
    public String firstName;
    public String address;
    public String phoneNumber;
    public String bloodType;

    /* CONSTRUCTOR */
    public PersonDTO(String nic, String name, String firstName, String address, String number, String bloodType) {
        this.nationalIdentityCard = nic;
        this.name = name;
        this.firstName = firstName;
        this.address = address;
        this.phoneNumber = number;
        this.bloodType = bloodType;
    }
}
