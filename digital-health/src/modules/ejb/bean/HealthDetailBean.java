package bean;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import connection.DBAccess;
import entity.HealthDetail;
import service.HealthDetailService;
import service.dto.HealthDetailDTO;

@Remote
@Stateless
public class HealthDetailBean implements HealthDetailService {
    /* FIELD */
    private HealthDetail healthDetail;

    /* CONSTRUCTOR */
    public HealthDetailBean() throws Exception {
        this.healthDetail = new HealthDetail();
    }

    @Override
    public HealthDetailDTO[] fetchByNIC(String NIC) throws Exception {
        HealthDetail[] results = healthDetail.findAll(new DBAccess(), "WHERE person_nic = '" + NIC + "'");
        HealthDetailDTO[] DTOs = new HealthDetailDTO[results.length];
        for (int i = 0; i < results.length; i++) {
            DTOs[i] = results[i].toDTO();
        }
        return DTOs;
    }
}
