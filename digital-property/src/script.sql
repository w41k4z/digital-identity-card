-- digital_property database --
CREATE SEQUENCE property_id_seq;

CREATE TABLE property (
    id VARCHAR(8) PRIMARY KEY,
    person_nic CHAR(12) NOT NULL,
    aquisition_date DATE NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE currency (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(3) NOT NULL CHECK (currency IN ('AR', 'USD', 'EUR')),
    from_date TIMESTAMP NOT NULL,
    value DECIMAL(10, 2)
);