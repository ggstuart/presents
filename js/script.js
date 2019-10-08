
const queryString = location.search;
console.log(queryString);
// console.log(location);

const rgx = /([a-zA-Z\-0-9]+)/g;
// const regex = /(?<user>[\w]+)_(?<repo>[\S]+)_(?<file>[\S]+)/g;
// const match = regex.exec(queryString);
const match = queryString.match(rgx);
// console.log(match);
console.log(match);

if(match) {

  // let fullname = match.groups.file;
  // console.log(fullname);
  // fullname.contains("print-pdf") ? fullname.slice()

  // const url = `https://raw.githubusercontent.com/${match.groups.user}/${match.groups.repo}/master/${match.groups.file}.md`;
  const url = `https://raw.githubusercontent.com/${match[0]}/${match[1]}/master/${match[2]}.md`;
  // console.log(url);

  const slides = document.querySelector(".slides");
  slides.innerHTML = `
  <section data-markdown="${url}"
          data-separator-vertical="^\n\n"
          data-separator-notes="^Note:"
          data-charset="iso-8859-15">
  </section>
  `;

  const title = document.querySelector("title");
  title.innerHTML = `${match[1]} ${match[2]}`;
}




// Printing and PDF exports


// let pr = document.getElementById("print");
// pr.addEventListener("click", () => {

//   console.log("print rdy");

//   let link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.href = 'css/print/pdf.css';  // 'css/print/paper.css'
//   document.getElementsByTagName('head')[0].appendChild(link);

// });




// // remove pdf if present
// if(match.groups.file.includes("_pdf")) {

//   console.log("yes print");


//   let link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.href = location.search.match(/pdf/gi) ? 
//               'css/print/pdf.css' : 
//               'css/print/paper.css';
//   document.getElementsByTagName('head')[0].appendChild(link);


  
// }
// else {
//   console.log("no print");
// }


