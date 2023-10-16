package api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import client.RemoteAccess;
import service.CurrencyService;

@Path("/currencies")
public class CurrencyServiceAPI {
    @GET
    @Path("/{currency}/{value}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getLatestConversion(@PathParam("currency") String currency, @PathParam("value") Double value)
            throws Exception {
        RemoteAccess remoteAccess = new RemoteAccess("localhost", "3700",
                "java:global/digital-property/ejb-module/");
        CurrencyService currencyService = (CurrencyService) remoteAccess.getRemoteReference(CurrencyService.class);
        return new Gson().toJson(currencyService.getLatestConversion(currency, value));
    }
}
