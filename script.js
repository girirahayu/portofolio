document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Theme Toggle Handler ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme preference, fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  htmlElement.setAttribute('data-theme', initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- Mobile Navigation Drawer Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');

  function toggleMobileMenu() {
    const isActive = navMenu.classList.toggle('mobile-active');
    
    // Toggle active state icons
    if (isActive) {
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('mobile-active')) {
        toggleMobileMenu();
      }
    });
  });

  // --- Dynamic Year in Footer ---
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Copy GPG Key Link Alert ---
  const copyGpgBtn = document.getElementById('copy-gpg-link');
  if (copyGpgBtn) {
    copyGpgBtn.addEventListener('click', () => {
      const gpgUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '') + '/public-gpg.key';
      
      navigator.clipboard.writeText(gpgUrl).then(() => {
        // Simple elegant feedback
        const originalHTML = copyGpgBtn.innerHTML;
        copyGpgBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons({
            attrs: {
              class: 'lucide'
            },
            nameAttr: 'data-lucide',
            nodeList: [copyGpgBtn]
          });
        }
        
        setTimeout(() => {
          copyGpgBtn.innerHTML = originalHTML;
          if (typeof lucide !== 'undefined') {
            lucide.createIcons({
              attrs: {
                class: 'lucide'
              },
              nameAttr: 'data-lucide',
              nodeList: [copyGpgBtn]
            });
          }
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // --- Scroll Reveal Animation ---
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('active');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  // Run on load and on scroll
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Initial run to reveal elements already in view
  setTimeout(handleScrollAnimation, 150);
});
