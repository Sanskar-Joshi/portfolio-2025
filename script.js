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

// CONTACT FORM TO GOOGLE SHEETS

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzAhYULbLdVdDHw_LCHJjahQ4xnE-Itl40XyZl1rbr8Wo9EObCOF7ccmWjj2BnH4BpdqQ/exec";

const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

// Function to trigger the Toast
function launchToast(message, isError = false) {
  const toast = document.getElementById("toast");
  const desc = document.getElementById("desc");
  const imgIcon = document.querySelector("#toast #img i");

  // Set message text
  desc.innerText = message;

  // Change styling based on success or error
  if (isError) {
    toast.style.borderLeft = "5px solid red";
    imgIcon.className = "bx bxs-error-circle";
    imgIcon.style.color = "red";
  } else {
    toast.style.borderLeft = "5px solid #61b752";
    imgIcon.className = "bx bxs-check-circle";
    imgIcon.style.color = "#61b752";
  }

  // Add class to show the toast
  toast.className = "show";

  // Remove the class after 5 seconds (must match CSS animation time)
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 5000);
}

if (form) {
  //Check if form exists to prevent errors on other pages
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Show loading state
    const submitBtn = form.querySelector("button");
    const originalText = submitBtn.innerText;
    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = "true";

    // Sending data to Google Sheets
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        // Trigger Success Toast
        launchToast("Message sent successfully! ✅");

        // Reset Form
        form.reset();

        // Reset Button
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      })
      .catch((error) => {
        // Error Handling
        console.error("Error!", error.message);

        // Trigger Error Toast
        launchToast("Error! Please check internet.", true);

        // Reset Button
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      });
  });
}
