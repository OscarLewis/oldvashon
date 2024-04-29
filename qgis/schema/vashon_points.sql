-- Create vashon_points table
CREATE TABLE
    vashon_points (
        feature_id INTEGER NOT NULL PRIMARY KEY,
        feature_name TEXT NOT NULL,
        description TEXT,
        history TEXT,
        start_year DATE,
        end_year DATE,
        long_name TEXT,
        author TEXT,
        summary TEXT,
        last_edited DATE,
        citations TEXT
    );

-- Add Geometry Column to vashon_points
SELECT
    AddGeometryColumn ('vashon_points', 'geom', 2285, 'POINT', 'XY');

-- Add support for SpatialIndex-Queries
SELECT
    CreateSpatialIndex (
        -- the table-name
        'vashon_points',
        -- the geometry column-name
        'geom'
    );