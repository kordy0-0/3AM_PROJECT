// Loading screen handling
const progressBar = document.getElementById("progress-bar");
const loadingScreen = document.getElementById("loading-screen");
const windowGrid = document.getElementById("window-grid");
const mainBuilding = document.getElementById("main-building");

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

  // Wait for building to be fully rendered
  setTimeout(() => {
    const buildingWidth = building.offsetWidth;
    const buildingHeight = building.offsetHeight;

    // Only proceed if building has dimensions
    if (buildingWidth > 0 && buildingHeight > 0) {
      const windowWidth = Math.max(8, (buildingWidth / (cols + 1)) * 0.7);
      const windowHeight = Math.max(10, windowWidth * 1.2);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const window = document.createElement("div");
          window.classList.add("window");

          // Calculate position with proper spacing
          const leftPos = (col + 0.5) * (buildingWidth / cols);
          const topPos = (row + 1) * (buildingHeight / (rows + 2));

          // Set window styles
          window.style.width = `${windowWidth}px`;
          window.style.height = `${windowHeight}px`;
          window.style.left = `${leftPos - windowWidth / 2}px`;
          window.style.top = `${topPos}px`;

          building.appendChild(window);
        }
      }
    }
  }, 500); // Wait for building animations to complete
}

// Create windows for each building with appropriate number of rows and columns
setTimeout(() => {
  createWindowsForBuilding("building-1", 3, 2);
  createWindowsForBuilding("building-2", 4, 2);
  createWindowsForBuilding("building-3", 3, 3);
  createWindowsForBuilding("building-4", 5, 3);
  createWindowsForBuilding("building-5", 3, 2);
}, 1000);

// Get all windows
const getAllWindows = () => document.querySelectorAll(".window");

// Set loading duration to 3 seconds
const loadingDuration = 1000;
const startTime = Date.now();
const endTime = startTime + loadingDuration;

// Update frequency
const updateInterval = 40;

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
    // Loading complete - at 3 seconds
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
      // Hide loading screen after transition
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 300);
    }, 300);
  }
};

// Start the progress updates
updateProgress();

// Add interactive elements
const buildings = document.querySelectorAll(".building");
buildings.forEach((building) => {
  building.addEventListener("mouseenter", () => {
    building.style.transform = "translateY(-5px)";
  });

  building.addEventListener("mouseleave", () => {
    building.style.transform = "translateY(0)";
  });

  // Add click event to toggle windows in this building
  building.addEventListener("click", () => {
    const buildingWindows = building.querySelectorAll(".window");
    buildingWindows.forEach((window, index) => {
      setTimeout(() => {
        window.classList.toggle("lit");
      }, index * 15);
    });
  });
});

// Add click event to main building for wave effect
mainBuilding.addEventListener("click", () => {
  const mainWindows = mainBuilding.querySelectorAll(".window");
  mainWindows.forEach((window, index) => {
    setTimeout(() => {
      window.classList.toggle("lit");
    }, index * 15);
  });

  // Toggle them back after a short delay
  setTimeout(() => {
    mainWindows.forEach((window, index) => {
      setTimeout(() => {
        window.classList.toggle("lit");
      }, index * 15);
    });
  }, 300);
});

// Apply typewriter effect to hero title and subtitle
function applyTypewriterEffect(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Get the original text from the element
  const originalText = element.textContent;

  // Clear the element to start fresh
  element.textContent = "";

  let textPosition = 0;
  const speed = 100; // Typing speed in milliseconds

  // Function to type each character
  function typeCharacter() {
    if (textPosition < originalText.length) {
      element.innerHTML =
        originalText.substring(0, textPosition + 1) +
        "<span class='cursor'>&#9646;</span>";
      textPosition++;
      setTimeout(typeCharacter, speed);
    } else {
      // When typing is complete, just show the cursor at the end
      element.innerHTML = originalText + "<span class='cursor'>&#9646;</span>";
    }
  }

  // Start the typing effect
  typeCharacter();
}

// Apply typewriter effect to hero title and subtitle when loading is complete
setTimeout(() => {
  applyTypewriterEffect("hero-title");

  // Apply to subtitle after title is complete
  setTimeout(() => {
    applyTypewriterEffect("hero-subtitle");
  }, 3000); // Start subtitle after title (approx 3 seconds)
}, 3500); // Start after loading screen is gone

// Search form submission
const searchForm = document.getElementById("search-form");
if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const university = document.getElementById("university").value;
    const propertyType = document.getElementById("property-type").value;
    const budget = document.getElementById("budget").value;

    // You can implement search functionality here
    console.log("Search parameters:", {
      university,
      propertyType,
      budget,
    });

    alert(
      "Search submitted! University: " +
        university +
        ", Property Type: " +
        propertyType +
        ", Budget: " +
        budget
    );
  });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Make sure this JavaScript is in your script section
// DOM Elements
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Toggle mobile menu
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
