document.addEventListener("DOMContentLoaded", function () {
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

  // === Scroll to Top Arrow Logic ===
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }

    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });

  // === Poll Logic ===
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

    function renderPoll() {
      const voted = localStorage.getItem("userVoted");
      const totalVotes = pollData.reduce((sum, opt) => sum + opt.votes, 0);
      pollContainer.innerHTML = "";

      pollData.forEach((option, index) => {
        const percent =
          totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        const isSelected = voted == index;

        const div = document.createElement("div");
        div.className = `poll-option ${isSelected ? "selected" : ""}`;
        div.innerHTML = `
          <label>
            <input type="radio" name="vote" ${isSelected ? "checked" : ""} ${
          voted ? "disabled" : ""
        } />
            ${option.label}
          </label>
          <div class="bar"><div class="fill" style="width: ${percent}%"></div></div>
          <span class="percentage">${percent}%</span>
        `;

        const radioInput = div.querySelector("input");
        radioInput.addEventListener("click", () => {
          if (!voted) {
            pollData[index].votes++;
            localStorage.setItem("pollVotes", JSON.stringify(pollData));
            localStorage.setItem("userVoted", index);
            renderPoll();
          }
        });

        pollContainer.appendChild(div);
      });

      // Lock voting + add thank-you note
      if (voted !== null) {
        const note = document.createElement("p");
        note.textContent = "You've already voted — thanks for your input!";
        note.style.fontSize = "14px";
        note.style.marginTop = "10px";
        note.style.color = "#54432e";
        pollContainer.appendChild(note);
      }
    }

    renderPoll();
  }

  // === Name Typing Animation ===
  const headingText = "HI, I'M KAYLA LUGO";
  let j = 0;
  const speed = 100;
  const heroTypingElement = document.getElementById("hero-typing");

  function typeHeading() {
    if (j < headingText.length) {
      heroTypingElement.innerHTML = headingText.substring(0, j + 1);
      j++;
      setTimeout(typeHeading, speed);
    }
  }

  if (heroTypingElement) {
    typeHeading();
  }

  // === About Section Typing Animation ===
  const aboutTypingText = 'print("I love cybersecurity!")';
  let k = 0;
  const aboutTypingElement = document.getElementById("typing-text");

  function typeAbout() {
    if (k < aboutTypingText.length) {
      aboutTypingElement.innerHTML = aboutTypingText.substring(0, k + 1);
      k++;
      setTimeout(typeAbout, 100);
    }
  }

  if (aboutTypingElement) {
    typeAbout();
  }
});
