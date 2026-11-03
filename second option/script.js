/**
 * JS CONSTRUCTION SYDNEY — SECOND OPTION: L'ATELIER LUMIÈRE
 * Premium Interactive Scripts & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navigation Header ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- 2. Cinematic Hero Slider ---
  const slides = document.querySelectorAll('.hero-slide-canvas');
  const slideTabs = document.querySelectorAll('.hero-slide-tab');
  const hudTitle = document.querySelector('.hero-hud-title');
  const hudStats = document.querySelector('.hero-hud-stats');
  const hudLabel = document.querySelector('.hero-hud-label');

  const slideData = [
    {
      name: 'The Mosman Travertine Villa',
      label: 'CURRENT COMMISSION · MOSMAN',
      stats: '640 m² Internal · 5 Bed · 5 Bath · 4 Car · Harbour Horizon'
    },
    {
      name: 'The Vaucluse Light Pavilion',
      label: 'CURRENT COMMISSION · VAUCLUSE',
      stats: '820 m² Internal · 6 Bed · 6 Bath · 4 Car · Reflection Atrium'
    },
    {
      name: 'The Bronte Coastal Sanctuary',
      label: 'CURRENT COMMISSION · BRONTE',
      stats: '580 m² Internal · 4 Bed · 4 Bath · 3 Car · Headland Vista'
    }
  ];

  let currentSlide = 0;
  let slideInterval = null;

  function setActiveSlide(index) {
    if (slides.length === 0) return;
    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    slideTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    if (hudTitle && slideData[index]) {
      hudTitle.textContent = slideData[index].name;
      if (hudLabel) hudLabel.textContent = slideData[index].label;
      if (hudStats) hudStats.textContent = slideData[index].stats;
    }
  }

  function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(() => {
      let next = (currentSlide + 1) % slides.length;
      setActiveSlide(next);
    }, 6000);
  }

  function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  slideTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      setActiveSlide(i);
      startSlideTimer();
    });
  });

  startSlideTimer();

  // --- 3. Home Designs Filtering ---
  const filterTabs = document.querySelectorAll('.tab-capsule-btn');
  const designCards = document.querySelectorAll('.design-blueprint-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      designCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 4. Interactive Lookbook Download Form ---
  const lookbookForm = document.getElementById('lookbook-form');
  const toastFeedback = document.getElementById('toast-feedback');

  function showToast(message) {
    if (!toastFeedback) return;
    toastFeedback.textContent = message;
    toastFeedback.classList.add('show');
    setTimeout(() => {
      toastFeedback.classList.remove('show');
    }, 4500);
  }

  if (lookbookForm) {
    lookbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = lookbookForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.includes('@')) {
        showToast('Exclusive 2026 Lookbook dispatched to ' + emailInput.value);
        emailInput.value = '';
      } else {
        showToast('Please enter a valid email address.');
      }
    });
  }

  // --- 5. Interactive FAQ Accordion ---
  const faqBoxes = document.querySelectorAll('.faq-drawer-unit');
  faqBoxes.forEach(box => {
    const trigger = box.querySelector('.faq-button-trigger');
    trigger?.addEventListener('click', () => {
      const isOpen = box.classList.contains('open');
      faqBoxes.forEach(b => b.classList.remove('open'));
      if (!isOpen) {
        box.classList.add('open');
      }
    });
  });

  // --- 6. Consultation Booking Form ---
  const consultForm = document.getElementById('consult-booking-form');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('consult-name')?.value || 'Client';
      showToast(`Thank you, ${name}. Our Principal Architect will contact you within 24 hours.`);
      consultForm.reset();
    });
  }

  // --- 7. Blueprint Modal ---
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpecs = document.getElementById('modal-specs');
  const blueprintTriggers = document.querySelectorAll('.btn-view-blueprint');

  blueprintTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Architectural Residence';
      const specs = btn.getAttribute('data-specs') || '5 Bed · 5 Bath · 4 Car · 680 m²';
      const desc = btn.getAttribute('data-desc') || 'Bespoke architectural layout optimized for natural cross-ventilation, light voids, and entertaining pavilions.';

      if (modalTitle) modalTitle.textContent = title;
      if (modalSpecs) modalSpecs.textContent = specs;
      if (modalDesc) modalDesc.textContent = desc;

      modalOverlay?.classList.add('active');
    });
  });

  modalCloseBtn?.addEventListener('click', () => {
    modalOverlay?.classList.remove('active');
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // --- 8. Display Pavilions 3-Per-View Architectural Carousel ---
  const pavilionsTrack = document.getElementById('pavilions-track');
  const pavilionsPrevBtn = document.getElementById('pavilions-prev');
  const pavilionsNextBtn = document.getElementById('pavilions-next');
  const pavilionsDotsContainer = document.getElementById('pavilions-dots');
  const pavilionItems = document.querySelectorAll('.pavilion-item-frame');

  if (pavilionsTrack && pavilionItems.length > 0) {
    let currentPavilionIndex = 0;

    function getVisibleCount() {
      const width = window.innerWidth;
      if (width <= 640) return 1;
      if (width <= 1100) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, pavilionItems.length - getVisibleCount());
    }

    function renderDots() {
      if (!pavilionsDotsContainer) return;
      const totalSteps = getMaxIndex() + 1;
      pavilionsDotsContainer.innerHTML = '';
      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('span');
        dot.className = `carousel-dot${i === currentPavilionIndex ? ' active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToPavilionIndex(i);
        });
        pavilionsDotsContainer.appendChild(dot);
      }
    }

    function updatePavilionsCarousel() {
      const maxIdx = getMaxIndex();
      if (currentPavilionIndex > maxIdx) {
        currentPavilionIndex = maxIdx;
      }
      if (currentPavilionIndex < 0) {
        currentPavilionIndex = 0;
      }

      const firstItem = pavilionItems[0];
      const itemWidth = firstItem.getBoundingClientRect().width;
      const computedGap = parseFloat(getComputedStyle(pavilionsTrack).gap) || 28.8;
      const shiftX = currentPavilionIndex * (itemWidth + computedGap);

      pavilionsTrack.style.transform = `translateX(-${shiftX}px)`;

      // Update dots
      const dots = pavilionsDotsContainer?.querySelectorAll('.carousel-dot') || [];
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentPavilionIndex);
      });
    }

    function goToPavilionIndex(index) {
      currentPavilionIndex = index;
      updatePavilionsCarousel();
    }

    pavilionsPrevBtn?.addEventListener('click', () => {
      const maxIdx = getMaxIndex();
      if (currentPavilionIndex > 0) {
        currentPavilionIndex--;
      } else {
        currentPavilionIndex = maxIdx;
      }
      updatePavilionsCarousel();
    });

    pavilionsNextBtn?.addEventListener('click', () => {
      const maxIdx = getMaxIndex();
      if (currentPavilionIndex < maxIdx) {
        currentPavilionIndex++;
      } else {
        currentPavilionIndex = 0;
      }
      updatePavilionsCarousel();
    });

    // Touch / Swipe Navigation
    let touchStartX = 0;
    let touchEndX = 0;

    pavilionsTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    pavilionsTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          pavilionsNextBtn?.click();
        } else {
          pavilionsPrevBtn?.click();
        }
      }
    }, { passive: true });

    // Handle resize
    window.addEventListener('resize', () => {
      renderDots();
      updatePavilionsCarousel();
    }, { passive: true });

    // Initial render
    renderDots();
    updatePavilionsCarousel();
  }

});
