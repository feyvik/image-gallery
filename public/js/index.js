let start = 0, end = 10, arrayOfObjects = [];

// nav
window.addEventListener("scroll", function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector('nav').classList.add("black");
  } else {
    document.querySelector("nav").classList.remove("black");
  }
});

// input on the nav
const getHeight = element => {
  let offset = getComputedStyle(element).getPropertyValue("height").split("");
  offset.splice(offset.length - 2, 2);
  return Number(offset.join(''));
}
let offset = `${getHeight(document.querySelector(".upper")) + getHeight(document.querySelector(".nav-up"))}`;
window.addEventListener("scroll", function () {
  if (document.body.scrollTop > offset || document.documentElement.scrollTop > offset) {
    document.querySelector('.input-container').style.display = 'block';
  } else {
    document.querySelector(".input-container").style.display = 'none';
  }
});

// calling the api
window.onload = () => {

  fetch('https://picsum.photos/v2/list?limit=30')
    .then(response => {
      return response.json();
    })
    .then(arrayOfObjects => {
      
      displayImages(arrayOfObjects, start, end);
      //  image.push(...myJson);
      //  loadImage()
    })
    .catch(err => {
      document.getElementById('display').innerHTML += `
          <div class="col-lg-3 col-md-3 col-sm-12 display border">
            <img src="" alt="" data-lazy="" class="lazy-loading">
            <p class="text-red author"></p>
          </div>
        `;
      console.log(err);
    });
};

// displayImages();
function displayImages(arrayOfObjects, start, end) {
  if (start == 30) return;
  let shortArray = arrayOfObjects.splice(start, end);
  shortArray.map(obj => {
    let { author, download_url, id } = obj;
    document.getElementById('display').innerHTML += `
          <div id="${id}" class="col-lg-3 col-md-3 col-sm-12 display border">
            <img src="${download_url}" alt="" data-lazy="" class="lazy-loading">
            <p class="text-red author">${author}</p>
          </div>
        `;

    start = start + 10;
    end = end + 10;
  })
  // Sets an observer for each image
  lazyTargets = document.querySelectorAll('.lazy-loading');
  lazyTargets.forEach(lazyLoad);
}

function lazyLoad(target) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');

        img.getAttribute('src', src);
        img.classList.add('fadeIn');

        observer.disconnect();
      }
    });
  });
  obs.observe(target);
}
