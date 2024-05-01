import "../src/style.css";
import renderMD from "./rendermarkdown";
import blogTOC from "./markdown_files/blog-toc.md";
import blogMD from "./markdown_files/blog.md";

renderMD(blogTOC, "blog-toc-markdown");
renderMD(blogMD, "blog-markdown");
