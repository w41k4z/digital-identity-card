package service;

public interface CurrencyService {
    public double getLatestPurchaseConversion(String currency, double value) throws Exception;

    public double getLatestSaleConversion(String currency, double value) throws Exception;
}
