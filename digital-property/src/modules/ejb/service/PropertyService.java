package service;

public interface PropertyService {
    public service.dto.PropertyDTO[] fetchByNIC(String nic) throws Exception;
}