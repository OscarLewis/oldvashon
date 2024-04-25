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
  image_attribution_id: string
) {
  let img_urls: string[] = [];
  let img_attributions: string[] = [];
  images.forEach(
    (el: {
      image_url: string;
      image_attribution: string;
      image_descrip: string;
      feature_id: number;
      image_id: number;
    }) => {
      img_urls.push(el.image_url);
      img_attributions.push(el.image_attribution);
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
    if (img_urls.length > 1) {
      let images_index = 0;
      let images_length = img_urls.length;

      // Draw the initial image
      drawImage(img_urls, images_index, image_element_id, img_attributions);

      // check if everything is created

      // If current image is at beggining of the array, disable the 'previous' button
      if (images_index == 0) {
        prev_image_btn.classList.add("image-deactive");
      }

      prev_image_btn.addEventListener("click", function (_e) {
        // draw the previous image
        if (images_index > 0) {
          drawImage(
            img_urls,
            images_index - 1,
            image_element_id,
            img_attributions
          );
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
          drawImage(
            img_urls,
            images_index + 1,
            image_element_id,
            img_attributions
          );
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
      next_image_btn.classList.add("invisible");
      prev_image_btn.classList.add("invisible");
      drawImage(img_urls, 0, image_element_id, img_attributions);
    }
  } else {
    console.log("Missing next and previous button elements!");
  }

  // Set SRC of image_element to image at the past-in index of the past-in array
  async function drawImage(
    image_array: string[],
    image_index: number,
    image_element: string,
    img_attribution_array: string[]
  ) {
    let attribution_div = document.getElementById(image_attribution_id);
    let img_div = <HTMLImageElement>document.getElementById(image_element);
    if (img_div != null && img_div != undefined) {
      img_div.src = image_array[image_index];
    }
    if (attribution_div != null && attribution_div != undefined) {
      attribution_div.innerHTML = await marked(
        img_attribution_array[image_index]
      );
    }
  }
}
