namespace Controllers;

using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Entity;
using Client;
using Model;

[ApiController]
[Route("api/bank-transactions")]
public class BankTransactionController : ControllerBase
{
    [HttpGet("{nic}")]
    public async Task<ActionResult<List<BankTransaction>>> Get(string nic)
    {
        if (await Client.isValidNIC(nic))
        {
            return BankTransaction.GetTransactionsForAccount(nic);
        }
        return BadRequest("No bank account");
    }

    [HttpPost("transfer")]
    public async Task<IActionResult> Get([FromBody] Transaction transaction)
    {
        try
        {
            if (transaction.from == transaction.to)
            {
                throw new Exception("You can not transfer money to yourself");
            }

            bool isSenderValid = await Client.isValidNIC(transaction.from);
            bool isReceiverValid = await Client.isValidNIC(transaction.to);
            if (isSenderValid && isReceiverValid)
            {
                var PurchaseAmount = decimal.Parse(transaction.amount);
                var SaleAmount = decimal.Parse(transaction.amount);
                decimal purchaseRateconverted = await Client.getPurchaseRateCurrencyConversion(transaction.currency, (double)PurchaseAmount);
                decimal saleRateconverted = await Client.getSaleRateCurrencyConversion(transaction.currency, (double)SaleAmount);
                PurchaseAmount = purchaseRateconverted;
                SaleAmount = saleRateconverted;

                double senderSold = BankTransaction.GetSold(transaction.from);
                if ((double)PurchaseAmount < 0)
                {
                    throw new Exception("Are you okey ? You can not do that");
                }
                if (senderSold < (double)PurchaseAmount)
                {
                    throw new Exception("Insufficient funds. Sold = " + senderSold);
                }

                BankTransaction sender = new BankTransaction(-1, transaction.from, (PurchaseAmount * -1), DateTime.Now, "Transfer " + transaction.amount + " " + transaction.currency + " to " + transaction.to);
                sender.CreateTransaction();
                BankTransaction receiver = new BankTransaction(-1, transaction.to, SaleAmount, DateTime.Now, "Transfered " + transaction.amount + " " + transaction.currency + " from " + transaction.from);
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

