/* =============================================
   ASJAD ALIYAN — PREMIUM PORTFOLIO SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==================== CINEMATIC INTRO ANIMATION ====================
  const introOverlay = document.getElementById('cinematic-intro');
  const introContainer = document.querySelector('.intro-container');
  const logoWrapper = document.querySelector('.intro-logo-wrapper');
  const nameContainer = document.getElementById('intro-name');

  // Prevent scrolling during load
  document.body.style.overflow = 'hidden';

  // The text to reveal
  const fullName = "MOHAMMED ASJAD ALIYAN K";
  
  // Inject spans for each letter
  fullName.split('').forEach(char => {
    const span = document.createElement('span');
    span.className = 'intro-letter';
    span.textContent = char === ' ' ? '' : char;
    nameContainer.appendChild(span);
  });

  const letters = document.querySelectorAll('.intro-letter');

  // Cinematic Timeline
  setTimeout(() => {
    // 1. Initial fade in of the unbroken logo
    if (logoWrapper) logoWrapper.classList.add('fade-in');
    
    // 2. Pause, then Split the logo
    setTimeout(() => {
      if (introContainer) introContainer.classList.add('split');
      
      // 3. While splitting, reveal the name letter by letter
      setTimeout(() => {
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add('revealed');
          }, index * 40); // 40ms stagger for premium feel
        });
        
        // 4. Pause to read the name, then reconstruct
        setTimeout(() => {
          if (introContainer) introContainer.classList.remove('split');
          if (nameContainer) nameContainer.classList.add('fade-out');
          
          // 5. Final zoom out and fade
          setTimeout(() => {
            if (introOverlay) introOverlay.classList.add('zoom-out');
            
            // Allow scrolling and init reveals
            setTimeout(() => {
              document.body.style.overflow = '';
              initRevealAnimations();
              // Remove intro from DOM for performance
              setTimeout(() => {
                if (introOverlay) introOverlay.remove();
              }, 1000);
            }, 800);
            
          }, 1500); // Wait for logo to reconstruct
          
        }, 2000); // Hold the full composition
        
      }, 600); // Start name reveal slightly after split starts
      
    }, 1500); // Hold unbroken logo
    
  }, 100); // Short initial delay

  // ==================== CUSTOM CURSOR ====================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects on interactive elements
    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-category, .cert-card, .interest-card, .achievement-card, .about-card, .contact-item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
      });
    });
  }

  // ==================== NAVIGATION ====================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  // Scroll handler
  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    // Navbar scroll effect
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress
    scrollProgress.style.width = scrollPercent + '%';

    // Back to top
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentSection);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Back to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== THEME TOGGLE ====================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Check saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  // ==================== TYPING ANIMATION ====================
  const typedElement = document.getElementById('typed-text');
  const roles = [
    'Software Architect',
    'AI Engineer',
    'Systems Designer',
    'Full Stack Developer',
    'Deep Learning Explorer',
    'Tech Visionary'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // ==================== SCROLL REVEAL ANIMATIONS ====================
  function initRevealAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger delay based on sibling position
          const parent = entry.target.parentElement;
          const siblings = parent ? Array.from(parent.children).filter(c =>
            c.classList.contains('reveal-up') ||
            c.classList.contains('reveal-left') ||
            c.classList.contains('reveal-right')
          ) : [];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 100, 400);

          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ==================== ANIMATED COUNTERS ====================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const increment = target / 60;
          const duration = 2000;
          const stepTime = duration / 60;

          function updateCounter() {
            current += increment;
            if (current < target) {
              el.textContent = Math.floor(current);
              setTimeout(updateCounter, stepTime);
            } else {
              el.textContent = target;
            }
          }

          updateCounter();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  animateCounters();

  // ==================== SKILL BAR ANIMATION ====================
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  animateSkillBars();

  // ==================== PROJECT FILTERS ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Contact form submission is handled natively via formsubmit.co in the HTML

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==================== HERO PARTICLES ====================
  function createParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 15 + 10}s linear infinite;
        animation-delay: ${Math.random() * 10}s;
      `;
      particlesContainer.appendChild(particle);
    }

    // Add particle keyframes
    if (!document.querySelector('#particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createParticles();

  // ==================== TILT EFFECT ON CARDS ====================
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.project-card, .about-card, .cert-card, .achievement-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ==================== DOWNLOAD RESUME ====================
  const downloadBtn = document.getElementById('download-resume');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Resume download will be available soon!');
    });
  }

  // ==================== LAZY LOADING IMAGES ====================
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      imageObserver.observe(img);
    });
  }

  // ==================== CONSOLE EASTER EGG ====================
  console.log(
    '%c🚀 Asjad Aliyan Portfolio',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6366F1, #8B5CF6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
  );
  console.log(
    '%cBuilt with passion and dedication.',
    'font-size: 14px; color: #94A3B8;'
  );
});
