"use strict";

let formElement = document.getElementById("registration-form");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};
  let form = event.target;
  let username = document.getElementById("username-field").value;
  if (username == "" || username.length < 5) {
    errors.username =
      "username cannot be empty and must be more then 5 characters";
  }
  let password1 = document.getElementById("password-field").value;
  let password2 = document.getElementById("password-field2").value;

  if (password1 == "") {
    errors.password = "password cannot be empty";
  }
  if (password1 !== password2) {
    errors.password = "passwords do not match";
  }
  let checkbox = document.getElementById("agree").checked;
  if (!checkbox) {
    errors.agree = "U must agree terms";
  }
  let age = false;
  form.querySelectorAll(".agee").forEach((element) => {
    if (element.checked) {
      age = true;
    }
  });
  if (!age) {
    errors.age = "please select your age";
  }
  console.log(errors);

  document.querySelectorAll(".error-text").forEach((element) => {
    element.innerText = " ";
  });
  for (const key in errors) {
    let errortext = document.getElementById("error-" + key);
    errortext.innerText = errors[key];
  }

  let errorArray = Object.keys(errors);
  if (errorArray.length == 0) {
    form.submit();
  }
});

let dataSlider = [
  {
    id: 1,
    imageUrl:
      "https://iso.500px.com/wp-content/uploads/2016/02/commuter_cover.jpg",
    title: "slider 1",
  },
  {
    id: 2,
    imageUrl:
      "https://iso.500px.com/wp-content/uploads/2016/02/stock-photo-138931519.jpg",
    title: "slider 2",
  },
  {
    id: 3,
    imageUrl:
      "https://iso.500px.com/wp-content/uploads/2016/02/stock-photo-138931289.jpg",
    title: "slider 3",
  },
  {
    id: 4,
    imageUrl:
      "https://iso.500px.com/wp-content/uploads/2016/02/10007510_465205043580004_1831639999_n.jpg",
    title: "slider 4",
  },
];
let sliderContent = document.querySelector(".slider-content");
let sliderWraper = document.querySelector(".slider-wraper");
let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");
let activeDot = document.getElementsByClassName("dot-child");

let sliderIndex = 0;

function createDiv() {
  let SliderDiv = document.createElement("div");
  return SliderDiv;
}
function createImage(item) {
  

  let bgimage = document.createElement("div");
  bgimage.style.backgroundImage = `url(${item.imageUrl})`;
  bgimage.classList.add("bgimage");

  return bgimage;
}
function createTitle(item) {
  let sliderTitle = document.createElement("h2");
  sliderTitle.innerText = `${item.title}`;
  return sliderTitle;
}
function createDots() {
  let parentDot = document.createElement("div");
  parentDot.classList.add("dot-parent");

  dataSlider.forEach((element) => {
    let dots = document.createElement("div");
    dots.classList.add("dot-child");
    dots.setAttribute("dot-id", `${element.id - 1}`);
    dots.addEventListener("click", function (event) {
      console.log(event.target);
      let dotId = event.target.getAttribute("dot-id");
      sliderIndex = dotId;
      slide();
    });
    parentDot.appendChild(dots);
  });

  return parentDot;
}

function slide() {
  sliderContent.innerHTML = " ";
  let divItem = createDiv();
  let imageItem = createImage(dataSlider[sliderIndex]);
  let titleItem = createTitle(dataSlider[sliderIndex]);
  let dotItem = createDots();

  divItem.appendChild(imageItem);
  divItem.appendChild(titleItem);
  sliderContent.appendChild(divItem);
  sliderContent.appendChild(dotItem);

  activeDot[sliderIndex].classList.add("activedot");
}

slide();

function clickleft() {
  if (sliderIndex == 0) {
    sliderIndex = dataSlider.length - 1;
    slide();
    return;
  }
  sliderIndex--;
  slide();
}
function rightclick() {
  if (sliderIndex == dataSlider.length - 1) {
    sliderIndex = 0;
    slide();
    return;
  }
  sliderIndex++;
  slide();
}
arrowLeft.addEventListener("click", clickleft);
arrowRight.addEventListener("click", rightclick);

setInterval(() => {
  rightclick();
}, 3000);