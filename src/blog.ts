import "../src/style.css";
import renderMD from "./rendermarkdown";
import blogTOC from "./markdown_files/blog-toc.md";
import blogMD from "./markdown_files/blog.md";

await renderMD(blogTOC, "blog-toc-markdown").then(() => {
  /* Since we changed the default of marked to use _blank as the link target
    we change every link to the Table of Contents to use _self*/
  const blogTOCDiv = document.getElementById("blog-toc-markdown");
  if (blogTOCDiv != null) {
    let blogTOCLinks = blogTOCDiv.getElementsByTagName("a");
    for (let i = 0; i < blogTOCLinks.length; i++) {
      blogTOCLinks[i].setAttribute("target", "_self");
    }
  }
});
renderMD(blogMD, "blog-markdown");
