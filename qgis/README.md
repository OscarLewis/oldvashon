# QGIS Project Files

This folder contains the files that are needed to work on this project in [QGIS](https://www.qgis.org/en/site/).

The old_vashon.gqz QGIS Project file contains a basemap from the [National Agriculture Imagery Program (NAIP)](https://naip-usdaonline.hub.arcgis.com/) and a point feature layer named `vashon_points` which is read from the oldvashon.sqlite file in this directory.

Please edit features using the local sqlite file and then once your changes are ready, copy the local file into the projects `public` directory, replacing the older sqlite file.

Each feature contains the following attributes:

- name: The name of the feature.
- long_name: A different, possibly more official name for the feature (example: Harbor Mercantile instead of Burton Store).
- description: A brief description of the feature.
- history: A longer full history of the feature, this should be written in Markdown and copied from a file in the `markdown_files` directory.
- citations: Additional citations for feature history.
- start_year: A date (when a business opened, when some art got installed, etc.)
- end_year: A date (when a business closed, etc.)
- author: Who wrote the feature.
- summary: not currently used, could be similar to description.
- geom: The Point geometry for the feature, in ESPG:2285.

All image information is stored in the `images` table. This is so multiple images can be stored for each feature.
The "feature_id" column in `images` is a foreign key to the "pk" column in `vashon_points`.

Columns in `images`:

- image_id: Primary key.
- feature_id: Foreign key to link to what feature in `vashon_points` the image is related to.
- image_url: URL to image location either local (served from website root) or external.
- image_descrip: A brief description of the image.
- image_attribution: Attribution for the image (in Markdown).
- image_date: A date for the image.

If you need to add the basemap to your QGIS install, add a new XYZ connection with the standard tile resolution (256x256) using the following URL: https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/USDA_CONUS_PRIME/ImageServer/tile/{z}/{y}/{x}

The two SQL files in this directory show what the schema of the database is (as Spatialite's ".schema" command seems a little broken).
