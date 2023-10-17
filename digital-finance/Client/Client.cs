namespace Client;

public class Client
{
    public static async Task<bool> isValidNIC(string nic)
    {
        using (HttpClient client = new HttpClient())
        {
            client.BaseAddress = new Uri("http://localhost:8080/digital-health/");

            HttpResponseMessage response = await client.GetAsync("api/people/" + nic);

            if (response.IsSuccessStatusCode)
            {
                // Parse and process the response content
                string data = await response.Content.ReadAsStringAsync();
                if (data != null && data != "null")
                {
                    return true;
                }
                return false;
            }
            else
            {
                return false;
            }
        }
    }

    public static async Task<decimal> getCurrencyConversion(string cur, double amount)
    {
        using (HttpClient client = new HttpClient())
        {
            client.BaseAddress = new Uri("http://localhost:8080/digital-property/");

            HttpResponseMessage response = await client.GetAsync("api/currencies/" + cur + "/" + amount);

            if (response.IsSuccessStatusCode)
            {
                // Parse and process the response content
                string data = await response.Content.ReadAsStringAsync();
                if (data != null || data != "null")
                {
                    return decimal.Parse(data);
                }
                throw new Exception("This national identity card is not registered yet");
            }
            else
            {
                throw new Exception("Error: Check the URI or the server web service");
            }
        }
    }
}