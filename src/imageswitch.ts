export function createImageSwitcher(
  img_urls: string[],
  next_button_id: string,
  previous_button_id: string,
  image_element_id: string
) {
  if (img_urls.length > 0) {
    let images_index = 0;
    let images_length = img_urls.length;

    drawImage(img_urls, images_index, image_element_id);
    let next_image_btn = document.getElementById(next_button_id);
    let prev_image_btn = document.getElementById(previous_button_id);

    if (
      prev_image_btn != null &&
      prev_image_btn != undefined &&
      next_image_btn != null &&
      next_image_btn != undefined
    ) {
      if (images_index == 0) {
        prev_image_btn.classList.add("image-deactive");
      }
      prev_image_btn.addEventListener("click", function (_e) {
        if (images_index > 0) {
          drawImage(img_urls, images_index - 1, image_element_id);
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

      next_image_btn.addEventListener("click", function (_e) {
        if (images_index < images_length - 1) {
          drawImage(img_urls, images_index + 1, image_element_id);
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

  // Set SRC of image_element to current image
  function drawImage(
    image_array: string[],
    image_index: number,
    image_element: string
  ) {
    let img_div = <HTMLImageElement>document.getElementById(image_element);
    if (img_div != null && img_div != undefined) {
      img_div.src = image_array[image_index];
    }
  }
}
