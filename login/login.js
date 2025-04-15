document.addEventListener("DOMContentLoaded", () => {
  // Loading screen animation
  const progressBar = document.getElementById("progress-bar");
  const loadingScreen = document.getElementById("loading-screen");
  const pageContent = document.getElementById("page-content");
  const windowGrid = document.getElementById("window-grid");
  const mainBuilding = document.getElementById("main-building");

  // Hide main content initially
  pageContent.style.display = "block";

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

  // Login/Signup form functionality
  const loginSection = document.getElementById("login-section");
  const signupSection = document.getElementById("signup-section");
  const showSignupLink = document.getElementById("show-signup");
  const showLoginLink = document.getElementById("show-login");

  // Show signup form
  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginSection.classList.add("hidden");
    signupSection.classList.remove("hidden");
  });

  // Show login form
  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });

  // Form validation (basic example)
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your login validation logic here
    alert("Login form submitted");
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your signup validation logic here
    alert("Signup form submitted");
  });
});
