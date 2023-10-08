-- digital_health database --

CREATE TABLE person (
    nic CHAR(12) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone CHAR(10) NOT NULL
);

CREATE TABLE person_health_info (
    id SERIAL PRIMARY KEY,
    person_nic CHAR(12) NOT NULL REFERENCES person(nic),
    blood_type VARCHAR(3) NOT NULL
);