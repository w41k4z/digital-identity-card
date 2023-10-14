import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import api.PersonServiceAPI;

@ApplicationPath("/api")
public class DigitalHealth extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(PersonServiceAPI.class);
        return classes;
    }
}
