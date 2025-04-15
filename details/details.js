document.addEventListener("DOMContentLoaded", function () {
  // Loading screen animation
  const loadingScreen = document.getElementById("loading-screen");
  const pageContent = document.getElementById("page-content");
  const progressBar = document.getElementById("progress-bar");
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

  // Image Gallery Functionality
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("currentImage");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Update main image
      mainImage.src = this.src;

      // Update active thumbnail
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Favorite Button Functionality
  const favoriteBtn = document.getElementById("favoriteBtn");
  let isFavorite = false;

  favoriteBtn.addEventListener("click", function () {
    isFavorite = !isFavorite;

    if (isFavorite) {
      this.innerHTML = '<i class="fas fa-heart"></i> Added to Favorites';
      this.classList.add("active");

      // Show notification
      showNotification("Apartment added to favorites!");

      // Save to local storage
      saveToFavorites();
    } else {
      this.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
      this.classList.remove("active");

      // Show notification
      showNotification("Apartment removed from favorites");

      // Remove from local storage
      removeFromFavorites();
    }
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate form (simple validation)
    if (!name || !email || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    // Simulate form submission
    showNotification("Message sent successfully! We will contact you soon.");

    // Reset form
    contactForm.reset();
  });

  // Book Now Button
  const bookNowBtn = document.querySelector(".book-now-btn");

  bookNowBtn.addEventListener("click", function () {
    // Get selected payment method
    const paymentMethods = document.getElementsByName("paymentMethod");
    let selectedPayment;

    for (const method of paymentMethods) {
      if (method.checked) {
        selectedPayment = method.id;
        break;
      }
    }

    // Get selected payment schedule
    const paymentSchedules = document.getElementsByName("paymentSchedule");
    let selectedSchedule;

    for (const schedule of paymentSchedules) {
      if (schedule.checked) {
        selectedSchedule = schedule.id;
        break;
      }
    }

    // Show booking confirmation
    showBookingConfirmation(selectedPayment, selectedSchedule);
  });

  // Helper Functions
  function showNotification(message, type = "success") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  function showBookingConfirmation(paymentMethod, paymentSchedule) {
    // Create modal element
    const modal = document.createElement("div");
    modal.className = "modal";

    // Format payment method and schedule for display
    const paymentMethodDisplay =
      paymentMethod === "creditCard"
        ? "Credit/Debit Card"
        : paymentMethod === "bankTransfer"
        ? "Bank Transfer"
        : "PayPal";

    const paymentScheduleDisplay =
      paymentSchedule === "monthly"
        ? "Monthly"
        : paymentSchedule === "quarterly"
        ? "Quarterly (5% discount)"
        : "Annually (10% discount)";

    // Set modal content
    modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Booking Confirmation</h2>
                <p>You are about to book the following apartment:</p>
                <h3>Modern Studio Apartment Near University</h3>
                <p><strong>Payment Method:</strong> ${paymentMethodDisplay}</p>
                <p><strong>Payment Schedule:</strong> ${paymentScheduleDisplay}</p>
                <p class="total-amount"><strong>Total Amount:</strong> $650/month</p>
                <div class="modal-buttons">
                    <button class="cancel-btn">Cancel</button>
                    <button class="confirm-btn">Confirm Booking</button>
                </div>
            </div>
        `;

    // Add to body
    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    // Close button functionality
    const closeBtn = modal.querySelector(".close-btn");
    const cancelBtn = modal.querySelector(".cancel-btn");
    const confirmBtn = modal.querySelector(".confirm-btn");

    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);

    confirmBtn.addEventListener("click", function () {
      closeModal();
      showNotification("Booking confirmed! Check your email for details.");
    });

    function closeModal() {
      modal.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    }
  }

  function saveToFavorites() {
    // Get existing favorites from local storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Add current apartment to favorites
    const apartment = {
      id: "apt123", // This would be a unique ID in a real application
      title: "Modern Studio Apartment Near University",
      location: "123 College Street, University District",
      price: 650,
      image: document.getElementById("currentImage").src,
    };

    // Check if already in favorites
    const exists = favorites.some((fav) => fav.id === apartment.id);

    if (!exists) {
      favorites.push(apartment);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }

  function removeFromFavorites() {
    // Get existing favorites from local storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Remove current apartment from favorites
    favorites = favorites.filter((fav) => fav.id !== "apt123");

    // Update local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
});
