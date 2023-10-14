-- digital_finance db --
CREATE TABLE bank_account (
    nic CHAR(12) PRIMARY KEY,
    creation_date DATE NOT NULL
);

CREATE TABLE bank_transaction (
    transaction_id SERIAL PRIMARY KEY,
    account_id CHAR(12) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMPTZ DEFAULT NOW(),
    description TEXT,
    FOREIGN KEY (account_id) REFERENCES bank_account(nic)
);
