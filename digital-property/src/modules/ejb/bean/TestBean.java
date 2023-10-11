package bean;

import java.util.List;
import java.util.Map;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import client.RemoteAccess;

import service.PersonService;
import service.TestService;

@Remote
@Stateless
public class TestBean implements TestService {

    @Override
    public String test() throws Exception {
        PersonService portal = (PersonService) new RemoteAccess("localhost", "3700",
                "java:global/digital-health/ejb-module/")
                .getRemoteReference(PersonService.class);
        List<Map<String, Object>> people = portal.fetch();
        return people.get(0).get("name").toString();
    }

}
