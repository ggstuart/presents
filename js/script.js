
const queryString = location.search;
const regex = /(?<username>[\w]+)\/(?<repo>[\S]+)\/(?<file>[\S]+)/g;
const match = regex.exec(queryString);

const user = match[1];
const repo = match[2];
const file = match[3];

console.log(user);
console.log(repo);
console.log(file);

let url = `https://raw.githubusercontent.com/${user}/${repo}/master/${file}.md`;
console.log(url);


const slides = document.querySelector(".slides");
slides.innerHTML = `
<section data-markdown="${url}"
         data-separator-vertical="^\n\n"
         data-separator-notes="^Note:"
         data-charset="iso-8859-15">
</section>
`;
