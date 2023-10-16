package service;

public interface HealthDetailService {
    public service.dto.HealthDetailDTO[] fetchByNIC(String NIC) throws Exception;
}
