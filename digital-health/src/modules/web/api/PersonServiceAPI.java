package api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import client.RemoteAccess;
import service.PersonService;

@Path("/people")
public class PersonServiceAPI {

    @GET
    @Path("")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAll() throws Exception {
        RemoteAccess remoteAccess = new RemoteAccess("localhost", "3700",
                "java:global/digital-health/ejb-module/");
        PersonService personService = (PersonService) remoteAccess.getRemoteReference(PersonService.class);
        return new Gson().toJson(personService.fetch());
    }

    @GET
    @Path("/{nic}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getByNIC(@PathParam("nic") String nic) throws Exception {
        RemoteAccess remoteAccess = new RemoteAccess("localhost", "3700",
                "java:global/digital-health/ejb-module/");
        PersonService personService = (PersonService) remoteAccess.getRemoteReference(PersonService.class);
        return new Gson().toJson(personService.fetchByID(nic));
    }
}
