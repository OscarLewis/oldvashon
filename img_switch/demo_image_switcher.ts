import feature_collection from "../src/spatialite";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
import Collection from "ol/Collection";
import GeoJSON from "ol/format/GeoJSON";
import { createImageSwitcher } from "../src/imageswitch";

let feature_geometry = await feature_collection;
let features: Feature<Geometry>[] | Collection<Feature<Geometry>> =
  new GeoJSON().readFeatures(feature_geometry, {
    dataProjection: "NAD83/Washington_North",
    featureProjection: "EPSG:3857",
  });

let img_urls: string[] = [];

features.forEach((element) => {
  const img_url: string = element.get("img_url");
  if (img_url != null && img_url != undefined) {
    img_urls.push(img_url);
  }
});

createImageSwitcher(img_urls, "next-image", "previous-image", "image-div");
