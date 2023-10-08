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

    /* OVERRIDES */
    @Override
    public Map<String, Object> fetchByID(String ID) throws Exception {
        Person person = new Person().findByPrimaryKey(new DBAccess(), ID);
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("nic", person.getNationalIdentityCard());
        map.put("name", person.getName());
        map.put("firstName", person.getFirstName());
        map.put("address", person.getAddress());
        map.put("phone", person.getPhoneNumber());
        return map;
    }

    @Override
    public List<Map<String, Object>> fetch() throws Exception {
        Person[] persons = new Person().findAll(new DBAccess());
        List<Map<String, Object>> maps = new ArrayList<>();
        for (int i = 0; i < persons.length; i++) {
            HashMap<String, Object> map = new HashMap<String, Object>();
            map.put("nic", persons[i].getNationalIdentityCard());
            map.put("name", persons[i].getName());
            map.put("firstName", persons[i].getFirstName());
            map.put("address", persons[i].getAddress());
            map.put("phone", persons[i].getPhoneNumber());
            maps.add(map);
        }
        return maps;
    }

}
