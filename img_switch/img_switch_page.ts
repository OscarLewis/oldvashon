import "../src/style.css";
import { get_images_table } from "../src/images";
import { createImageSwitcher } from "../src/imageswitch";

// Get movie magic images from db
let images = await get_images_table(1);

createImageSwitcher(
  images,
  "next-image",
  "previous-image",
  "image-element",
  "image-attribution",
  "image-description"
);
