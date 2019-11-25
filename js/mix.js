
let queryString = location.search;

if (location.search.includes("%2F")) {
  queryString = queryString.replace("%2F", "/");
  history.pushState('', '', queryString);
}

const rgx = /([a-zA-Z\-0-9\/]+)/g;
const match = queryString.match(rgx);
// console.log(match);

if (match === null) {
  delayed_init();  // run default presentation from index.html
} else {
  const url = `https://raw.githubusercontent.com/${match[0]}/${match[1]}/master/${match[2]}.md`;

  fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      text.startsWith("# Contents") ? loadMultiple(text) : loadSingle();
      delayed_init();
    })
    .catch(function(err) {
      console.log("Fetch Error: ", err);
    });
}

function loadSingle() {
  const url = `https://raw.githubusercontent.com/${match[0]}/${match[1]}/master/${match[2]}.md`;
  const slides = document.querySelector(".slides");
  slides.innerHTML = `
    <section data-markdown="${url}"
            data-separator-vertical="^\n\n"
            data-separator-notes="^Note:"
            data-charset="utf-8">
    </section>
  `;
  const title = document.querySelector("title");
  title.innerHTML = `${match[1]} ${match[2]}`;
}


function loadMultiple(text) {
  let lines = text.trim().split("\n").splice(2); 
  const slides = document.querySelector(".slides");
  slides.innerHTML = "";  // remove default presentation
  lines.forEach(line => {
    let cleanedLine = line.trim();
    let details = cleanedLine.split(" ");
    const url = `https://raw.githubusercontent.com/${details[0]}/${details[1]}/master/${details[2]}.md`;
    slides.innerHTML += `
      <section data-markdown="${url}"
              data-separator-vertical="^\n\n"
              data-separator-notes="^Note:"
              data-charset="utf-8">
      </section>
    `;
  });
}
