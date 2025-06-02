// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const skills = document.querySelectorAll('.skill-card');
const timelineItems = document.querySelectorAll('.timeline-item');

// ===== Custom Cursor =====
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  // Add slight delay to follower for smoother effect
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 70);
});

// Change cursor appearance on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .theme-toggle, .menu-toggle, .skill-card, .project-card, input, textarea');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    
    // Specific effect for buttons
    if (element.classList.contains('btn')) {
      cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
      cursorFollower.style.borderColor = 'var(--primary-500)';
    }
    
    // Specific effect for skills
    if (element.classList.contains('skill-card')) {
      cursor.style.backgroundColor = 'rgba(249, 115, 22, 0.2)';
      cursorFollower.style.borderColor = 'var(--accent-500)';
    }
    
    // Specific effect for project cards
    if (element.classList.contains('project-card')) {
      cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
      cursorFollower.style.borderColor = 'var(--comp-500)';
    }
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.5)';
    cursorFollower.style.borderColor = 'var(--primary-500)';
  });
});

// Cursor disappearing when leaving the window
document.addEventListener('mouseout', (e) => {
  if (e.relatedTarget === null) {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  }
});

document.addEventListener('mouseover', () => {
  cursor.style.opacity = '1';
  cursorFollower.style.opacity = '1';
});


// Intersection Observer for animation on scroll
const animateOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  },
  { threshold: 0.1 } // Trigger when 10% of the element is visible
);

// Timeline animation
timelineItems.forEach((item, index) => {
  // Set initial styles
  const content = item.querySelector('.timeline-content');
  content.style.opacity = '0';
  
  // Add staggered delay based on index
  content.style.transitionDelay = `${index * 0.1}s`;
  
  // Start observing
  animateOnScroll.observe(content);
});

// Animate elements when they come into view
document.querySelectorAll('.skill-category, .project-card, .cert-card, .contact-item').forEach(element => {
  animateOnScroll.observe(element);
});

// ===== Skill Cards Hover Effect =====
skills.forEach(skill => {
  skill.addEventListener('mouseenter', () => {
    const skillName = skill.getAttribute('data-skill');
    const skillIcon = skill.querySelector('.skill-icon i');
    
    // Create and append tooltip
    const tooltip = document.createElement('div');
    tooltip.classList.add('skill-tooltip');
    tooltip.textContent = `Experience with ${skillName}`;
    skill.appendChild(tooltip);
    
    // Add bounce animation to icon
    skillIcon.style.animation = 'bounce 0.5s ease infinite alternate';
  });
  
  skill.addEventListener('mouseleave', () => {
    // Remove tooltip
    const tooltip = skill.querySelector('.skill-tooltip');
    if (tooltip) {
      skill.removeChild(tooltip);
    }
    
    // Remove animation
    const skillIcon = skill.querySelector('.skill-icon i');
    skillIcon.style.animation = '';
  });
});

// Define the bounce animation
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-5px);
    }
  }
  
  .skill-tooltip {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--neutral-800);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
  }
  
  .skill-tooltip::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: var(--neutral-800) transparent transparent;
  }
`;
document.head.appendChild(style);