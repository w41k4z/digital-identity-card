-- digital_health database --

-- SEQ --
CREATE SEQUENCE person_health_detail_id_seq;

-- TABLES --
CREATE TABLE person (
    nic CHAR(12) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone CHAR(10) NOT NULL,
    blood_type VARCHAR(3) NOT NULL
);

CREATE TABLE person_health_detail (
    id VARCHAR(8) PRIMARY KEY,
    person_nic CHAR(12) NOT NULL REFERENCES person(nic),
    from_date DATE NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('allergy', 'disease', 'incident')),
    description TEXT NOT NULL
);