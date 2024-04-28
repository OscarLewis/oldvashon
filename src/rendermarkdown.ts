import { marked } from "marked";
import customHeadingId from "marked-custom-heading-id";

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

// Maybe use https://www.npmjs.com/package/marked-footnote

// https://www.npmjs.com/package/marked-custom-heading-id
// Use custom heading id's in marked in the format
// "# heading {#custom-id}" which marked will convert to
// <h1 id="custom-id">heading</h1>
marked.use(customHeadingId());

async function getMDFile(file_name: string): Promise<string> {
  return await fetch(file_name)
    .then((response) => response.text())
    .then((result) => {
      return marked.parse(result);
    });
}

// Render markdown in the div
export default async function renderMD(file_name: string, div_id: string) {
  // Get the about_markdown div
  let about_markdown_div = document.getElementById(div_id);
  if (about_markdown_div != null) {
    let content = await getMDFile(file_name);
    about_markdown_div.innerHTML = content;
  }
}
