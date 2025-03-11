       
       
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                navbar.style.padding = '15px 40px';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '20px 40px';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Menu icon functionality (for mobile)
        document.querySelector('.menu-icon').addEventListener('click', function() {
            alert('Menu clicked - Add your mobile menu functionality here');
        });
        
        // Learn more button functionality
        document.querySelector('.learn-more-btn').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Learn More clicked! Add your custom functionality here.');
        });
        
        // Animation function for percentage counters
        function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            const range = end - start;
            const minTimer = 50; // minimum timer interval in ms
            let stepTime = Math.abs(Math.floor(duration / range));
            
            // Ensure the step time is not too small
            stepTime = Math.max(stepTime, minTimer);
            
            let startTime = new Date().getTime();
            let endTime = startTime + duration;
            let timer;
            
            function run() {
                let now = new Date().getTime();
                let remaining = Math.max((endTime - now) / duration, 0);
                let value = Math.round(end - (remaining * range));
                obj.innerHTML = value + "%";
                if (value === end) {
                    clearInterval(timer);
                }
            }
            
            timer = setInterval(run, stepTime);
            run();
        }

        // Start animations when the page loads
        window.onload = function() {
            animateValue("percentage1", 0, 50, 2000);
            animateValue("percentage2", 0, 17, 2000);
            animateValue("percentage3", 0, 20, 2000);
            animateValue("percentage4", 0, 13, 2000);
        };
        
        // Add hover effect enhancement for photo items
        document.querySelectorAll('.photo-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.cursor = 'default';
            });
        });
        
        // Make sample text editable on double click
        const sampleText = document.querySelector('.sample-text');
        sampleText.addEventListener('dblclick', function() {
            this.contentEditable = true;
            this.focus();
        });
        
        sampleText.addEventListener('click', function() {
            if (this.contentEditable !== 'true') {
                this.style.outline = '1px solid #aaa';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (e.target !== sampleText) {
                sampleText.contentEditable = false;
                sampleText.style.outline = 'none';
            }
        });
        
        // Make footer text editable on double click
        const footerText = document.querySelector('.footer-text');
        footerText.addEventListener('dblclick', function() {
            this.contentEditable = true;
            this.focus();
        });
        
        footerText.addEventListener('click', function() {
            if (this.contentEditable !== 'true') {
                this.style.outline = '1px solid #aaa';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (e.target !== footerText) {
                footerText.contentEditable = false;
                footerText.style.outline = 'none';
            }
        });
        
        // Add hover effects for social icons
        document.querySelectorAll('.social-icons a').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Add hover effect for submit button
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#b2b8bf';
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#cfd5dc';
        });
       
       
       
       
       
       
       
       
       
       // Counter animation from the second layout
        document.addEventListener('DOMContentLoaded', function() {
            const counterElement = document.getElementById('counter');
            let count = 0;
            const targetCount = 30;
            const duration = 2000; // 2 seconds
            const interval = 20; // update every 20ms
            const steps = duration / interval;
            const increment = targetCount / steps;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= targetCount) {
                    count = targetCount;
                    clearInterval(timer);
                }
                counterElement.textContent = Math.floor(count) + 'k';
            }, interval);
        });

       