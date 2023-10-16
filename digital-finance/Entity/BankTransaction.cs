namespace Entity;

using System;
using Npgsql;
using System.Data;
using System.Data.Common;

public class BankTransaction
{
    /* FIELDS SECTION */
    public int TransactionId { get; set; }
    public string AccountId { get; set; }
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
    public string Description { get; set; }

    // Database connection string for PostgreSQL
    private static readonly string connectionString = "Host=localhost;Port=5432;Database=digital_finance;Username=w41k4z;Password=w41k4z!;";

    /* CONSTRUCTORS SECTION */
    public BankTransaction() { }

    public BankTransaction(int transactionId, string accountId, decimal amount, DateTime transactionDate, string description)
    {
        TransactionId = transactionId;
        AccountId = accountId;
        Amount = amount;
        TransactionDate = transactionDate;
        Description = description;
    }

    /* METHODS SECTION */
    // Create a new bank transaction
    public void CreateTransaction()
    {
        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "INSERT INTO bank_transaction (account_id, amount, transaction_date, description) " +
                           "VALUES (@AccountId, @Amount, @TransactionDate, @Description)";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@AccountId", AccountId);
                command.Parameters.AddWithValue("@Amount", Amount);
                command.Parameters.AddWithValue("@TransactionDate", TransactionDate);
                command.Parameters.AddWithValue("@Description", Description);
                command.ExecuteNonQuery();
            }
        }
    }

    // Read transactions for a specific account
    public static List<BankTransaction> GetTransactionsForAccount(string accountId)
    {
        List<BankTransaction> transactions = new List<BankTransaction>();

        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "SELECT * FROM bank_transaction WHERE account_id = @AccountId";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@AccountId", accountId);
                using (NpgsqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        transactions.Add(new BankTransaction
                        {
                            TransactionId = Convert.ToInt32(reader["transaction_id"]),
                            AccountId = reader["account_id"].ToString(),
                            Amount = Convert.ToDecimal(reader["amount"]),
                            TransactionDate = Convert.ToDateTime(reader["transaction_date"]),
                            Description = reader["description"].ToString()
                        });
                    }
                }
            }
        }

        return transactions;
    }

    public static double GetSold(string nic)
    {
        double sold = 0;

        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "SELECT SUM(amount) FROM bank_transaction WHERE account_id = @AccountId";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@AccountId", nic);
                object result = command.ExecuteScalar();
                if (result != DBNull.Value)
                {
                    sold = Convert.ToDouble(result);
                }
            }
        }

        return sold;
    }

}
