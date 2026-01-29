// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
    
    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll("a");
    navLinkItems.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuToggle.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove("active");
            navLinks.classList.remove("active");
        }
    });
}

 const toggles= document.querySelectorAll(".sec1-toggle")

 toggles.forEach((toggle) => {
    toggle.addEventListener("click", ()=>{
        toggle.parentNode.classList.toggle("active");
    })
 })

 // Progress Bar Scroll Animation
 const progressBars = document.querySelectorAll(".progress-bar-fill");
 let hasAnimated = false;

 function animateProgressBars() {
    if (hasAnimated) return;
    
    progressBars.forEach((bar) => {
        const percentage = bar.getAttribute("data-percentage");
        bar.style.setProperty("--target-width", `${percentage}%`);
        bar.classList.add("animate");
    });
    
    hasAnimated = true;
 }

 function checkScrollPosition() {
    const cont6 = document.querySelector(".cont6");
    if (!cont6) return;
    
    const rect = cont6.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Trigger animation when section is 50% visible
    if (rect.top < windowHeight * 0.5 && rect.bottom > 0) {
        animateProgressBars();
    }
 }

 // Use Intersection Observer for better performance
 const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px"
 };

 const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
            animateProgressBars();
        }
    });
 }, observerOptions);

 // Initialize observer
 const cont6 = document.querySelector(".cont6");
 if (cont6) {
    observer.observe(cont6);
 }

 // Fallback: also check on scroll
 window.addEventListener("scroll", checkScrollPosition);

 const items = document.querySelectorAll(".accordion__item");

    items.forEach((item) => {
      const trigger = item.querySelector(".accordion__trigger");

      trigger.addEventListener("click", () => {
        // Close others to behave like a single-open accordion
        items.forEach((other) => {
          if (other !== item) other.classList.remove("is-open");
        });
        item.classList.toggle("is-open");
      });
    });

    let slides = document.querySelectorAll('.m-slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000); // 5 seconds per slide

// Optional: swipe support using touch events
let startX = 0;
document.querySelector('.m-slider').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
document.querySelector('.m-slider').addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) current = (current + 1) % slides.length;
  else if (endX - startX > 50) current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});