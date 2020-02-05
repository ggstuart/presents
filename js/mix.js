let repo = "https://raw.githubusercontent.com/ggstuart/discourse-analysis.wiki/master"

let queryString = location.search;

if (location.search.includes("%2F")) {
  queryString = queryString.replace("%2F", "/");
  history.pushState('', '', queryString);
}

const rgx = /([a-zA-Z\-0-9\/]+)/g;
const match = queryString.match(rgx);
const slides = document.querySelector(".slides");

const url = (match === null) ? 'test.md' : `${repo}/${match[0]}.md`;
const title = (match === null) ? 'test file' : match[0];

fetch(url).then(function(response) {
  return response.text();
}).then(function(text) {
  text.startsWith("# Contents") ? loadMultiple(text) : loadSingle(title, url);
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
    console.log(details);
    const url = `https://raw.githubusercontent.com/${details[0]}/${details[1]}/master/${details[2]}.md`;
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
