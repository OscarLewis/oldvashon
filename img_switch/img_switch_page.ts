import "../src/style.css";
import { get_images_table } from "../src/images";
import { createImageSwitcher } from "../src/imageswitch";

// Get movie magic images from db
let images = await get_images_table(1);

console.log("movie magic images from images table in sqlite file:");
console.log(images);

let image_urls: string[] = [];

images.forEach(
  (el: {
    image_url: string;
    image_attribution: string;
    image_descrip: string;
    feature_id: number;
    image_id: number;
  }) => {
    image_urls.push(el.image_url);
  }
);

createImageSwitcher(
  images,
  "next-image",
  "previous-image",
  "image-element",
  "image-attribution"
);

let images_that_do_not_exist = await get_images_table(2);

console.log(images_that_do_not_exist.length == 0);
