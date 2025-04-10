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
  } // === Hero Name Typing Animation with Responsive Stacking ===
  const heroLine1 = document.getElementById("hero-line1");
  const heroLine2 = document.getElementById("hero-line2");

  const line1Text = "HI, I'M ";
  const line2Text = "KAYLA LUGO";
  let i = 0;
  let j = 0;
  const speed = 100;

  function typeLine1() {
    if (i < line1Text.length) {
      heroLine1.innerHTML = line1Text.substring(0, i + 1);
      i++;
      setTimeout(typeLine1, speed);
    } else {
      setTimeout(typeLine2, speed);
    }
  }

  function typeLine2() {
    if (j < line2Text.length) {
      heroLine2.innerHTML = line2Text.substring(0, j + 1);
      j++;
      setTimeout(typeLine2, speed);
    }
  }

  if (heroLine1 && heroLine2) {
    typeLine1();
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
