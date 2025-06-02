// DOM Elements
const body = document.querySelector('body');
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const loader = document.querySelector('.loader');
const contactForm = document.getElementById('contact-form');

// ===== Page Loader =====
window.addEventListener('load', () => {
  // Simulate loading time
  setTimeout(() => {
    loader.classList.add('hidden');
    // Enable scrolling after loader is hidden
    document.body.style.overflow = 'visible';
  }, 2000);
});

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
  
  // Prevent scrolling when menu is open
  if (nav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = 'visible';
  });
});

// ===== Theme Toggle =====
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Update theme icon
  const themeIcon = themeToggle.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  const themeIcon = themeToggle.querySelector('i');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Active Navigation Link on Scroll =====
function setActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100; // Offset to trigger slightly before reaching section
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - header.offsetHeight;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);

// ===== Typing Animation =====
function typeEffect() {
  const typingElement = document.querySelector('.typing');
  const phrases = ['AI & ML Engineer', 'Web Developer', 'Problem Solver', 'Innovator'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Removing characters
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Adding characters
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Speed adjustments
    let typeSpeed = 100;
    
    if (isDeleting) {
      typeSpeed /= 2; // Faster when deleting
    }
    
    // Logic to switch phrases
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of phrase
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      // Pause before typing next phrase
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// Start typing animation
typeEffect();

// ===== Contact Form Submission =====
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    
    // Simulate form submission (in a real app, you'd send this to a server)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Initialize page on load
window.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  setActiveNavLink();
  
  // Prevent scrolling until loading is complete
  document.body.style.overflow = 'hidden';
});