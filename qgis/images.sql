CREATE TABLE
  images (
    imageid INTEGER NOT NULL PRIMARY KEY,
    -- These feature keys match the vashon_points table, if I make them actual foreign keys than qgis bugs out
    feature_id INTEGER,
    feature_name TEXT,
    image_url TEXT,
    image_descrip TEXT,
    image_attribution TEXT
  );