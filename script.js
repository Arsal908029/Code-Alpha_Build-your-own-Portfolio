document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll animations
    const animateElements = document.querySelectorAll('.animate');

    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on page load

    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    const skillProgresses = document.querySelectorAll('.skill-progress');
    const circularProgresses = document.querySelectorAll('.circular-progress');

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);

                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        });

        skillProgresses.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width + '%';
        });

        circularProgresses.forEach(progress => {
            const value = progress.getAttribute('data-value');
            const progressValue = progress.querySelector('.progress-value');
            let startValue = 0;
            const endValue = parseInt(value);
            const speed = 20;

            const progressTimer = setInterval(() => {
                startValue++;
                progressValue.textContent = startValue + '%';
                progress.style.background = `conic-gradient(var(--primary-color) ${startValue * 3.6}deg, var(--light-color) 0deg)`;

                if (startValue >= endValue) {
                    clearInterval(progressTimer);
                }
            }, speed);
        });
    }

    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.about-stats');
    const skillsSection = document.querySelector('.skills');

    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});