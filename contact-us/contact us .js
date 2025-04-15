// Loading screen animation
document.addEventListener("DOMContentLoaded", () => {
  // Hide main content initially
  const mainContent = document.getElementById("main-content");
  mainContent.style.display = "block";

  // Elements
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
          mainContent.style.opacity = 1;
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
});

// Form validation
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm()) {
        return false;
      }

      // Show success message
      showSuccessMessage();

      // In a real application, you would send the form data to a server here
      // For demonstration, we'll just reset the form after a delay
      setTimeout(() => {
        contactForm.reset();
        removeSuccessMessage();
      }, 3000);
    });
  }

  function validateForm() {
    let isValid = true;

    // Get form fields
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const terms = document.getElementById("terms");

    // Reset previous validation
    resetValidation();

    // Validate name
    if (!name.value.trim()) {
      setInvalid(name, "Please enter your name");
      isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
      setInvalid(email, "Please enter your email");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      setInvalid(email, "Please enter a valid email address");
      isValid = false;
    }

    // Validate subject
    if (!subject.value || subject.value === "") {
      setInvalid(subject, "Please select a subject");
      isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
      setInvalid(message, "Please enter your message");
      isValid = false;
    }

    // Validate terms
    if (!terms.checked) {
      setInvalid(terms, "You must agree to the terms");
      isValid = false;
    }

    return isValid;
  }

  function resetValidation() {
    // Remove all validation classes
    const formElements = document.querySelectorAll(
      ".form-control, .form-select, .form-check-input"
    );
    formElements.forEach((element) => {
      element.classList.remove("is-invalid");
    });
  }

  function setInvalid(element, message) {
    element.classList.add("is-invalid");

    // Find the feedback element
    const feedbackElement = element.nextElementSibling;
    if (
      feedbackElement &&
      feedbackElement.classList.contains("invalid-feedback")
    ) {
      feedbackElement.textContent = message;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showSuccessMessage() {
    // Remove any existing message
    removeSuccessMessage();

    // Create success message
    const successDiv = document.createElement("div");
    successDiv.className = "alert alert-success mt-3";
    successDiv.id = "formSuccessMessage";
    successDiv.innerHTML =
      "<strong>Success!</strong> Your message has been sent. We will contact you soon.";

    // Insert after form
    contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
  }

  function removeSuccessMessage() {
    const existingMessage = document.getElementById("formSuccessMessage");
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  // FAQ Accordion functionality is handled by Bootstrap's JavaScript
});
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
      (currentPath === "/" && linkPath.includes("index.html")) ||
      (currentPath.includes("contact") && linkPath.includes("contact.html"))
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", setActiveNavLink);
