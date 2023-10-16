package bean;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import entity.Currency;
import service.CurrencyService;

@Remote
@Stateless
public class CurrencyBean implements CurrencyService {

    @Override
    public double getLatestConversion(String currency, double value) throws Exception {
        return Currency.getLatestConversion(currency, value);
    }

}
