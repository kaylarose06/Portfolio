document.addEventListener("DOMContentLoaded", function () {
  // === Popup Logic ===
  const popup = document.getElementById("popup");
  const popupClose = document.getElementById("popupClose");

  setTimeout(() => {
    if (popup) {
      popup.style.display = "block";
    }
  }, 3000);

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

  // === About Section Typing Animation ===
  const aboutTypingText = 'print("I love cybersecurity!")';
  let aboutIndex = 0;
  const aboutTypingElement = document.getElementById("typing-text");

  function typeAbout() {
    if (aboutIndex < aboutTypingText.length) {
      aboutTypingElement.innerHTML = aboutTypingText.substring(
        0,
        aboutIndex + 1
      );
      aboutIndex++;
      setTimeout(typeAbout, 100);
    }
  }

  if (aboutTypingElement) {
    typeAbout();
  }

  // ===typing for name =====
  const heroTypingDesktop = document.getElementById("hero-typing-desktop");
  const text = "HI, I'M KAYLA LUGO";
  let i = 0;
  const speed = 100;
  let animationStarted = false;

  function typeDesktopHeading() {
    if (i < text.length) {
      heroTypingDesktop.innerHTML = text.substring(0, i + 1);
      i++;
      setTimeout(typeDesktopHeading, speed);
    } else {
      animationStarted = true;
    }
  }

  // Run animation if screen is big at load
  if (window.innerWidth >= 768 && heroTypingDesktop) {
    typeDesktopHeading();
    animationStarted = true;
  }

  // Watch for resizing from mobile → desktop
  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 768 &&
      !animationStarted &&
      heroTypingDesktop &&
      heroTypingDesktop.innerHTML === ""
    ) {
      i = 0;
      typeDesktopHeading();
    }
  });
});

// === Viewer Count Using CountAPI ===
const viewerCountEl = document.getElementById("viewer-count");
const namespace = "kaylalugo-portfolio";
const key = "live-viewers";

fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
  .then((res) => res.json())
  .then((data) => {
    const simulatedViewers = Math.max(1, Math.floor(data.value / 3));
    viewerCountEl.textContent = `👁️ ${simulatedViewers} viewing`;
  });
