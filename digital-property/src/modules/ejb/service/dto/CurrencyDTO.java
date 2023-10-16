package service.dto;

import java.sql.Timestamp;

public class CurrencyDTO {
    /* FIELDS */
    public Integer ID;
    public String currency;
    public Timestamp fromDate;
    public Double value;

    /* CONSTRUCTOR */
    public CurrencyDTO(Integer Id, String currency, Timestamp fromDate, Double value) {
        this.ID = Id;
        this.currency = currency;
        this.fromDate = fromDate;
        this.value = value;
    }
}
