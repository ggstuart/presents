
const queryString = location.search;
console.log(queryString);

const regex = /(?<user>[\w]+)_(?<repo>[\S]+)_(?<file>[\S]+)/g;
const match = regex.exec(queryString);
console.log(match.groups);

const url = `https://raw.githubusercontent.com/${match.groups.user}/${match.groups.repo}/master/${match.groups.file}.md`;
console.log(url);

const slides = document.querySelector(".slides");
slides.innerHTML = `
<section data-markdown="${url}"
         data-separator-vertical="^\n\n"
         data-separator-notes="^Note:"
         data-charset="iso-8859-15">
</section>
`;

const title = document.querySelector("title");
title.innerHTML = `${match.groups.repo} ${match.groups.file}`;
