import { marked } from "marked";
import type { FeatureLike } from "ol/Feature";

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
export function popupContents(feature: FeatureLike): string {
  let popupDiv = document.querySelector(".ol-popup");
  let popupContent = "<div>";
  // Name
  if (feature.get("name") != null && feature.get("name") != undefined) {
    const name_div =
      "<div class='flex'><p class='text-lg mx-auto'>" +
      feature.get("name") +
      "</p></div>";
    popupContent += name_div;
  }

  //   popupContent += "<div class='flex flex-row'>";

  // Image
  if (feature.get("img_url") != null && feature.get("img_url") != undefined) {
    popupDiv?.classList.remove("ol-popup-min-width");
    popupDiv?.classList.add("min-w-[400px]");
    popupContent += "<img class='h-[200px] mt-2 mx-auto' src='";
    popupContent += feature.get("img_url");
    popupContent += "'";
    popupContent += " >";

    if (
      feature.get("img_attribution") != null &&
      feature.get("img_attribution") != undefined
    ) {
      popupContent +=
        "<div class='flex'><p class='text-xs mx-auto align-top mb-1'>Image: " +
        feature.get("img_attribution") +
        "</p></div>";
    }
  } else {
    if (!popupDiv?.classList.contains("ol-popup-min-width")) {
      popupDiv?.classList.add("ol-popup-min-width");
    }
  }

  // History
  if (feature.get("history") != null && feature.get("history") != undefined) {
    popupContent += "<div class='markdown text-sm markdownlinkcolor'>";
    popupContent += marked(feature.get("history"));
    popupContent += "</div>";
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

  //   popupContent += "</div>";

  // Author
  //   if (feature.get("author") != null) {
  //     popupContent +=
  //       "<p class='text-sm'>" + "Author: " + feature.get("author") + "</p>";
  //   }

  popupContent += "</div>";
  return popupContent;
}
