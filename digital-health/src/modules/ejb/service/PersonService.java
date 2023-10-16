package service;

public interface PersonService {

    public service.dto.PersonDTO[] fetch() throws Exception;

    public service.dto.PersonDTO fetchByID(String ID) throws Exception;
}
