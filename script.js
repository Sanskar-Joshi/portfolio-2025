const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

// TOGGLE MENU
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

// SCROLL SPY & STICKY HEADER
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // CLOSE MENU ON SCROLL
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// RESUME SECTION TABS
const resumeBtns = document.querySelectorAll(".resume-btn");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");

    // REMOVE ACTIVE FROM ALL BUTTONS
    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    // ADD ACTIVE TO CLICKED BUTTON
    btn.classList.add("active");

    // REMOVE ACTIVE FROM ALL DETAILS
    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    // ADD ACTIVE TO THE CORRESPONDING DETAIL (based on Index)
    resumeDetails[idx].classList.add("active");
  });
});

// PROJECT CAROUSEL
const arrowRight = document.querySelector(
  ".project-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".project-box .navigation .arrow-left"
);
let index = 0;

const projectDetails = document.querySelectorAll(".project-detail");
const totalProjectItems = projectDetails.length;
const imgSlide = document.querySelector(".project-carousel .img-slide");

const activeProject = () => {
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  projectDetails.forEach((detail) => {
    detail.classList.remove("active");
  });
  projectDetails[index].classList.add("active");
};

arrowRight.addEventListener("click", () => {
  if (index < totalProjectItems - 1) {
    index++;
    arrowLeft.classList.remove("disabled");
  }

  if (index === totalProjectItems - 1) {
    arrowRight.classList.add("disabled");
  }
  activeProject();
});

arrowLeft.addEventListener("click", () => {
  if (index > 0) {
    index--;
    arrowRight.classList.remove("disabled");
  }

  if (index === 0) {
    arrowLeft.classList.add("disabled");
  }
  activeProject();
});

// SERVICES HOVER EFFECT
const serviceBoxes = document.querySelectorAll(".services-box");

serviceBoxes.forEach((box) => {
  box.onmousemove = function (e) {
    let x = e.pageX - box.offsetLeft;
    let y = e.pageY - box.offsetTop;

    box.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(124, 240, 61, 0.15), var(--second-bg-color))`;
  };

  box.onmouseleave = function () {
    box.style.background = "";
  };
});
