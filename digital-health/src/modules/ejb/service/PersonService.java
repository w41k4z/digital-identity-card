package service;

import java.util.List;
import java.util.Map;

public interface PersonService {
    public static String context = "";

    public boolean exists(String ID) throws Exception;

    public List<Map<String, Object>> fetch() throws Exception;

    public Map<String, Object> fetchByID(String ID) throws Exception;
}
