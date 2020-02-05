let queryString = location.search;

if (location.search.includes("%2F")) {
  queryString = queryString.replace("%2F", "/");
  history.pushState('', '', queryString);
}

const rgx = /([a-zA-Z\-0-9\/]+)/g;
const match = queryString.match(rgx);
const slides = document.querySelector(".slides");

const url = (match === null) ? 'test.md' : `https://raw.githubusercontent.com/CTEC3905/lectures/master/${match[0]}.md`;
const title = (match === null) ? 'test file' : match[0];

if (match === null) {
  loadSingle('test file', 'test.md');
  delayed_init();  // run default presentation from index.html
} else {
  fetch(url).then(function(response) {
    return response.text();
  }).then(function(text) {
    text.startsWith("# Contents") ? loadMultiple(text) : loadSingle(match[0], url);
    delayed_init();
  }).catch(function(err) {
    console.log("Fetch Error: ", err);
  });
}

function loadSingle(title, path) {
  slides.appendChild(markdownSection(path))
  document.querySelector("title").innerHTML = `${title} CTEC3905`;
}

function loadMultiple(text) {
  let lines = text.trim().split("\n").splice(2);
  lines.forEach(line => {
    let cleanedLine = line.trim();
    let details = cleanedLine.split(" ");
    const url = `https://raw.githubusercontent.com/CTEC3905/lectures/master/${details[0]}.md`;
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
