package bean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import connection.DBAccess;

import entity.Person;

import service.PersonService;

@Remote
@Stateless
public class PersonBean implements PersonService {
    /* FIELD */
    private Person person;

    /* CONSTRUCTOR */
    public PersonBean() throws Exception {
        this.person = new Person();
    }

    @Override
    public boolean exists(String ID) throws Exception {
        return false;
    }

    @Override
    public service.dto.PersonDTO fetchByID(String ID) throws Exception {
        Person person = this.person.findByPrimaryKey(new DBAccess(), ID);
        return person == null ? null : person.toDTO();
    }

    @Override
    public service.dto.PersonDTO[] fetch() throws Exception {
        Person[] persons = this.person.findAll(new DBAccess());
        service.dto.PersonDTO[] personDTOs = new service.dto.PersonDTO[persons.length];
        for (int i = 0; i < persons.length; i++) {
            personDTOs[i] = persons[i].toDTO();
        }
        return personDTOs;
    }
}
