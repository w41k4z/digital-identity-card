package service;

public interface CurrencyService {
    public double getLatestConversion(String currency, double value) throws Exception;
}
