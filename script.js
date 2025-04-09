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

  // Typing Effect - hero
  const headingText = "HI, I'M KAYLA LUGO";
  let j = 0;
  const newspeed = 100;
  const heroTypingElement = document.getElementById("hero-typing");

  function typeHeading() {
    if (j < headingText.length) {
      heroTypingElement.innerHTML = headingText.substring(0, j + 1);
      j++;
      setTimeout(typeHeading, newspeed);
    }
  }

  if (heroTypingElement) {
    typeHeading();
  }

  // Typing Effect - about section
  const text = 'print("I love cybersecurity!")';
  let i = 0;
  const speed = 100;
  const typingElement = document.getElementById("typing-text");

  function typeEffect() {
    if (i < text.length) {
      typingElement.innerHTML = text.substring(0, i + 1);
      i++;
      setTimeout(typeEffect, speed);
    }
  }

  if (typingElement) {
    typeEffect();
  }

  // Poll Logic
  const pollContainer = document.getElementById("poll-options");

  if (pollContainer) {
    const pollData = [
      { label: "Coffee ☕", votes: 4 },
      { label: "Boba 🧋", votes: 3 },
      { label: "Energy Drinks ⚡", votes: 2 },
      { label: "Pure Spite 😤", votes: 1 },
    ];

    const savedVotes = JSON.parse(localStorage.getItem("pollVotes"));
    if (savedVotes) {
      pollData.forEach((option, index) => {
        option.votes = savedVotes[index].votes;
      });
    }

    const userVote = localStorage.getItem("userVote");

    function renderPoll() {
      pollContainer.innerHTML = "";
      const totalVotes = pollData.reduce(
        (acc, option) => acc + option.votes,
        0
      );

      pollData.forEach((option, index) => {
        const percentage =
          totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        const isSelected = userVote == index;

        const optionElement = document.createElement("div");
        optionElement.className = `poll-option ${isSelected ? "selected" : ""}`;
        optionElement.innerHTML = `
          <label>
            <input type="radio" name="vote" ${isSelected ? "checked" : ""} ${
          userVote !== null ? "disabled" : ""
        } />
            ${option.label}
          </label>
          <div class="bar"><div class="fill" style="width: ${percentage}%"></div></div>
          <span class="percentage">${percentage}%</span>
        `;

        const radioInput = optionElement.querySelector("input");
        radioInput.addEventListener("click", () => {
          if (userVote === null) {
            pollData[index].votes++;
            localStorage.setItem("pollVotes", JSON.stringify(pollData));
            localStorage.setItem("userVote", index);
            renderPoll();
          }
        });

        pollContainer.appendChild(optionElement);
      });
    }

    renderPoll();
  }

  // === Popup Logic ===
  const popup = document.getElementById("popup");
  const popupClose = document.getElementById("popupClose");

  // Show popup after 3 seconds
  setTimeout(() => {
    if (popup) {
      popup.style.display = "block";
    }
  }, 3000);

  // Close popup on click
  if (popupClose) {
    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
});
