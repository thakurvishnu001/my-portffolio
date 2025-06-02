// DOM Elements
const heroSection = document.getElementById('home');
const profileCard = document.querySelector('.profile-card-inner');
const projectCards = document.querySelectorAll('.project-card-inner');

// ===== 3D Card Tilt Effect =====
function applyTiltEffect(element) {
  element.addEventListener('mousemove', (e) => {
    // Get position of mouse relative to element
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    // Calculate rotation based on mouse position
    // Divide by element width/height to get value between 0 and 1
    // Then multiply by desired rotation amount (lower for subtle effect)
    const rotateY = ((x / rect.width) - 0.5) * 20; // -10 to 10 degrees
    const rotateX = ((y / rect.height) - 0.5) * -20; // 10 to -10 degrees (inverted for natural feel)
    
    // Apply transform
    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Add shine effect (if it has a front face)
    const frontFace = element.querySelector('.profile-card-front, .project-card-front');
    if (frontFace) {
      // Calculate percentage for shine gradient based on mouse position
      const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
      frontFace.style.backgroundImage = shine;
    }
  });
  
  // Reset on mouse leave
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'rotateX(0) rotateY(0)';
    
    // Remove shine effect
    const frontFace = element.querySelector('.profile-card-front, .project-card-front');
    if (frontFace) {
      frontFace.style.backgroundImage = '';
    }
    
    // Reset transition for smooth return
    element.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
      element.style.transition = '';
    }, 500);
  });
  
  // Handle touch events for mobile
  element.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling while interacting with card
    
    const touch = e.touches[0];
    const rect = element.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Apply less extreme rotation for touch
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    
    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  element.addEventListener('touchend', () => {
    element.style.transform = 'rotateX(0) rotateY(0)';
    element.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
      element.style.transition = '';
    }, 500);
  });
}

// Apply tilt effect to profile card if exists
if (profileCard) {
  applyTiltEffect(profileCard);
}

// Apply tilt effect to project cards
projectCards.forEach(card => {
  applyTiltEffect(card);
});

// ===== Parallax Effect on Hero Section =====
document.addEventListener('mousemove', (e) => {
  if (!heroSection) return;
  
  // Get cursor position relative to viewport
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  // Calculate offset (subtle movement)
  const offsetX = (mouseX - 0.5) * 30; // -15px to 15px
  const offsetY = (mouseY - 0.5) * 30; // -15px to 15px
  
  // Apply parallax to hero elements
  const heroElements = heroSection.querySelectorAll('.hero-text, .hero-image, .shape-blob');
  heroElements.forEach(element => {
    // Different depths for different elements
    let depthFactor = 1;
    
    if (element.classList.contains('hero-text')) {
      depthFactor = 0.5; // Move less
    } else if (element.classList.contains('shape-blob')) {
      depthFactor = 2; // Move more
    }
    
    // Apply transform with depth factor
    element.style.transform = `translate(${offsetX * depthFactor}px, ${offsetY * depthFactor}px)`;
  });
});

// ===== 3D Floating Elements =====
function createFloatingEffect() {
  // Select elements to float
  const floatingElements = document.querySelectorAll('.floating-shape, .skill-card, .cert-card');
  
  floatingElements.forEach((element, index) => {
    // Create random initial position
    const randomX = (Math.random() - 0.5) * 10;
    const randomY = (Math.random() - 0.5) * 10;
    const randomRotate = (Math.random() - 0.5) * 5;
    
    // Create animation with unique timing
    const duration = 3 + Math.random() * 2; // 3-5 seconds
    const delay = index * 0.1; // Staggered delay
    
    // Apply floating animation
    element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
  });
}

// Define floating animation keyframes
const floatKeyframes = `
@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(0, -10px) rotate(2deg);
  }
}
`;

// Add keyframes to document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatKeyframes;
document.head.appendChild(styleSheet);

// Initialize floating effect
createFloatingEffect();

// ===== 3D Scene Background (for high-performance devices) =====
function initBackgroundScene() {
  // Check if device can handle complex 3D effects
  const isHighPerformance = window.matchMedia('(min-width: 1024px)').matches && 
                            !navigator.userAgent.match(/(Android|iPod|iPhone|iPad)/i);
  
  if (!isHighPerformance || !heroSection) return;
  
  // Create background particles
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-background';
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    opacity: 0.5;
  `;
  
  // Add to hero section
  heroSection.appendChild(particleContainer);
  
  // Create particles
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    
    // Random properties
    const size = Math.random() * 20 + 10; // 10-30px
    const posX = Math.random() * 100; // 0-100%
    const posY = Math.random() * 100; // 0-100%
    const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
    const duration = Math.random() * 20 + 10; // 10-30s
    const delay = Math.random() * 5; // 0-5s
    
    // Set styles
    particle.style.cssText = `
      position: absolute;
      top: ${posY}%;
      left: ${posX}%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: var(--primary-500);
      opacity: ${opacity};
      animation: floatParticle ${duration}s ease-in-out ${delay}s infinite alternate;
      z-index: 0;
    `;
    
    particleContainer.appendChild(particle);
  }
  
  // Add particle animation
  const particleAnimation = `
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0) scale(1);
      }
      100% {
        transform: translate(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 100}px, 
                            ${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 100}px) 
                    scale(${Math.random() * 0.5 + 0.8});
      }
    }
  `;
  
  const particleStyle = document.createElement('style');
  particleStyle.textContent = particleAnimation;
  document.head.appendChild(particleStyle);
}

// Initialize 3D background
initBackgroundScene();