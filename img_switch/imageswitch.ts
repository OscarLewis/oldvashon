import "../src/style.css";
import feature_collection from "../src/spatialite";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
import Collection from "ol/Collection";
import GeoJSON from "ol/format/GeoJSON";

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

console.log(img_urls);
if (img_urls.length > 0) {
  let images_index = 0;
  let images_length = img_urls.length;

  drawImage(img_urls, images_index);
  let next_image_btn = document.getElementById("next-image");
  let prev_image_btn = document.getElementById("previous-image");

  if (
    prev_image_btn != null &&
    prev_image_btn != undefined &&
    next_image_btn != null &&
    next_image_btn != undefined
  ) {
    if (images_index == 0) {
      prev_image_btn.classList.add("image-deactive");
    }
    prev_image_btn.addEventListener("click", function (e) {
      if (images_index > 0) {
        drawImage(img_urls, images_index - 1);
        images_index -= 1;
        if (
          images_index <= images_length - 1 &&
          next_image_btn.classList.contains("image-deactive")
        ) {
          next_image_btn.classList.remove("image-deactive");
        }
      }
      if (images_index == 0) {
        prev_image_btn.classList.add("image-deactive");
      }
    });

    next_image_btn.addEventListener("click", function (e) {
      if (images_index < images_length - 1) {
        drawImage(img_urls, images_index + 1);
        images_index += 1;
      }
      if (images_index == images_length - 1) {
        next_image_btn.classList.add("image-deactive");
      }
      if (
        images_index > 0 &&
        prev_image_btn.classList.contains("image-deactive")
      ) {
        prev_image_btn.classList.remove("image-deactive");
      }
    });
  }
}

function drawImage(image_array, image_index) {
  let img_div = document.getElementById("image-div");
  if (img_div != null && img_div != undefined) {
    img_div.innerHTML =
      "<img src=" + image_array[image_index] + " width='500' height='380' />";
  }
}
