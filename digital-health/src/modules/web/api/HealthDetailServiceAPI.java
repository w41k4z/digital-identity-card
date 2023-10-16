package api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import client.RemoteAccess;

import service.HealthDetailService;

@Path("/health-info")
public class HealthDetailServiceAPI {

        @GET
        @Path("/{nic}")
        @Produces(MediaType.APPLICATION_JSON)
        public String getByNIC(@PathParam("nic") String nic) throws Exception {
                RemoteAccess remoteAccess = new RemoteAccess("localhost", "3700",
                                "java:global/digital-health/ejb-module/");
                HealthDetailService healthInfoService = (HealthDetailService) remoteAccess
                                .getRemoteReference(HealthDetailService.class);
                return new Gson().toJson(healthInfoService.fetchByNIC(nic));
        }
}