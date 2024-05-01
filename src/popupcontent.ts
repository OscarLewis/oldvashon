import { marked } from "marked";
import type { FeatureLike } from "ol/Feature";
import { get_images_table } from "./images";

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

// Function that creates the contents for a popup on the map - returns a string
export async function popupContents(
  feature: FeatureLike
): Promise<[string, any[]]> {
  let popupDiv = document.querySelector(".ol-popup");
  let popupContent = "<div>";
  const images_db_array = await get_images_table(feature.get("feature_id"));
  if (popupDiv != null && popupDiv != undefined) {
    // Name
    if (feature.get("name") != null && feature.get("name") != undefined) {
      const name_div =
        "<div class='flex'><p class='text-lg mx-auto'>" +
        feature.get("name") +
        "</p></div>";
      popupContent += name_div;
    }

    // Image
    if (images_db_array.length > 0) {
      popupDiv.classList.remove("ol-popup-min-width");
      popupDiv.classList.add("min-w-[400px]");
      let image_div =
        "<div id='image-div' class='flex flex-col justify-center object-scale-down items-center'>";
      let img_element =
        "<img id='image-element' class='popup-image' width=380px height=380px' />";
      image_div += img_element + "</div>";
      let attr_div =
        "<div class='flex justify-between'>" +
        "<div id='image-description' class='markdownlinkcolor text-2xs'></div>" +
        "<div id='image-attribution' class='markdownlinkcolor text-2xs text-right'></div>" +
        "</div>";
      let button_div =
        "<div class='flex justify-center items-center my-1' onselectstart='return false'>" +
        "<div class='flex justify-between space-x-2 ml-[-1.32rem]'>" +
        "<button id='previous-image' class='image-active'>Previous</button>" +
        "<button id='next-image' class='image-active'>Next</button>" +
        "</div>" +
        "</div>";
      popupContent += image_div + attr_div + button_div;
    } else {
      if (!popupDiv.classList.contains("ol-popup-min-width")) {
        popupDiv.classList.add("ol-popup-min-width");
      }
    }

    // History
    if (feature.get("history") != null && feature.get("history") != undefined) {
      if (popupDiv.classList.contains("ol-popup-min-width")) {
        popupDiv.classList.remove("ol-popup-min-width");
        popupDiv.classList.add("min-w-[400px]");
      }
      popupContent += "<div class='markdown text-sm markdownlinkcolor'>";
      popupContent += marked(feature.get("history"));
      popupContent += "</div>";
    } else {
      if (!popupDiv.classList.contains("ol-popup-min-width")) {
        popupDiv.classList.add("ol-popup-min-width");
      }
    }
  }

  // Citations
  if (
    feature.get("citations") != null &&
    feature.get("citations") != undefined
  ) {
    const citations_div =
      "<hr class='blackline mt-2 mb-1'>" +
      "<div class='markdown text-xs markdownlinkcolor'>" +
      marked(feature.get("citations")) +
      "</div>";
    popupContent += citations_div;
  }

  // Last edited
  if (
    feature.get("last_edited") != null &&
    feature.get("last_edited") != undefined &&
    feature.get("history") != null &&
    feature.get("history") != undefined
  ) {
    let last_edited_div =
      "<div class='text-2xs'>" +
      "<p>Last edited: " +
      feature.get("last_edited");
    if (feature.get("author") != null && feature.get("author") != undefined) {
      last_edited_div += " by " + feature.get("author");
    }
    last_edited_div += "</div>";
    popupContent += last_edited_div;
  }

  //   popupContent += "</div>";

  // Author
  //   if (feature.get("author") != null) {
  //     popupContent +=
  //       "<p class='text-sm'>" + "Author: " + feature.get("author") + "</p>";
  //   }

  popupContent += "</div>";
  return [popupContent, images_db_array];
}
