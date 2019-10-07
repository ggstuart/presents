
const queryString = location.search;
// console.log(queryString);

const regex = /(?<user>[\w]+)\/(?<repo>[\S]+)\/(?<file>[\S]+)/g;
const match = regex.exec(queryString);

const url = `https://raw.githubusercontent.com/${match.groups.user}/${match.groups.repo}/master/${match.groups.file}.md`;
// console.log(url);

const slides = document.querySelector(".slides");
slides.innerHTML = `
<section data-markdown="${url}"
         data-separator-vertical="^\n\n"
         data-separator-notes="^Note:">
</section>
`;
