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
- img_url: a link to an image of the feature (can be local like the `streetview` images in the `public` dir, or somewhere else on the internet).
- img_attribution: Attribution string for the image.
- author: Who wrote the feature.
- summary: not currently used, could be similar to description.

If you need to add the basemap to your QGIS install, add a new XYZ connection with the standard tile resolution (256x256) using the following URL: https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/USDA_CONUS_PRIME/ImageServer/tile/{z}/{y}/{x}
