import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import api.PropertyServiceAPI;

@ApplicationPath("/api")
public class DigitalProperty extends Application {

    public DigitalProperty() {
        super();
    }

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        // API
        classes.add(PropertyServiceAPI.class);
        // Ressource
        classes.add(CorsFilter.class);

        return classes;
    }
}
