namespace Controllers;

using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Entity;

[ApiController]
[Route("api/bank-accounts")]
public class BankAccountController : ControllerBase
{
    // GET: api/bank-accounts
    [HttpGet]
    public IEnumerable<BankAccount> Get()
    {
        return BankAccount.ReadAllBankAccounts();
    }

    // GET: api/bank-accounts/{nic}
    [HttpGet("{nic}")]
    public BankAccount Get(string nic)
    {
        BankAccountController.checkingNICAvailability(nic);
        return BankAccount.ReadAccount(nic);
    }

    // POST: api/bank-accounts
    [HttpPost]
    public IActionResult Post([FromBody] BankAccount account)
    {
        account.CreateAccount();
        return CreatedAtRoute("GetBankAccount", new { nic = account.NIC }, account);
    }

    // PUT: api/bank-accounts/{nic}
    [HttpPut("{nic}")]
    public IActionResult Put(string nic, [FromBody] BankAccount account)
    {
        account.UpdateAccount();
        return NoContent();
    }

    // DELETE: api/bank-accounts/{nic}
    [HttpDelete("{nic}")]
    public IActionResult Delete(string nic)
    {
        BankAccount.DeleteAccount(nic);
        return NoContent();
    }

    // METHODS
    public static async void checkingNICAvailability(string nic)
    {
        using (HttpClient client = new HttpClient())
        {
            // Set the base address of the web service
            client.BaseAddress = new Uri("http://localhost:8080/digital-health/");

            // Send a GET request to the specified endpoint
            HttpResponseMessage response = await client.GetAsync("api/people/" + nic);

            if (response.IsSuccessStatusCode)
            {
                // Parse and process the response content
                string data = await response.Content.ReadAsStringAsync();
                if (data != "null")
                {
                    return;
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