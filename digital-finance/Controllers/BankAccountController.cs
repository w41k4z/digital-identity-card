namespace Controllers;

using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Entity;
using Client;

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
    public async Task<ActionResult<BankAccount>> Get(string nic)
    {
        try
        {
            await Client.isValidNIC(nic);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
        return BankAccount.ReadAccount(nic);
    }

    // GET: api/bank-accounts
    [HttpGet("{nic}/sold")]
    public ActionResult<double> GetSold(string nic)
    {
        return BankTransaction.GetSold(nic);
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
}