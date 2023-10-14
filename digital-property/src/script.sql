-- digital_property database --
  
CREATE TABLE person_property (
    id INT AUTO_INCREMENT PRIMARY,
    person_nic CHAR(12) NOT NULL,
);

CREATE TABLE property (
    id INT AUTO_INCREMENT PRIMARY,
    name VARCHAR() NOT NULL,
);