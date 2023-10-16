namespace Entity;

public class Transfer
{
    public static async Task<decimal> getConversion(string cur, double amount)
    {
        using (HttpClient client = new HttpClient())
        {
            // Set the base address of the web service
            client.BaseAddress = new Uri("http://localhost:8080/digital-property/");

            // Send a GET request to the specified endpoint
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