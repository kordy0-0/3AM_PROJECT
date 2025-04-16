// Sample apartment data
const apartments = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    price: 650,
    location: "Downtown",
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    amenities: ["wifi", "ac", "laundry"],
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description:
      "A modern studio apartment in the heart of downtown. Perfect for students who want to be close to nightlife and restaurants.",
    available: true,
  },
  {
    id: 2,
    title: "Spacious 2-Bedroom Flat",
    price: 850,
    location: "Near Campus",
    bedrooms: 2,
    bathrooms: 1,
    size: 65,
    amenities: ["wifi", "parking", "ac", "gym"],
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description:
      "A spacious 2-bedroom apartment just a 5-minute walk from campus. Includes access to a gym and parking.",
    available: true,
  },
  {
    id: 3,
    title: "Cozy 1-Bedroom Apartment",
    price: 700,
    location: "East Side",
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    amenities: ["wifi", "parking", "laundry"],
    imageUrl:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description:
      "A cozy 1-bedroom apartment on the East Side. Quiet neighborhood with easy access to public transportation.",
    available: true,
  },
  {
    id: 4,
    title: "Luxury 3-Bedroom House",
    price: 1200,
    location: "West Side",
    bedrooms: 3,
    bathrooms: 2,
    size: 90,
    amenities: ["wifi", "parking", "ac", "laundry", "gym"],
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description:
      "A luxury 3-bedroom house on the West Side. Perfect for a group of students looking for a high-end living experience.",
    available: true,
  },
  {
    id: 5,
    title: "Budget Studio for Students",
    price: 550,
    location: "Near Campus",
    bedrooms: 1,
    bathrooms: 1,
    size: 30,
    amenities: ["wifi", "laundry"],
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description:
      "An affordable studio apartment near campus. Basic amenities with a focus on functionality and convenience.",
    available: true,
  },
  {
    id: 6,
    title: "Shared 4-Bedroom Apartment",
    price: 450,
    location: "Downtown",
    bedrooms: 4,
    bathrooms: 2,
    size: 100,
    amenities: ["wifi", "parking", "ac", "laundry", "gym"],
    imageUrl:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description:
      "A shared 4-bedroom apartment in downtown. Great for students who want to split costs while enjoying premium amenities.",
    available: true,
  },
];

// Store favorite apartments in local storage
let favorites = JSON.parse(localStorage.getItem("favoriteApartments")) || [];

// DOM elements
document.addEventListener("DOMContentLoaded", function () {
  // Loading screen elements
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");
  const pageContent = document.getElementById("page-content");
  const windowGrid = document.getElementById("window-grid");
  const mainBuilding = document.getElementById("main-building");

  // Modal elements
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal-btn");

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
  const loadingDuration = 1000;
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

  // Apartment listing functionality
  const apartmentsContainer = document.getElementById("apartmentsContainer");
  const noResults = document.getElementById("noResults");
  const searchInput = document.getElementById("searchInput");
  const filterToggle = document.getElementById("filterToggle");
  const filterSection = document.getElementById("filterSection");
  const applyFilters = document.getElementById("applyFilters");
  const resetFilters = document.getElementById("resetFilters");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const bedroomsSelect = document.getElementById("bedrooms");
  const locationSelect = document.getElementById("location");
  const amenityCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Toggle filter section on mobile
  filterToggle.addEventListener("click", function () {
    filterSection.classList.toggle("show");
    this.innerHTML = filterSection.classList.contains("show")
      ? '<i class="fas fa-times"></i> Hide Filters'
      : '<i class="fas fa-sliders-h"></i> Show Filters';
  });

  // Display all apartments on page load
  displayApartments(apartments);

  // Apply filters when button is clicked
  applyFilters.addEventListener("click", filterApartments);

  // Reset filters when button is clicked
  resetFilters.addEventListener("click", function () {
    minPrice.value = "";
    maxPrice.value = "";
    bedroomsSelect.value = "";
    locationSelect.value = "";
    amenityCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    searchInput.value = "";
    displayApartments(apartments);
  });

  // Filter apartments when search input changes
  searchInput.addEventListener("input", filterApartments);

  // Modal functionality
  function showModal(apartment) {
    // Create modal content
    let amenitiesBadges = "";
    apartment.amenities.forEach((amenity) => {
      let icon = "";
      switch (amenity) {
        case "wifi":
          icon = "fa-wifi";
          break;
        case "parking":
          icon = "fa-car";
          break;
        case "ac":
          icon = "fa-snowflake";
          break;
        case "laundry":
          icon = "fa-washing-machine";
          break;
        case "gym":
          icon = "fa-dumbbell";
          break;
        default:
          icon = "fa-check";
      }

      amenitiesBadges += `
                <span class="amenity-badge">
                    <i class="fas ${icon}"></i> ${
        amenity.charAt(0).toUpperCase() + amenity.slice(1)
      }
                </span>
            `;
    });

    modalContent.innerHTML = `
            <div class="apartment-modal-image" style="background-image: url('${
              apartment.imageUrl
            }')"></div>
            <div class="apartment-modal-details">
                <h2>${apartment.title}</h2>
                <div class="apartment-modal-location">
                    <i class="fas fa-map-marker-alt"></i> ${apartment.location}
                </div>
                <div class="apartment-modal-features">
                    <div class="apartment-modal-feature">
                        <i class="fas fa-bed"></i> ${apartment.bedrooms} ${
      apartment.bedrooms === 1 ? "Bedroom" : "Bedrooms"
    }
                    </div>
                    <div class="apartment-modal-feature">
                        <i class="fas fa-bath"></i> ${apartment.bathrooms} ${
      apartment.bathrooms === 1 ? "Bathroom" : "Bathrooms"
    }
                    </div>
                    <div class="apartment-modal-feature">
                        <i class="fas fa-vector-square"></i> ${
                          apartment.size
                        } m²
                    </div>
                </div>
                <div class="apartment-modal-description">
                    ${apartment.description}
                </div>
                <div class="apartment-modal-amenities">
                    ${amenitiesBadges}
                </div>
                <div class="apartment-modal-actions">
                    <div class="apartment-modal-price">$${
                      apartment.price
                    }/month</div>
                    <button class="btn btn-primary">Learn More</button>
                </div>
            </div>
        `;

    // Show the modal
    overlay.style.display = "block";
  }

  // Close modal when close button is clicked
  closeModalBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // Close modal when clicking outside the modal
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });

  // Function to toggle favorite status
  function toggleFavorite(apartmentId) {
    const index = favorites.indexOf(apartmentId);

    if (index === -1) {
      // Add to favorites
      favorites.push(apartmentId);
    } else {
      // Remove from favorites
      favorites.splice(index, 1);
    }

    // Save to local storage
    localStorage.setItem("favoriteApartments", JSON.stringify(favorites));

    // Update UI
    const favoriteBtn = document.querySelector(
      `.favorite-btn[data-id="${apartmentId}"]`
    );
    if (favoriteBtn) {
      favoriteBtn.classList.toggle("active");

      // Update icon
      const icon = favoriteBtn.querySelector("i");
      if (icon) {
        if (favorites.includes(apartmentId)) {
          icon.className = "fas fa-heart";
        } else {
          icon.className = "far fa-heart";
        }
      }
    }
  }

  // Function to display apartments
  function displayApartments(apartmentsToDisplay) {
    apartmentsContainer.innerHTML = "";

    if (apartmentsToDisplay.length === 0) {
      noResults.classList.remove("hidden");
    } else {
      noResults.classList.add("hidden");

      apartmentsToDisplay.forEach((apartment) => {
        const apartmentCard = createApartmentCard(apartment);
        apartmentsContainer.appendChild(apartmentCard);
      });
    }
  }

  // Function to create apartment card
  function createApartmentCard(apartment) {
    const col = document.createElement("div");
    col.className = "apartment-item";

    // Check if this apartment is in favorites
    const isFavorite = favorites.includes(apartment.id);

    // Create amenity badges HTML
    let amenitiesBadges = "";
    apartment.amenities.forEach((amenity) => {
      let icon = "";
      switch (amenity) {
        case "wifi":
          icon = "fa-wifi";
          break;
        case "parking":
          icon = "fa-car";
          break;
        case "ac":
          icon = "fa-snowflake";
          break;
        case "laundry":
          icon = "fa-washing-machine";
          break;
        case "gym":
          icon = "fa-dumbbell";
          break;
        default:
          icon = "fa-check";
      }

      amenitiesBadges += `
                <span class="amenity-badge">
                    <i class="fas ${icon}"></i> ${
        amenity.charAt(0).toUpperCase() + amenity.slice(1)
      }
                </span>
            `;
    });

    col.innerHTML = `
            <div class="apartment-card">
                <div class="apartment-image" style="background-image: url('${
                  apartment.imageUrl
                }')">
                    <div class="price-badge">$${apartment.price}/mo</div>
                    <button class="favorite-btn ${
                      isFavorite ? "active" : ""
                    }" data-id="${apartment.id}">
                        <i class="${isFavorite ? "fas" : "far"} fa-heart"></i>
                    </button>
                </div>
                <div class="apartment-details">
                    <h3 class="apartment-title">${apartment.title}</h3>
                    <div class="apartment-location">
                        <i class="fas fa-map-marker-alt"></i> ${
                          apartment.location
                        }
                    </div>
                    <div class="apartment-features">
                        <div class="feature">
                            <i class="fas fa-bed"></i> ${apartment.bedrooms} ${
      apartment.bedrooms === 1 ? "Bed" : "Beds"
    }
                        </div>
                        <div class="feature">
                            <i class="fas fa-bath"></i> ${
                              apartment.bathrooms
                            } ${apartment.bathrooms === 1 ? "Bath" : "Baths"}
                        </div>
                        <div class="feature">
                            <i class="fas fa-vector-square"></i> ${
                              apartment.size
                            } m²
                        </div>
                    </div>
                    <div class="amenities">
                        ${amenitiesBadges}
                    </div>
                    <button class="btn btn-primary view-details-btn" data-id="${
                      apartment.id
                    }" style="width: 100%;">View Details</button>
                </div>
            </div>
        `;

    // Add event listeners
    setTimeout(() => {
      // Add event listener to favorite button
      const favoriteBtn = col.querySelector(".favorite-btn");
      if (favoriteBtn) {
        favoriteBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const apartmentId = parseInt(this.getAttribute("data-id"));
          toggleFavorite(apartmentId);
        });
      }

      // Add event listener to view details button
      const viewDetailsBtn = col.querySelector(".view-details-btn");
      if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const apartmentId = parseInt(this.getAttribute("data-id"));
          const apartment = apartments.find((apt) => apt.id === apartmentId);
          if (apartment) {
            showModal(apartment);
          }
        });
      }
    }, 0);

    return col;
  }

  // Function to filter apartments
  function filterApartments() {
    const searchTerm = searchInput.value.toLowerCase();
    const minPriceValue = minPrice.value ? parseInt(minPrice.value) : 0;
    const maxPriceValue = maxPrice.value ? parseInt(maxPrice.value) : Infinity;
    const bedroomsValue = bedroomsSelect.value;
    const locationValue = locationSelect.value;

    // Get selected amenities
    const selectedAmenities = [];
    amenityCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedAmenities.push(checkbox.value);
      }
    });

    const filteredApartments = apartments.filter((apartment) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        apartment.title.toLowerCase().includes(searchTerm) ||
        apartment.location.toLowerCase().includes(searchTerm);

      // Price range filter
      const matchesPrice =
        apartment.price >= minPriceValue && apartment.price <= maxPriceValue;

      // Bedrooms filter
      const matchesBedrooms =
        bedroomsValue === "" || apartment.bedrooms.toString() === bedroomsValue;

      // Location filter
      const matchesLocation =
        locationValue === "" || apartment.location === locationValue;

      // Amenities filter
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) =>
          apartment.amenities.includes(amenity)
        );

      return (
        matchesSearch &&
        matchesPrice &&
        matchesBedrooms &&
        matchesLocation &&
        matchesAmenities
      );
    });

    displayApartments(filteredApartments);
  }
});

// DOM Elements
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Toggle mobile menu
menuToggle.addEventListener("click", function () {
  const isExpanded = this.getAttribute("aria-expanded") === "true";
  this.setAttribute("aria-expanded", !isExpanded);
  navMenu.classList.toggle("active");

  // Prevent scrolling when menu is open
  document.body.style.overflow = isExpanded ? "" : "hidden";
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  if (
    navMenu.classList.contains("active") &&
    !navMenu.contains(event.target) &&
    event.target !== menuToggle
  ) {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});

// Close menu when pressing Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
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
      (currentPath === "/" && linkPath.includes("index.html"))
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", setActiveNavLink);
