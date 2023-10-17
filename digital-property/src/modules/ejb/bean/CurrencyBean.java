package bean;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import entity.Currency;
import service.CurrencyService;

@Remote
@Stateless
public class CurrencyBean implements CurrencyService {

    @Override
    public double getLatestPurchaseConversion(String currency, double value) throws Exception {
        return Currency.getLatestPurchaseConversion(currency, value);
    }

    @Override
    public double getLatestSaleConversion(String currency, double value) throws Exception {
        return Currency.getLatestSaleConversion(currency, value);
    }

}
