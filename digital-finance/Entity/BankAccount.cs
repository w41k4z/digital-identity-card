namespace Entity;

using System;
using System.Collections.Generic;
using Npgsql;

public class BankAccount
{
    /* FIELDS SECTION */
    public string NIC { get; set; }
    public DateTime CreationDate { get; set; }

    // Database connection string for PostgreSQL
    private static readonly string connectionString = "Host=localhost;Port=5432;Database=digital_finance;Username=w41k4z;Password=w41k4z!";

    /* CONSTRUCTORS SECTION */
    public BankAccount() { }

    public BankAccount(string nic, DateTime creationDate)
    {
        NIC = nic;
        CreationDate = creationDate;
    }

    /* METHODS SECTION */
    // Create a new bank account
    public void CreateAccount()
    {
        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "INSERT INTO bank_account (nic, creation_date) VALUES (@NIC, @CreationDate)";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@NIC", NIC);
                command.Parameters.AddWithValue("@CreationDate", CreationDate);
                command.ExecuteNonQuery();
            }
        }
    }

    // Read all bank accounts
    public static List<BankAccount> ReadAllBankAccounts()
    {
        List<BankAccount> accounts = new List<BankAccount>();

        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "SELECT * FROM bank_account";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                using (NpgsqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        accounts.Add(new BankAccount
                        {
                            NIC = reader["nic"].ToString(),
                            CreationDate = Convert.ToDateTime(reader["creation_date"])
                        });
                    }
                }
            }
        }

        return accounts;
    }

    // Read a bank account by NIC
    public static BankAccount ReadAccount(string nic)
    {
        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "SELECT * FROM bank_account WHERE nic = @NIC";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@NIC", nic);
                using (NpgsqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new BankAccount
                        {
                            NIC = reader["nic"].ToString(),
                            CreationDate = Convert.ToDateTime(reader["creation_date"])
                        };
                    }
                }
            }
        }
        return null;
    }

    // Update a bank account's creation date
    public void UpdateAccount()
    {
        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "UPDATE bank_account SET creation_date = @CreationDate WHERE nic = @NIC";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@CreationDate", CreationDate);
                command.Parameters.AddWithValue("@NIC", NIC);
                command.ExecuteNonQuery();
            }
        }
    }

    // Delete a bank account by NIC
    public static void DeleteAccount(string nic)
    {
        using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            string query = "DELETE FROM bank_account WHERE nic = @NIC";
            using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@NIC", nic);
                command.ExecuteNonQuery();
            }
        }
    }
}
