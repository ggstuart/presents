
let queryString = location.search;

if (location.search.includes("%2F")) {
  queryString = queryString.replace("%2F", "/");
  history.pushState('', '', queryString);
}

const rgx = /([a-zA-Z\-0-9\/]+)/g;
const match = queryString.match(rgx);

if(match === null) {
  delayed_init();
} else {

  if(match.length === 3 || match.length === 4 && match[3] === "print-pdf") {
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
    delayed_init();
  } 

  if(match.length > 3 && match[3] === "mix") {
    const url = `https://raw.githubusercontent.com/${match[0]}/${match[1]}/master/${match[2]}.md`;

    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        getURLs(text);
      })
      .catch(function(err) {
        console.log('Fetch Error: ', err);
      });
  }
}

function getURLs(text) {
  let fileNames = text.split("\n"); 
  const slides = document.querySelector(".slides");
  slides.innerHTML = "";

  fileNames.forEach(f => {
    let all = f.trim();
    let details = all.split(" ");
    const url = `https://raw.githubusercontent.com/${details[0]}/${details[1]}/master/${details[2]}.md`;
    slides.innerHTML += `
    <section data-markdown="${url}"
            data-separator-vertical="^\n\n"
            data-separator-notes="^Note:"
            data-charset="utf-8">
    </section>
    `;
  });
  delayed_init();
}
