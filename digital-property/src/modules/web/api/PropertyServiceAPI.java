package api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import client.RemoteAccess;
import service.PropertyService;

@Path("/properties")
public class PropertyServiceAPI {

    @GET
    @Path("/{nic}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getByNIC(@PathParam("nic") String nic) throws Exception {
        RemoteAccess remoteAccess = new RemoteAccess("localhost", "3700",
                "java:global/digital-property/ejb-module/");
        PropertyService propertyService = (PropertyService) remoteAccess.getRemoteReference(PropertyService.class);
        return new Gson().toJson(propertyService.fetchByNIC(nic));
    }
}
