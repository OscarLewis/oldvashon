import "../src/style.css";
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

// Render markdown in the div
async function renderMD() {
  // Get the about_markdown div
  let about_markdown_div = document.getElementById("about-markdown");
  if (about_markdown_div != null) {
    let content = await getAboutMD();
    about_markdown_div.innerHTML = content;
  }
}

async function getAboutMD(): Promise<string> {
  return await fetch("/about.md")
    .then((response) => response.text())
    .then((result) => {
      return marked.parse(result);
    });
}

renderMD();
