-- digital_property database --
CREATE SEQUENCE property_id_seq;

CREATE TABLE property (
    id VARCHAR(8) PRIMARY KEY,
    person_nic CHAR(12) NOT NULL,
    aquisition_date DATE NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);