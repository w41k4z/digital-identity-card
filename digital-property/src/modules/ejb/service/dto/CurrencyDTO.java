package service.dto;

import java.sql.Timestamp;

public class CurrencyDTO {
    /* FIELDS */
    public Integer ID;
    public String currency;
    public Timestamp fromDate;
    public Double purchaseRate;
    public Double saleRate;

    /* CONSTRUCTOR */
    public CurrencyDTO(Integer Id, String currency, Timestamp fromDate, Double purchaseRate, Double saleRate) {
        this.ID = Id;
        this.currency = currency;
        this.fromDate = fromDate;
        this.purchaseRate = purchaseRate;
        this.saleRate = saleRate;
    }
}
