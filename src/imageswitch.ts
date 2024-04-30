import { marked } from "marked";

// Make all links target "_blank"
let renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  let link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace("<a", "<a target='_blank' ");
};

// Set new renderer options
marked.setOptions({
  renderer: renderer,
});

export function createImageSwitcher(
  images: any[],
  next_button_id: string,
  previous_button_id: string,
  image_element_id: string,
  image_attribution_id: string,
  image_description_id: string
) {
  let image_array: string[] = [];
  let img_attributions: string[] = [];
  let img_descrips: string[] = [];

  images.forEach(
    (el: {
      image_url: string;
      image_attribution: string;
      image_descrip: string;
      feature_id: number;
      image_id: number;
    }) => {
      image_array.push(el.image_url);
      img_attributions.push(el.image_attribution);
      img_descrips.push(el.image_descrip);
    }
  );

  // get elements for buttons
  let next_image_btn = document.getElementById(next_button_id);
  let prev_image_btn = document.getElementById(previous_button_id);

  if (
    prev_image_btn != null &&
    prev_image_btn != undefined &&
    next_image_btn != null &&
    next_image_btn != undefined
  ) {
    if (image_array.length > 1) {
      let images_index = 0;
      let images_length = image_array.length;

      // Draw the initial image
      drawImage(images_index);

      // check if everything is created

      // If current image is at beggining of the array, disable the 'previous' button
      if (images_index == 0) {
        prev_image_btn.classList.add("image-deactive");
      }

      prev_image_btn.addEventListener("click", function (_e) {
        // draw the previous image
        if (images_index > 0) {
          drawImage(images_index - 1);
          images_index -= 1;
          // disable the next image button if the current image is the last in the array
          if (
            images_index <= images_length - 1 &&
            next_image_btn.classList.contains("image-deactive")
          ) {
            next_image_btn.classList.remove("image-deactive");
          }
        }
        // disable the previous image button if current image is at the start of the array
        if (images_index == 0) {
          prev_image_btn.classList.add("image-deactive");
        }
      });

      next_image_btn.addEventListener("click", function (_e) {
        // draw the next image
        if (images_index < images_length - 1) {
          drawImage(images_index + 1);
          images_index += 1;
        }
        // if current image is the last in the array then disbale the 'next' button
        if (images_index == images_length - 1) {
          next_image_btn.classList.add("image-deactive");
        }
        if (
          // enable the previous button if current image is not the first image in the array
          images_index > 0 &&
          prev_image_btn.classList.contains("image-deactive")
        ) {
          prev_image_btn.classList.remove("image-deactive");
        }
      });
    } else {
      next_image_btn.classList.add("hidden");
      prev_image_btn.classList.add("hidden");
      drawImage(0);
    }
  } else {
    console.log("Missing next and previous button elements!");
  }

  // Set SRC of image_element to image at the past-in index of the past-in array
  async function drawImage(image_index: number) {
    let attribution_div = document.getElementById(image_attribution_id);
    let description_div = document.getElementById(image_description_id);
    let img_div = <HTMLImageElement>document.getElementById(image_element_id);
    if (img_div != null && img_div != undefined) {
      img_div.src = image_array[image_index];
    }
    if (attribution_div != null && attribution_div != undefined) {
      attribution_div.innerHTML = await marked(img_attributions[image_index]);
    }
    if (description_div != null && description_div != undefined) {
      description_div.innerHTML = await marked(img_descrips[image_index]);
    }
  }
}
