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
