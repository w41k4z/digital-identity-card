package service;

public interface PersonService {
    public static String context = "";

    public boolean exists(String ID) throws Exception;

    public service.dto.PersonDTO[] fetch() throws Exception;

    public service.dto.PersonDTO fetchByID(String ID) throws Exception;
}
