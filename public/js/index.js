let start = 0;

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

// calling the api
let url = 'https://api.unsplash.com/photos?';
let key = 'client_id=fdf429cca1201279179e94e631ceaf652780d35275fec51707aaeca1a23e0f0f'
let page = 1;
function loadImage(page){
  fetch(`${url}&per_page=500&${key}&page=` + page,)
  .then(response => {
    return response.json();
  })
  .then(arrayOfObjects => {
    if (!arrayOfObjects.length) {
      document.getElementById('loader').style.display = 'block';
      return;
    }
    arrayOfObjects.forEach(obj => {
      let {urls, id, alt_description} = obj;
      document.getElementById('display').innerHTML += `
        <div id="${id}" class="col-lg-4 col-md-5 col-sm-12 display">
          <img  alt="FreepiK image" data-lazy="${urls.thumb}" class="lazy-loading" data-toggle="modal" data-target="#exampleModalCenter" onclick="myFunction(this);">
          <p>${alt_description}</p>
        </div>
      `;
      // Sets an observer for each image
      lazyTargets = document.querySelectorAll('.lazy-loading');
      lazyTargets.forEach(lazyLoad);
    });
    console.log(arrayOfObjects);
  })
  .catch(err => {
    console.log(err)
  });
};

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
  let image_text = document.querySelector('.modal-title')
  image_text.innerHTML = imgs.alt;
  let expandImg = document.getElementById('expandedImg');
  expandImg.src = imgs.src;
  expandImg.parentElement.style.display = "block";
}

//infinit scroller
window.addEventListener("scroll", function () {
  if ($("#display")[0].scrollHeight - $("#display")[0].scrollTop === $("#display")[0].clientHeight) {
      loadImage()
    }else{
      console.log('rrrrrrrr')
    }
});

