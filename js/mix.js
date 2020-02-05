let params = new URLSearchParams(location.search);

const defaults = {
  'user': 'ggstuart',
  'repo': 'discourse-analysis',
  'file': 'presentation_example.md'
}

for (const property in defaults) {
  if(!params.has(property)) {
    params.set(property, defaults[property])
  }
}

const root = `https://raw.githubusercontent.com/wiki/${params.get("user")}/${params.get("repo")}`
const url = `${root}/${params.get("file")}`;

const slides = document.querySelector(".slides");

fetch(url).then(function(response) {
  return response.text();
}).then(function(text) {
  text.startsWith("# Contents") ? loadMultiple(text) : loadSingle(params.get("file"), url);
  delayed_init();
}).catch(function(err) {
  console.log("Fetch Error: ", err);
});


function loadSingle(title, path) {
  slides.appendChild(markdownSection(path))
  document.querySelector("title").innerHTML = `${title} CTEC3905`;
}

function loadMultiple(text) {
  let lines = text.trim().split("\n").slice(1);
  lines.forEach(line => {
    let details = line.trim().split(" ");
    const url = `${root}/${details[0]}.md`;
    slides.appendChild(markdownSection(url))
  });
  document.querySelector("title").innerHTML = "CTEC3905";
}

function markdownSection(path) {
  const section = document.createElement("section");
  section.setAttribute("data-markdown", path);
  section.setAttribute("data-separator", "^===");
  section.setAttribute("data-separator-vertical", "^---");
  section.setAttribute("data-separator-notes", "^Note:");
  section.setAttribute("data-charset", "utf-8");
  return section;
}
