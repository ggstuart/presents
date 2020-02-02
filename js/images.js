"use strict";



function handleImagePaths() {

  const images = document.querySelectorAll(".slides img");

  images.forEach(image => {
    // const name = image.attributes.src.value.slice(7);
    const name = image.attributes.src.value;
    // console.log(name);
    image.src = `https://raw.githubusercontent.com/front-end-materials/images/master/${name}`;
  });

}