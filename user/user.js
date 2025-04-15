document.addEventListener("DOMContentLoaded", function () {
  // Loading screen animation
  const progressBar = document.getElementById("progress-bar");
  const loadingScreen = document.getElementById("loading-screen");
  const pageContent = document.getElementById("page-content");
  const windowGrid = document.getElementById("window-grid");

  // Hide main content initially
  pageContent.style.display = "block";
  pageContent.style.opacity = "0";

  // Create windows for main building
  for (let i = 0; i < 15; i++) {
    const window = document.createElement("div");
    window.classList.add("window");
    windowGrid.appendChild(window);
  }

  // Create windows for other buildings
  function createWindowsForBuilding(buildingId, rows, cols) {
    const building = document.getElementById(buildingId);
    if (!building) return;

    const buildingWidth = building.offsetWidth;
    const buildingHeight = building.offsetHeight;
    const windowWidth = (buildingWidth / (cols + 1)) * 0.8; // Make windows slightly smaller
    const windowHeight = windowWidth * 1.2; // Slightly taller than wide

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const window = document.createElement("div");
        window.classList.add("window");
        window.style.width = `${windowWidth}px`;
        window.style.height = `${windowHeight}px`;
        window.style.left = `${(col + 0.5) * (buildingWidth / cols)}px`;
        window.style.top = `${(row + 1) * (buildingHeight / (rows + 2))}px`;
        // Add transform to center windows horizontally
        window.style.transform = "translateX(-50%)";
        building.appendChild(window);
      }
    }
  }

  // Create windows for each building with appropriate number of rows and columns
  setTimeout(() => {
    createWindowsForBuilding("building-1", 3, 2); // Small building
    createWindowsForBuilding("building-2", 4, 2); // Medium building
    createWindowsForBuilding("building-3", 3, 3); // Medium building
    createWindowsForBuilding("building-4", 5, 3); // Tall building
    createWindowsForBuilding("building-5", 3, 2); // Small building
  }, 1000);

  // Get all windows
  const getAllWindows = () => document.querySelectorAll(".window");

  // Set loading duration to 3 seconds
  const loadingDuration = 3000;
  const startTime = Date.now();
  const endTime = startTime + loadingDuration;

  // Update frequency
  const updateInterval = 40; // milliseconds

  // Light up windows in sequence with precise timing
  const updateProgress = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    // Calculate progress percentage (0-100)
    const progress = Math.min(
      Math.floor((elapsedTime / loadingDuration) * 100),
      100
    );

    // Update progress bar
    progressBar.style.width = `${progress}%`;

    // Get all windows (including newly created ones)
    const allWindows = getAllWindows();

    // Calculate how many windows to light up
    const windowsToLight = Math.floor((progress / 100) * allWindows.length);

    // Light up windows randomly
    const unlitWindows = Array.from(allWindows).filter(
      (window) => !window.classList.contains("lit")
    );

    for (
      let i = 0;
      i < windowsToLight - (allWindows.length - unlitWindows.length);
      i++
    ) {
      if (unlitWindows.length > 0) {
        const randomIndex = Math.floor(Math.random() * unlitWindows.length);
        unlitWindows[randomIndex].classList.add("lit");
        unlitWindows.splice(randomIndex, 1);
      }
    }

    // Check if loading is complete
    if (currentTime < endTime) {
      // Continue updating
      setTimeout(updateProgress, updateInterval);
    } else {
      // Loading complete
      progressBar.style.width = "100%";

      // Light up all remaining windows with a wave effect
      const remainingWindows = Array.from(allWindows).filter(
        (window) => !window.classList.contains("lit")
      );
      remainingWindows.forEach((window, index) => {
        setTimeout(() => {
          window.classList.add("lit");
        }, index * 20);
      });

      // Show main content after a short delay
      setTimeout(() => {
        loadingScreen.style.opacity = 0;
        loadingScreen.style.transform = "translateY(-20px)";

        setTimeout(() => {
          pageContent.style.opacity = 1;
          loadingScreen.style.display = "none";
        }, 300);
      }, 600);
    }
  };

  // Start the progress updates
  updateProgress();

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Favorite button functionality
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");

      // Toggle heart icon fill state
      if (icon.classList.contains("fas")) {
        icon.classList.remove("fas");
        icon.classList.add("far");
      } else {
        icon.classList.remove("far");
        icon.classList.add("fas");
      }
    });
  });

  // Form submission
  const settingsForm = document.querySelector(".settings-form");

  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        emailNotifications:
          document.getElementById("emailNotifications").checked,
        smsNotifications: document.getElementById("smsNotifications").checked,
        newListings: document.getElementById("newListings").checked,
      };

      // Here you would typically send this data to your server
      console.log("Form submitted with data:", formData);

      // Show success message
      alert("Changes saved successfully!");
    });
  }

  // Side navigation functionality
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Activate corresponding tab
      tabButtons[index].click();
    });
  });
});

// Navbar functionality
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("active");

    // Prevent scrolling when menu is open
    document.body.style.overflow = isExpanded ? "" : "hidden";
  });
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  if (
    navMenu &&
    navMenu.classList.contains("active") &&
    !navMenu.contains(event.target) &&
    event.target !== menuToggle
  ) {
    navMenu.classList.remove("active");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  }
});

// Close menu when pressing Escape key
document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    navMenu &&
    navMenu.classList.contains("active")
  ) {
    navMenu.classList.remove("active");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  }
});

// Set active navigation link based on current page
function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPath = window.location.pathname;

  navLinks.forEach((link) => {
    // Remove existing active class and aria-current
    link.classList.remove("active");
    link.removeAttribute("aria-current");

    // Get the path from the href attribute
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // Check if this link matches the current page
    if (
      currentPath === linkPath ||
      (currentPath.includes("profile") && linkPath.includes("profile.html"))
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", setActiveNavLink);
