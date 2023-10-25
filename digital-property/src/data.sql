INSERT INTO property VALUES
('PRP00001', '101241216174', '2023-11-01', 'the poor guy finally got a girlfriend', ST_GeomFromText('POLYGON((10.0 20.0, 30.0 40.0, 50.0 60.0, 10.0 20.0))'));

INSERT INTO currency VALUES
(DEFAULT, 'AR', current_timestamp, 1., 1.),
(DEFAULT, 'USD', current_timestamp, 4930, 4450),
(DEFAULT, 'EUR', current_timestamp, 5150, 4890);
