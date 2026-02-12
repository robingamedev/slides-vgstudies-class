import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";
import "./style.css";

import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";

// Import markdown content directly using Vite's raw import
import slidesContent from "./content/slides.md?raw";

// Process 2-col and 3-col syntax
// Replaces "--- 2-col" with "--- \n<!-- .slide: class="two-col" -->"
const processedMarkdown = slidesContent
  .replace(/^---\s+2-col/gm, '---\n<!-- .slide: class="two-col" -->\n')
  .replace(/^---\s+3-col/gm, '---\n<!-- .slide: class="three-col" -->\n');

// Inject content into the section
const section = document.querySelector(".slides section");
if (section) {
  section.setAttribute('data-markdown', '');
  section.setAttribute('data-separator', '^\\r?\\n---\\r?\\n$');
  section.setAttribute('data-separator-vertical', '^\\r?\\n--\\r?\\n$');
  
  section.innerHTML = `
    <textarea data-template>
      ${processedMarkdown}
    </textarea>
  `;
}

// Initialize Reveal
Reveal.initialize({
  hash: true,
  plugins: [Markdown, Highlight, Notes],
});
