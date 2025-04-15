// Toggle between monthly and annual billing
const billingToggle = document.getElementById("billing-toggle");
const monthlyPrices = document.querySelectorAll(".plan-price.monthly");
const annualPrices = document.querySelectorAll(".plan-price.annual");
const monthlyText = document.querySelector(".toggle-text.monthly");
const annualText = document.querySelector(".toggle-text.annual");

billingToggle.addEventListener("change", function () {
  if (this.checked) {
    // Annual billing
    monthlyPrices.forEach((price) => (price.style.display = "none"));
    annualPrices.forEach((price) => (price.style.display = "block"));
    monthlyText.classList.remove("active");
    annualText.classList.add("active");
  } else {
    // Monthly billing
    monthlyPrices.forEach((price) => (price.style.display = "block"));
    annualPrices.forEach((price) => (price.style.display = "none"));
    monthlyText.classList.add("active");
    annualText.classList.remove("active");
  }
});

// Initialize billing display
annualPrices.forEach((price) => (price.style.display = "none"));

// FAQ Toggle
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Close all other open FAQs
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("faq-active")) {
        otherItem.classList.remove("faq-active");
      }
    });

    // Toggle current FAQ
    item.classList.toggle("faq-active");
  });
});

// Testimonial slider navigation
const testimonialsContainer = document.querySelector(".testimonials-container");
let isDown = false;
let startX;
let scrollLeft;

testimonialsContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - testimonialsContainer.offsetLeft;
  scrollLeft = testimonialsContainer.scrollLeft;
});

testimonialsContainer.addEventListener("mouseleave", () => {
  isDown = false;
});

testimonialsContainer.addEventListener("mouseup", () => {
  isDown = false;
});

testimonialsContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - testimonialsContainer.offsetLeft;
  const walk = (x - startX) * 2; // Scroll speed
  testimonialsContainer.scrollLeft = scrollLeft - walk;
});

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".plan, .special-offer, .testimonial, .comparison-section, .faq-section"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Initialize elements with opacity and transform
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".plan, .special-offer, .testimonial, .comparison-section, .faq-section"
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
  setTimeout(animateOnScroll, 500);
});

// Trigger animation on scroll
window.addEventListener("scroll", animateOnScroll);
