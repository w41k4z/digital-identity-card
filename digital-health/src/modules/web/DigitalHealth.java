import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import api.HealthDetailServiceAPI;
import api.PersonServiceAPI;

@ApplicationPath("/api")
public class DigitalHealth extends Application {

    public DigitalHealth() {
        super();
    }

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        // API
        classes.add(PersonServiceAPI.class);
        classes.add(HealthDetailServiceAPI.class);

        // Ressource
        classes.add(CorsFilter.class);

        return classes;
    }
}
