package entity;

import java.sql.Timestamp;

import connection.DBAccess;
import orm.annotation.Entity;
import orm.annotation.PrimaryKey;
import orm.annotation.Column;
import orm.database.object.relation.Relation;
import service.dto.CurrencyDTO;

@Entity(name = "currency", columnCount = 5)
public class Currency extends Relation<Currency> {
    /* FIELDS SECTION */
    @PrimaryKey(column = @Column(name = "id"))
    private Integer ID;

    @Column
    private String currency;

    @Column(name = "from_date")
    private Timestamp fromDate;

    @Column(name = "purchase_rate")
    private Double purchaseRate;

    @Column(name = "sale_rate")
    private Double saleRate;

    /* CONSTRUCTOR */
    public Currency() throws Exception {
    }

    /* GETTERS AND SETTERS */
    /**
     * @return Integer return the ID
     */
    public Integer getID() {
        return ID;
    }

    /**
     * @param ID the ID to set
     */
    public void setID(Integer ID) {
        this.ID = ID;
    }

    /**
     * @return String return the currency
     */
    public String getCurrency() {
        return currency;
    }

    /**
     * @param currency the currency to set
     */
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    /**
     * @return Date return the fromDate
     */
    public Timestamp getFromDate() {
        return fromDate;
    }

    /**
     * @param fromDate the fromDate to set
     */
    public void setFromDate(Timestamp fromDate) {
        this.fromDate = fromDate;
    }

    /**
     * @return Double return the value
     */
    public Double getPurchaseRate() {
        return purchaseRate;
    }

    /**
     * @param value the value to set
     */
    public void setPurchaseRate(Double value) {
        this.purchaseRate = value;
    }

    /**
     * @return Double return the value
     */
    public Double getSaleRate() {
        return saleRate;
    }

    /**
     * @param value the value to set
     */
    public void setSaleRate(Double value) {
        this.saleRate = value;
    }

    /* METHOD */
    public static double getLatestPurchaseConversion(String currency, double value) throws Exception {
        Currency latestConversion = new Currency().findAll(new DBAccess(),
                "WHERE currency = '" + currency + "' ORDER BY from_date DESC")[0];
        return value * latestConversion.getPurchaseRate();
    }

    public static double getLatestSaleConversion(String currency, double value) throws Exception {
        Currency latestConversion = new Currency().findAll(new DBAccess(),
                "WHERE currency = '" + currency + "' ORDER BY from_date DESC")[0];
        return value * latestConversion.getSaleRate();
    }

    public CurrencyDTO toDTO() {
        return new CurrencyDTO(ID, currency, fromDate, purchaseRate, saleRate);
    }
}