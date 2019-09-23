
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
let offset = `${getHeight(document.querySelector(".upper")) + getHeight(document.querySelector("nav"))}`;
window.addEventListener("scroll", function () {
  if (document.body.scrollTop > offset || document.documentElement.scrollTop > offset) {
    document.querySelector('.input-container').style.display = 'block';
  } else {
    document.querySelector(".input-container").style.display = 'none';
  }
});

let page = 1; 
// calling the api
function loadImage(){
  fetch(`https://api.unsplash.com/photos/?page=${page}&per_page=21&client_id=fdf429cca1201279179e94e631ceaf652780d35275fec51707aaeca1a23e0f0f`)
  .then(response => response.json())
  .then(arrayOfObjects => {
    arrayOfObjects.forEach(obj => {
      let { urls, id, alt_description, color } = obj;
      document.getElementById('display').innerHTML += `
        <div id="${id}" class="display">
          <img  alt="${alt_description}" data-lazy="${urls.thumb}"
           data-toggle="modal" data-target=".bd-example-modal-xl" 
           style="background-color:${color}; font-size:12px;" 
           class="lazy-loading" onclick="myFunction(this);">
        </div>
      `;
      // Sets an observer for each image
      lazyTargets = document.querySelectorAll('.lazy-loading');
      lazyTargets.forEach(lazyTarget => lazyLoad(lazyTarget));
    });
    console.log(arrayOfObjects);
  })
  .catch(err => {
    console.log(err)
  });
};
// loadImage();
// lazyLoad
function lazyLoad(target) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');
        img.setAttribute('src', src);
        img.classList.add('fadeIn');
        observer.disconnect(entry.target);
      }
    });
  });
  obs.observe(target);
}

// view image
function myFunction(imgs) {
  let image_text = document.querySelector('.imgtext')
  image_text.innerHTML = imgs.alt;
  let expandImg = document.getElementById('expandedImg');
  expandImg.src = imgs.src;
  expandImg.parentElement.style.display = "block";
}
 
 window.addEventListener("scroll", function () {
  if (Number(document.documentElement.scrollTop) + Number(document.documentElement.clientHeight) - Number(document.body.clientHeight) >= -200) {
      page += 1;
      document.querySelector('.loader').style.display = 'block'
      loadImage();
      document.querySelector('.loader').style.display = 'none'
    }
});
loadImage();
