let start = 0, end = 3, buffer = [];
let key = "open";
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
    document.querySelector('.input-field').style.display = 'block';
  } else {
    document.querySelector(".input-field").style.display = 'none';
  }
});

// calling the api
window.onload = () => {
  // the formal url https://picsum.photos/v2/list?limit=30
  fetch('https://api.unsplash.com/photos/?client_id=fdf429cca1201279179e94e631ceaf652780d35275fec51707aaeca1a23e0f0f')
  .then(response => {
    return response.json();
  })
  .then(arrayOfObjects => {
    buffer.push(...arrayOfObjects);
    displayImages(buffer, start, end);
    // displayImages(arrayOfObjects);
    console.log(arrayOfObjects)
  })
  .catch(err => {
    document.querySelector('.loader').style.display = 'block';
    console.log(err)
  });
};

// displayImages();
function displayImages(buffer, start, end) {
  if(buffer.length === 0){
     document.querySelector('.loader').style.display = 'none';
    //  document.querySelector('.more').style.display = 'block'
  }
    let shortArray = buffer.splice(start, end);
    shortArray.map(obj => {
      let {urls, id,} = obj;
      document.getElementById('display').innerHTML += `
            <div id="${id}" class="col-lg-4 col-md-5 col-sm-12 display">
              <img  alt="FreepiK image" src="images/Double Ring-1s-200px.gif" data-lazy="${urls.thumb}" class="lazy-loading" data-toggle="modal" data-target="#exampleModalCenter" onclick="myFunction(this);">
            </div>
          `;
          // <p class="text-red author">${alt_description}</p>
    });
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
        img.setAttribute('src', src);
        img.classList.add('fadeIn');
        observer.disconnect(entry.target);
      }
    });
  });
  obs.observe(target);
}

// // infinit scroller
window.addEventListener("scroll", function () {
  if ($("#display")[0].scrollHeight - $("#display")[0].scrollTop === $("#display")[0].clientHeight) {
      displayImages(buffer, start, end);
    }
});

// view image
function myFunction(imgs) {
  let image_text = document.querySelector('.modal-title')
  image_text.innerHTML = imgs.alt;
  let expandImg = document.getElementById('expandedImg');
  expandImg.src = imgs.src;
  expandImg.parentElement.style.display = "block";
}