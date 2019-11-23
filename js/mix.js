
let queryString = location.search;
console.log(queryString);
// console.log(location);

if (location.search.includes("%2F")) {
  queryString = queryString.replace("%2F", "/");
  console.log("cleaned", queryString);
  history.pushState('', '', queryString);
}

const rgx = /([a-zA-Z\-0-9\/]+)/g;
// const regex = /(?<user>[\w]+)_(?<repo>[\S]+)_(?<file>[\S]+)/g;
// const match = regex.exec(queryString);
const match = queryString.match(rgx);
console.log("match", match);

if(match.length == 3) {
  const url = `https://raw.githubusercontent.com/${match[0]}/${match[1]}/master/${match[2]}.md`;
  // console.log(url);

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

if(match.length == 4 && match[3] == "mix") {
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

function getURLs(text) {
  console.log(text);
  let fileNames = text.split("\n"); 
  console.log(fileNames);

  fileNames.forEach(f => {
    let name = f.slice(2).trim();
    console.log(name);

    const url = `https://raw.githubusercontent.com/daveeveritt/tech3015/master/${name}.md`;
    console.log(url);

    const slides = document.querySelector(".slides");
    slides.innerHTML += `
    <section data-markdown="${url}"
            data-separator-vertical="^\n\n"
            data-separator-notes="^Note:"
            data-charset="utf-8">
    </section>
    `;

  });

}