// Loading screen animation
document.addEventListener("DOMContentLoaded", () => {
  // Hide main content initially
  const pageContent = document.getElementById("page-content");
  pageContent.style.display = "block";

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
});

// JavaScript for Property Submission Page
document.addEventListener("DOMContentLoaded", function () {
  // Form steps navigation
  const form = document.getElementById("propertyForm");
  const steps = document.querySelectorAll(".step-content");
  const stepLabels = document.querySelectorAll(".steps-labels .step");
  const progressBar = document.querySelector(".progress-bar");
  let currentStep = 0;

  // Next step buttons
  document.querySelectorAll(".next-step").forEach((button) => {
    button.addEventListener("click", function () {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  // Previous step buttons
  document.querySelectorAll(".prev-step").forEach((button) => {
    button.addEventListener("click", function () {
      goToStep(currentStep - 1);
    });
  });

  // Go to specific step
  function goToStep(stepIndex) {
    // Hide all steps
    steps.forEach((step) => step.classList.add("d-none"));

    // Show current step
    steps[stepIndex].classList.remove("d-none");

    // Update progress bar
    const progress = (stepIndex / (steps.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;

    // Update step labels
    stepLabels.forEach((label, index) => {
      if (index < stepIndex) {
        label.classList.add("completed");
        label.classList.remove("active");
      } else if (index === stepIndex) {
        label.classList.add("active");
        label.classList.remove("completed");
      } else {
        label.classList.remove("active", "completed");
      }
    });

    // Update current step
    currentStep = stepIndex;

    // If we're on the preview step, update the preview
    if (currentStep === 3) {
      updatePreview();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Validate current step
  function validateStep(stepIndex) {
    let isValid = true;

    // Reset validation
    form.classList.remove("was-validated");

    // Get all required fields in current step
    const requiredFields = steps[stepIndex].querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!field.value) {
        field.classList.add("is-invalid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

    // Special validation for step 3 (photos)
    if (stepIndex === 2) {
      const mainPhotoPreview = document.getElementById("mainPhotoPreview");
      if (mainPhotoPreview.classList.contains("d-none")) {
        document
          .getElementById("mainPhotoPlaceholder")
          .classList.add("is-invalid");
        isValid = false;
      }
    }

    if (!isValid) {
      // Add was-validated class to show validation messages
      form.classList.add("was-validated");
    }

    return isValid;
  }

  // Photo upload functionality
  const mainPhotoInput = document.getElementById("mainPhoto");
  const mainPhotoPlaceholder = document.getElementById("mainPhotoPlaceholder");
  const mainPhotoPreview = document.getElementById("mainPhotoPreview");
  const mainPhotoPreviewImg = mainPhotoPreview.querySelector("img");

  // Main photo upload
  mainPhotoPlaceholder.addEventListener("click", function () {
    mainPhotoInput.click();
  });

  mainPhotoInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        mainPhotoPreviewImg.src = e.target.result;
        mainPhotoPlaceholder.classList.add("d-none");
        mainPhotoPreview.classList.remove("d-none");
      };

      reader.readAsDataURL(this.files[0]);
    }
  });

  // Remove main photo
  mainPhotoPreview
    .querySelector(".remove-photo")
    .addEventListener("click", function () {
      mainPhotoInput.value = "";
      mainPhotoPreview.classList.add("d-none");
      mainPhotoPlaceholder.classList.remove("d-none");
    });

  // Additional photos upload
  const additionalPhotosInput = document.getElementById("additionalPhotos");
  const additionalPhotosPlaceholder = document.getElementById(
    "additionalPhotosPlaceholder"
  );
  const photoGallery = document.getElementById("photoGallery");

  additionalPhotosPlaceholder.addEventListener("click", function () {
    additionalPhotosInput.click();
  });

  additionalPhotosInput.addEventListener("change", function () {
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        if (photoGallery.children.length >= 10) {
          alert("Maximum 10 additional photos allowed");
          break;
        }

        const file = this.files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
          const photoItem = document.createElement("div");
          photoItem.className = "col-6 col-md-4 col-lg-3 mb-3";
          photoItem.innerHTML = `
                                <div class="photo-item">
                                    <img src="${e.target.result}" alt="Property photo" class="img-fluid">
                                    <button type="button" class="btn btn-sm btn-danger remove-photo">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `;

          // Add remove functionality
          photoItem
            .querySelector(".remove-photo")
            .addEventListener("click", function () {
              photoItem.remove();
            });

          photoGallery.appendChild(photoItem);
        };

        reader.readAsDataURL(file);
      }
    }
  });

  // Update preview
  function updatePreview() {
    // Property title
    const propertyName = document.getElementById("propertyName").value;
    document.getElementById("previewTitle").textContent =
      propertyName || "Property Name";

    // Location
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    document.getElementById("previewLocation").textContent =
      city && state ? `${city}, ${state}` : "Location";

    // Features
    const bedrooms = document.getElementById("bedrooms").value;
    document.getElementById("previewBedrooms").textContent = bedrooms
      ? `${bedrooms} Bed`
      : "Bedrooms";

    const bathrooms = document.getElementById("bathrooms").value;
    document.getElementById("previewBathrooms").textContent = bathrooms
      ? `${bathrooms} Bath`
      : "Bathrooms";

    const propertyType = document.getElementById("propertyType").value;
    document.getElementById("previewType").textContent = propertyType || "Type";

    // Description
    const description = document.getElementById("description").value;
    document.getElementById("previewDescription").textContent =
      description || "Property description will appear here...";

    // Amenities
    const amenitiesContainer = document.getElementById("previewAmenities");
    amenitiesContainer.innerHTML = "";

    const amenities = [];
    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        if (checkbox.id.includes("Included")) {
          // This is a utility, not an amenity
          return;
        }

        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          amenities.push(label.textContent);
        }
      });

    if (amenities.length > 0) {
      amenities.forEach((amenity) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-light text-dark";
        badge.textContent = amenity;
        amenitiesContainer.appendChild(badge);
      });
    } else {
      const badge = document.createElement("span");
      badge.className = "badge bg-light text-dark";
      badge.textContent = "No amenities selected";
      amenitiesContainer.appendChild(badge);
    }

    // Price
    const price = document.getElementById("price").value;
    document.getElementById("previewPrice").textContent = price
      ? `$${price} /month`
      : "$0 /month";

    // Utilities
    const utilities = [];
    document
      .querySelectorAll('input[id$="Included"]:checked')
      .forEach((checkbox) => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          utilities.push(label.textContent);
        }
      });

    if (utilities.length > 0) {
      document.getElementById(
        "previewUtilities"
      ).textContent = `Utilities included: ${utilities.join(", ")}`;
    } else {
      document.getElementById("previewUtilities").textContent =
        "Utilities: Not included";
    }

    // Main photo
    const previewMainPhoto = document.getElementById("previewMainPhoto");
    if (!mainPhotoPreview.classList.contains("d-none")) {
      previewMainPhoto.innerHTML = `<img src="${mainPhotoPreviewImg.src}" alt="${propertyName}" class="img-fluid">`;
    } else {
      previewMainPhoto.innerHTML = `
                        <div class="placeholder-img">
                            <i class="fas fa-home"></i>
                            <p>Main photo will appear here</p>
                        </div>
                    `;
    }
  }

  // Form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateStep(currentStep)) {
      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

      // Simulate form submission (in a real app, you would send data to server)
      setTimeout(() => {
        // Show success message
        const formContainer = form.parentElement;
        formContainer.innerHTML = `
                            <div class="text-center py-5">
                                <div class="mb-4">
                                    <i class="fas fa-check-circle text-success" style="font-size: 5rem;"></i>
                                </div>
                                <h2 class="mb-3">Property Submitted Successfully!</h2>
                                <p class="lead mb-4">Thank you for listing your property with us. Our team will review your submission and it will be live within 24 hours.</p>
                                <div class="mt-4">
                                    <a href="#" class="btn btn-primary me-3">View My Listings</a>
                                    <a href="#" class="btn btn-outline-primary">Add Another Property</a>
                                </div>
                            </div>
                        `;
      }, 2000);
    }
  });

  // Drag and drop functionality for photos
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    mainPhotoPlaceholder.addEventListener(eventName, preventDefaults, false);
    additionalPhotosPlaceholder.addEventListener(
      eventName,
      preventDefaults,
      false
    );
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    mainPhotoPlaceholder.addEventListener(eventName, highlight, false);
    additionalPhotosPlaceholder.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    mainPhotoPlaceholder.addEventListener(eventName, unhighlight, false);
    additionalPhotosPlaceholder.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    this.classList.add("bg-light");
  }

  function unhighlight(e) {
    this.classList.remove("bg-light");
  }

  mainPhotoPlaceholder.addEventListener("drop", handleMainPhotoDrop, false);
  additionalPhotosPlaceholder.addEventListener(
    "drop",
    handleAdditionalPhotosDrop,
    false
  );

  function handleMainPhotoDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      mainPhotoInput.files = files;
      const event = new Event("change");
      mainPhotoInput.dispatchEvent(event);
    }
  }

  function handleAdditionalPhotosDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      additionalPhotosInput.files = files;
      const event = new Event("change");
      additionalPhotosInput.dispatchEvent(event);
    }
  }
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
      (currentPath.includes("post-property") &&
        linkPath.includes("post-property.html"))
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", setActiveNavLink);
