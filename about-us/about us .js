// JavaScript for About Us Page
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animation for stats when they come into view
  const statElements = document.querySelectorAll(".counter");

  // Check if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a class to trigger animation
            entry.target.classList.add("animate-counter");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statElements.forEach((stat) => {
      observer.observe(stat);
    });
  }

  // Testimonial hover effect
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      testimonialCards.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Mobile menu toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !navbarToggler.contains(event.target) &&
        !navbarCollapse.contains(event.target) &&
        navbarCollapse.classList.contains("show")
      ) {
        navbarCollapse.classList.remove("show");
      }
    });
  }
});

// Add this to your existing JavaScript
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
      (currentPath.includes("about") && linkPath.includes("about.html"))
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", setActiveNavLink);
