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
    public List<BankTransaction> Get(string nic)
    {
        BankAccountController.checkingNICAvailability(nic);
        return BankTransaction.GetTransactionsForAccount(nic);
    }

}

