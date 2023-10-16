package bean;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import client.RemoteAccess;
import connection.DBAccess;
import entity.Property;
import service.PersonService;
import service.PropertyService;
import service.dto.PropertyDTO;

@Remote
@Stateless
public class PropertyBean implements PropertyService {
    /* FIELD */
    private Property property;

    /* CONSTRUCTOR */
    public PropertyBean() throws Exception {
        this.property = new Property();
    }

    @Override
    public PropertyDTO[] fetchByNIC(String nic) throws Exception {
        RemoteAccess remoteAccess = new RemoteAccess("localhost", "3700", "java:global/digital-health/ejb-module/");
        PersonService personService = (PersonService) remoteAccess.getRemoteReference(PersonService.class);
        if (personService.fetchByID(nic) != null) {
            Property[] properties = this.property.findAll(new DBAccess(), "WHERE person_nic = '" + nic + "'");
            PropertyDTO[] propertyDTOs = new PropertyDTO[properties.length];
            for (int i = 0; i < properties.length; i++) {
                propertyDTOs[i] = properties[i].toDTO();
            }
            return propertyDTOs;
        }
        return null;
    }

}
