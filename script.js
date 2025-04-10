document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for nav links
  document.querySelectorAll(".nav-links a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });

  // Scroll-to-Top Arrow
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Typing Effect - about
  const headingText = "HI, I'M KAYLA LUGO";
  let j = 0;
  const newspeed = 100; // Typing speed in ms
  const heroTypingElement = document.getElementById("hero-typing");

  function typeHeading() {
    if (j < headingText.length) {
      heroTypingElement.innerHTML = headingText.substring(0, j + 1); // Types without pushing
      j++;
      setTimeout(typeHeading, newspeed);
    }
  }

  // Start typing effect if element exists
  if (heroTypingElement) {
    typeHeading();
  }

  // Typing Effect - Runs When Page Loads
  const text = 'print("I love cybersecurity!")';
  let i = 0;
  const speed = 100; // Typing speed in ms
  const typingElement = document.getElementById("typing-text");

  function typeEffect() {
    if (i < text.length) {
      typingElement.innerHTML = text.substring(0, i + 1); // Updates text without extra cursor
      i++;
      setTimeout(typeEffect, speed);
    }
  }

  // Only start typing if element exists
  if (typingElement) {
    typeEffect();
  }
});
