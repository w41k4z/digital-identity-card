namespace Controllers;

using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Entity;

[ApiController]
[Route("api/bank-transactions")]
public class BankTransactionController : ControllerBase
{

    [HttpGet("{nic}")]
    public async Task<ActionResult<List<BankTransaction>>> Get(string nic)
    {
        if (await BankAccountController.checkingNICAvailability(nic))
        {
            return BankTransaction.GetTransactionsForAccount(nic);
        }
        return BadRequest("No bank account");
    }

    [HttpGet("transfer/{from}/{amount}/{currency}/{to}")]
    public async Task<ActionResult<Transfer>> Get(string from, string amount, string currency, string to)
    {
        try
        {
            if (from == to)
            {
                throw new Exception("You can not transfer money to yourself");
            }

            bool s = await BankAccountController.checkingNICAvailability(from);
            bool r = await BankAccountController.checkingNICAvailability(to);
            if (s && r)
            {
                var Amount = decimal.Parse(amount);
                decimal res = await Transfer.getConversion(currency, (double)Amount);
                Amount = res;

                double senderSold = BankTransaction.GetSold(from);
                if (senderSold < (double)Amount)
                {
                    throw new Exception("Insufficient funds. Sold = " + senderSold);
                }

                BankTransaction sender = new BankTransaction(-1, from, (Amount * -1), DateTime.Now, "Transfer " + Amount + " to " + to);
                sender.CreateTransaction();
                BankTransaction receiver = new BankTransaction(-1, to, Amount, DateTime.Now, "Transfered " + Amount + " from " + from);
                receiver.CreateTransaction();
                return Ok("OK");
            }
            else
            {
                throw new Exception("NIC unavailable");
            }
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


}

