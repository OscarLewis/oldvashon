import { marked } from "marked";
import type { FeatureLike } from "ol/Feature";

export function popupContents(feature: FeatureLike): string {
  let popupContent = "<div>";
  // Name
  if (feature.get("name") != null) {
    popupContent += "<p class='text-xl'>" + feature.get("name") + "</p>";
  }

  // Author
  if (feature.get("author") != null) {
    popupContent +=
      "<p class='text-sm'>" + "Author: " + feature.get("author") + "</p>";
  }

  // History
  if (feature.get("history") != null) {
    popupContent += "<div class='markdown text-sm'>";
    popupContent += marked(feature.get("history"));
    popupContent += "</div>";
  }

  popupContent += "</div>";
  return popupContent;
}
