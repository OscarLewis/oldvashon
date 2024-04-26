-- Create images table
CREATE TABLE
  images (
    image_id INTEGER NOT NULL PRIMARY KEY,
    feature_id INTEGER NOT NULL,
    image_url TEXT,
    image_descrip TEXT,
    image_attribution TEXT,
    image_date DATE,
    FOREIGN KEY (feature_id) REFERENCES vashon_points (feature_id)
  );