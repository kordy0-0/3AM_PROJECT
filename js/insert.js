// Initialize flatpickr for all date inputs
flatpickr(".flatpickr", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true
  });
  
  // Add click event listeners to the adviser buttons
  const adviserButtons = document.querySelectorAll('.adviser-button');
  
  adviserButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      adviserButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
    });
  });