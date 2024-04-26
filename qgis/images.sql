CREATE TABLE
  images (
    imageid INTEGER NOT NULL PRIMARY KEY,
    feature_id INTEGER NOT NULL,
    feature_name TEXT NOT NULL,
    image_url TEXT,
    image_descrip TEXT,
    image_attribution TEXT,
    CONSTRAINT image_id_feature_id FOREIGN KEY (feature_id) REFERENCES vashon_points (feature_id),
    CONSTRAINT image_name_feature_name FOREIGN KEY (feature_name) REFERENCES vashon_points (feature_name)
  );