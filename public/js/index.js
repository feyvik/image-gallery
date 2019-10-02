
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
      // document.getElementById('display_big').style.display = "none";
      let { urls, id, alt_description, color, user} = obj;
      document.getElementById('display').innerHTML += `
        <div id="${id}" class="display">
          <p>${user.username}</p>
          <img  alt="${alt_description}" data-image="${user.profile_image.small}" data-full="${urls.full}" data-lazy="${urls.small}" data-toggle="modal" data-target=".bd-example-modal-xl" style="background-color:${color}; font-size:12px;" onclick="myFunction(this)"
           class="lazy-loading">
           <p>${user.name}</p>
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
  let images = document.querySelector('.user')
  images.src = imgs.dataset.image;
  let x = event.target;
  let name = document.querySelector('.name')
  name.innerHTML = x.nextElementSibling.innerHTML;
  let e = event.target;
  let username  = document.querySelector('.username')
  username.innerHTML = e.previousElementSibling.innerHTML;
  let image_text = document.querySelector('.numbertext')
  image_text.innerHTML = imgs.alt;
  let expandImg = document.getElementById('expandedImg');
  expandImg.src = imgs.dataset.full;
  expandImg.parentElement.style.display = "block";
}

// download image 
function getImage(a) {
  let srcs = document.getElementById('expandedImg');
  var xhr = new XMLHttpRequest();
  xhr.open("GET", srcs.src, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = 'fileName.png';
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  }
  xhr.send();
}

window.addEventListener("scroll", function () {
  if (Number(document.documentElement.scrollTop) + Number(document.documentElement.clientHeight) - Number(document.body.clientHeight) >= -200) {
      document.querySelector('.loader').style.display = 'block';
      page += 1;
      loadImage();
    }
});
loadImage()
