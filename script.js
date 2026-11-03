/**
 * AUSTRALIAN LUXURY ARCHITECTURAL HOMES — MASTER SCRIPT
 * Hero Carousel, Category Filter Engine, Accordion & Inquiry Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroSlider();
  initVisionAnimation();
  initDisplayCarousel();
  initDesignFilters();
  initInclusionsCarousel();
  initInclusionModal();
  initFaqAccordion();
  initContactForm();
  initSmoothScroll();
  initBookingModal();
  initNewsletterForm();
  initGazetteForm();
});

/* ==========================================================================
   1. Navbar Scroll State & Mobile Toggle
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    menu?.classList.toggle('is-open');
  });

  // Close menu when clicking any nav link
  menu?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.remove('is-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!header?.contains(e.target)) {
      menu?.classList.remove('is-open');
    }
  });
}

/* ==========================================================================
   2. Premium Hero Slider
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide-item');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow-btn.prev');
  const nextBtn = document.querySelector('.hero-arrow-btn.next');
  const showcase = document.querySelector('.hero-showcase');

  if (!slides.length) return;

  let currentIdx = 0;
  const total = slides.length;
  let autoplayTimer = null;
  const slideDuration = 7000;

  function showSlide(index) {
    currentIdx = (index + total) % total;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIdx);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIdx);
    });
  }

  function nextSlide() {
    showSlide(currentIdx + 1);
  }

  function prevSlide() {
    showSlide(currentIdx - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, slideDuration);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.slide || '0', 10);
      showSlide(idx);
      startAutoplay();
    });
  });

  showcase?.addEventListener('mouseenter', stopAutoplay);
  showcase?.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  showSlide(0);
  startAutoplay();
}

/* ==========================================================================
   2.2. "Building Your Vision" Section Title Animation
   ========================================================================== */
function initVisionAnimation() {
  const visionTitle = document.querySelector('.vision-title');
  if (!visionTitle) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visionTitle.classList.add('in-view');
          observer.unobserve(visionTitle);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(visionTitle);
  } else {
    visionTitle.classList.add('in-view');
  }
}

/* ==========================================================================
   2.5. Flagship Display Homes Luxury Carousel
   ========================================================================== */
function initDisplayCarousel() {
  const track = document.getElementById('display-carousel-track');
  const prevBtn = document.getElementById('display-prev-btn');
  const nextBtn = document.getElementById('display-next-btn');
  const counterCurr = document.getElementById('display-counter-curr');
  const counterTotal = document.getElementById('display-counter-total');
  const dotsContainer = document.getElementById('display-carousel-dots');

  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.display-card'));
  if (!cards.length) return;

  // Set total counter
  if (counterTotal) {
    counterTotal.textContent = String(cards.length).padStart(2, '0');
  }

  // Generate pagination dots dynamically
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((card, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `display-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Navigate to display residence ${idx + 1}`);
      dot.addEventListener('click', () => {
        scrollToCard(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.display-dot')) : [];

  function getStep() {
    if (!cards.length) return 380;
    const cardRect = cards[0].getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 32;
    return cardRect.width + gap;
  }

  function getActiveIndex() {
    const step = getStep();
    const index = Math.round(track.scrollLeft / step);
    return Math.max(0, Math.min(cards.length - 1, index));
  }

  function scrollToCard(index) {
    const step = getStep();
    const targetLeft = index * step;
    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
  }

  function updateActiveState() {
    const activeIdx = getActiveIndex();

    if (counterCurr) {
      counterCurr.textContent = String(activeIdx + 1).padStart(2, '0');
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIdx);
    });
  }

  // Prev / Next button actions
  prevBtn?.addEventListener('click', () => {
    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    }
  });

  nextBtn?.addEventListener('click', () => {
    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step, behavior: 'smooth' });
    }
  });

  // Track scroll listener with debounced requestAnimationFrame
  let isScrolling = false;
  track.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateActiveState();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // Mouse Drag to Scroll for Desktop luxury experience
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let draggedDistance = 0;

  track.addEventListener('mousedown', (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    isDown = true;
    draggedDistance = 0;
    track.style.cursor = 'grabbing';
    track.style.scrollBehavior = 'auto';
    track.style.scrollSnapType = 'none';
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.style.cursor = '';
    track.style.scrollBehavior = 'smooth';
    track.style.scrollSnapType = 'x mandatory';

    const activeIdx = getActiveIndex();
    scrollToCard(activeIdx);
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    draggedDistance = Math.abs(walk);
    track.scrollLeft = scrollLeftStart - walk;
  });

  // Prevent accidental link trigger when user drags
  track.addEventListener('click', (e) => {
    if (draggedDistance > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Keyboard navigation when hovering
  let isHovered = false;
  track.addEventListener('mouseenter', () => { isHovered = true; });
  track.addEventListener('mouseleave', () => { isHovered = false; });

  window.addEventListener('keydown', (e) => {
    if (!isHovered) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextBtn?.click();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevBtn?.click();
    }
  });

  // Window resize re-calculation
  window.addEventListener('resize', () => {
    updateActiveState();
  });

  // Initial state
  updateActiveState();
}

/* ==========================================================================
   3. "Our Home Designs" Category Filter Engine
   ========================================================================== */
function initDesignFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const designCards = document.querySelectorAll('.home-design-card');

  if (!filterBtns.length || !designCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const category = (btn.dataset.filter || 'all').toLowerCase();

      designCards.forEach(card => {
        const cardTokens = (card.dataset.category || '').toLowerCase().split(/\s+/);
        const matches = (category === 'all' || cardTokens.includes(category));

        if (matches) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   4. "Inclusions / Luxury Finishes & Craftsmanship" Carousel
   ========================================================================== */
function initInclusionsCarousel() {
  const track = document.getElementById('inclusions-carousel-track');
  const prevBtn = document.getElementById('inclusions-prev-btn');
  const nextBtn = document.getElementById('inclusions-next-btn');
  const counterCurr = document.getElementById('inclusions-counter-curr');
  const counterTotal = document.getElementById('inclusions-counter-total');
  const dotsContainer = document.getElementById('inclusions-carousel-dots');

  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.inclusion-card'));
  const totalCards = cards.length;
  if (totalCards === 0) return;

  if (counterTotal) {
    counterTotal.textContent = String(totalCards).padStart(2, '0');
  }

  // Create pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to inclusion slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        scrollToCard(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function getActiveIndex() {
    const scrollLeft = track.scrollLeft;
    let closestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    return closestIdx;
  }

  function scrollToCard(index) {
    const clamped = Math.max(0, Math.min(index, totalCards - 1));
    const targetCard = cards[clamped];
    if (targetCard) {
      const targetScroll = targetCard.offsetLeft - track.offsetLeft;
      track.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  function updateActiveState() {
    const activeIdx = getActiveIndex();
    if (counterCurr) {
      counterCurr.textContent = String(activeIdx + 1).padStart(2, '0');
    }
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
        dot.setAttribute('aria-current', idx === activeIdx ? 'true' : 'false');
      });
    }
  }

  // Prev / Next button listeners with circular loop
  prevBtn?.addEventListener('click', () => {
    const activeIdx = getActiveIndex();
    if (activeIdx <= 0) {
      scrollToCard(totalCards - 1);
    } else {
      scrollToCard(activeIdx - 1);
    }
  });

  nextBtn?.addEventListener('click', () => {
    const activeIdx = getActiveIndex();
    if (activeIdx >= totalCards - 1) {
      scrollToCard(0);
    } else {
      scrollToCard(activeIdx + 1);
    }
  });

  // Track scroll listener with debounced requestAnimationFrame
  let isScrolling = false;
  track.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateActiveState();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // Mouse Drag to Scroll on desktop
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let draggedDistance = 0;

  track.addEventListener('mousedown', (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    isDown = true;
    draggedDistance = 0;
    track.style.cursor = 'grabbing';
    track.style.scrollBehavior = 'auto';
    track.style.scrollSnapType = 'none';
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.style.cursor = '';
    track.style.scrollBehavior = 'smooth';
    track.style.scrollSnapType = 'x mandatory';

    const activeIdx = getActiveIndex();
    scrollToCard(activeIdx);
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    draggedDistance = Math.abs(walk);
    track.scrollLeft = scrollLeftStart - walk;
  });

  track.addEventListener('click', (e) => {
    if (draggedDistance > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Resize listener
  window.addEventListener('resize', () => {
    updateActiveState();
  });

  // Initial state
  updateActiveState();
}

/* ==========================================================================
   5. Inclusion Details & Photo Gallery Lightbox Modal
   ========================================================================== */
function initInclusionModal() {
  const modal = document.getElementById('inclusion-modal');
  const closeBtn = document.getElementById('inclusion-modal-close');
  const modalMainImg = document.getElementById('modal-main-img');
  const modalImgCaption = document.getElementById('modal-img-caption');
  const modalThumbsRow = document.getElementById('modal-thumbs-row');
  const modalBadge = document.getElementById('modal-category-badge');
  const modalTitle = document.getElementById('inclusion-modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features-items');

  if (!modal) return;

  const galleryData = {
    kitchen: {
      category: 'CULINARY SUITE',
      title: 'Chef-Grade Kitchens & Scullery',
      desc: 'Designed for effortless everyday dining and grand entertaining, our culinary suites feature commercial-grade Sub-Zero integrated cooling, Wolf dual-fuel cooktops, 80mm mitred marble or quartz islands, and a separate butler\'s pantry with its own dishwasher and sink.',
      features: [
        'Sub-Zero 914mm integrated column refrigerator and freezer',
        'Wolf 6-burner gas cooktop with dual convection ovens',
        '80mm hand-finished natural marble or quartz island bench',
        'Fully concealed butler\'s pantry with secondary dishwasher & sink',
        'Blum soft-close soft-touch cabinetry with custom fluted timber accents',
        'Zip HydroTap offering instant boiling, chilled, and sparkling water'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80',
          caption: 'Grand Marble Island with Integrated Wolf Cooktop'
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=200&q=80',
          caption: 'Walk-In Butler\'s Scullery with Prep Station'
        },
        {
          url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=200&q=80',
          caption: 'Sub-Zero Seamless Integrated Joinery & Bar Station'
        }
      ]
    },
    ensuite: {
      category: 'WELLNESS BATHROOMS',
      title: 'Resort Master Ensuites',
      desc: 'Step into your own private spa sanctuary. Every master ensuite includes freestanding stone baths, frameless dual rainfall showers, gentle hydronic floor warming, and artisan tapware designed for ultimate relaxation.',
      features: [
        'Freestanding organic volcanic limestone soaking bathtub',
        'Walk-in frameless dual rain shower with integrated wall seating',
        'Thermostatically controlled underfloor tile heating throughout',
        'Double floating vanities with fluted timber and stone tops',
        'Brushed brass or aged bronze architectural tapware',
        'Heated towel ladders and backlit defogging vanity mirrors'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
          caption: 'Freestanding Limestone Bath & Floor-to-Ceiling Travertine'
        },
        {
          url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=200&q=80',
          caption: 'Dual Rain Shower with Brushed Brass Tapware'
        },
        {
          url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=200&q=80',
          caption: 'Fluted Oak Vanity with Soft Ambient Backlighting'
        }
      ]
    },
    alfresco: {
      category: 'AUSTRALIAN ALFRESCO',
      title: 'Seamless Outdoor Living',
      desc: 'Engineered specifically for Australia\'s climate, our outdoor entertainment spaces connect your living room and kitchen directly to the garden and pool with zero-threshold sliding glass doors.',
      features: [
        'Motorized opening roof louvre system with automatic rain sensors',
        'Integrated outdoor kitchen with stainless barbecue & bar fridge',
        'Flush-finish travertine or porcelain paving with zero-step doors',
        'Mineral plunge pool or lap pool with glass pool fencing',
        'Concealed infrared ceiling heaters for year-round comfort',
        'Automated motorized insect and sun screens built into walls'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=200&q=80',
          caption: 'Covered Alfresco Terrace with Built-In BBQ & Dining'
        },
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80',
          caption: 'Infinity Plunge Pool with Seamless Zero-Step Threshold'
        },
        {
          url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80',
          caption: 'Integrated Night Illumination & Garden Landscaping'
        }
      ]
    },
    automation: {
      category: 'INTELLIGENT HOME',
      title: 'Smart Automation & Lighting',
      desc: 'Control your entire home with a single tap or voice command. From setting ambient dinner lighting to managing air conditioning across separate rooms and locking doors when you leave.',
      features: [
        'Whole-home KNX smart automation with one-touch custom scenes',
        'Multi-zone reverse-cycle climate control with smartphone access',
        'Keyless entry with fingerprint biometric and PIN door locks',
        'Smart intercom with HD video streaming to your mobile phone',
        'Architectural lighting control with smooth dimming curves',
        'Pre-wired electric vehicle (EV) 3-phase fast charger in garage'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=200&q=80',
          caption: 'Wall-Mounted Touchscreen Control Panel & Keypad'
        },
        {
          url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=200&q=80',
          caption: 'Curated Evening Lighting Scene Across Living Spaces'
        },
        {
          url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=200&q=80',
          caption: 'Smartphone Remote Access & Automated Security'
        }
      ]
    },
    wardrobe: {
      category: 'DRESSING & ROBES',
      title: 'Master Dressing Suites',
      desc: 'Modeled after the world\'s most luxurious boutique hotels, our walk-in dressing rooms keep your clothing, shoes, and jewelry impeccably organized with custom timber joinery and gentle interior illumination.',
      features: [
        'Full floor-to-ceiling custom timber wardrobes with flush doors',
        'Concealed warm-white LED strip lighting in every hanging bay',
        'Velvet-lined pull-out drawers for watches, sunglasses, and jewelry',
        'Dedicated shoe display shelves with angled display rails',
        'Central dressing island with soft-close accessory compartments',
        'Full-length backlit dressing mirror with premium anti-distortion glass'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=200&q=80',
          caption: 'Custom Floor-to-Ceiling Walk-In Robe Joinery'
        },
        {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80',
          caption: 'LED Backlit Shoe Gallery & Accessory Island'
        },
        {
          url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80',
          caption: 'Velvet-Lined Drawers for Watches and Fine Jewelry'
        }
      ]
    },
    glazing: {
      category: 'ENERGY & ACOUSTICS',
      title: 'Acoustic & Thermal Glazing',
      desc: 'Enjoy calm, whisper-quiet rooms and comfortable year-round temperatures. High-grade double glazing and sound-insulating wall batts protect your home from outside street noise and hot summer sun.',
      features: [
        'Thermally broken aluminum window frames with high-performance double glazing',
        'Acoustic insulation batts in all internal bedroom, media, and bathroom walls',
        'Solid-core 2340mm timber interior doors with magnetic acoustic seals',
        'Low-E glass coating blocking up to 78% of radiant solar heat',
        'Commercial heavy-duty sliding door tracks for effortless gliding',
        'Engineered 7-Star minimum NatHERS energy efficiency compliance'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80',
          caption: 'Floor-to-Ceiling Thermally Broken Double Glazed Glass'
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
          caption: 'Acoustic Quiet Interiors with Seamless Garden Views'
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
          thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80',
          caption: 'High Performance Low-E Windows for Climate Comfort'
        }
      ]
    }
  };

  function openModal(categoryKey) {
    const data = galleryData[categoryKey] || galleryData.kitchen;

    if (modalBadge) modalBadge.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    }

    if (modalThumbsRow) {
      modalThumbsRow.innerHTML = '';
      data.images.forEach((img, idx) => {
        const thumbBtn = document.createElement('button');
        thumbBtn.type = 'button';
        thumbBtn.className = `modal-thumb-btn ${idx === 0 ? 'is-active' : ''}`;
        thumbBtn.setAttribute('aria-label', `View image ${idx + 1}: ${img.caption}`);
        thumbBtn.innerHTML = `<img src="${img.thumb}" alt="${img.caption}" loading="lazy">`;
        thumbBtn.addEventListener('click', () => {
          setActiveImage(data.images, idx);
        });
        modalThumbsRow.appendChild(thumbBtn);
      });
    }

    setActiveImage(data.images, 0);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function setActiveImage(images, index) {
    const currentImg = images[index] || images[0];
    if (modalMainImg) {
      modalMainImg.style.opacity = '0.3';
      setTimeout(() => {
        modalMainImg.src = currentImg.url;
        modalMainImg.alt = currentImg.caption;
        modalMainImg.style.opacity = '1';
      }, 150);
    }
    if (modalImgCaption) {
      modalImgCaption.textContent = currentImg.caption;
    }
    if (modalThumbsRow) {
      const thumbs = modalThumbsRow.querySelectorAll('.modal-thumb-btn');
      thumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('is-active', idx === index);
      });
    }
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Hook all buttons with data-gallery
  const openButtons = document.querySelectorAll('.inclusion-photo-btn');
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-gallery');
      if (cat) {
        openModal(cat);
      }
    });
  });

  // Close triggers
  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Close modal when clicking anchor inside modal (e.g. Enquire button)
  const enquireBtn = document.getElementById('modal-enquire-btn');
  enquireBtn?.addEventListener('click', () => {
    closeModal();
  });
}

/* ==========================================================================
   6. Interactive FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        if (body) body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (body) body.style.maxHeight = `${body.scrollHeight + 30}px`;
      }
    });
  });
}

/* ==========================================================================
   5. Consultation Booking Form Submit
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-booking-form');
  const formSide = document.querySelector('.contact-form-side');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (formSide) {
      formSide.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: #FAF7F2; border: 2px solid #B59458; color: #B59458; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem;">
            ✓
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: #B59458; font-weight: 700; display: block; margin-bottom: 0.5rem;">
            INQUIRY REGISTERED
          </span>
          <h3 style="font-family: var(--font-editorial); font-size: 2.2rem; color: #1C1917; margin-bottom: 1rem;">
            Thank You for Connecting
          </h3>
          <p style="color: #57534E; font-size: 1.05rem; line-height: 1.8; max-width: 480px; margin: 0 auto 2rem;">
            Your site feasibility appraisal has been routed to our Managing Director. We will review your homesite parameters and connect with you within 24 business hours.
          </p>
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: #78716C;">
            Direct Concierge: <strong>1300 889 204</strong> (Strictly Confidential)
          </div>
        </div>
      `;
    }
  });
}

/* ==========================================================================
   6. Smooth Anchor Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   7. VIP Booking & Inquiry Popup Modal
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('.modal-close-btn, [data-modal-close]');
  const form = document.getElementById('vip-booking-form');
  const successBox = document.getElementById('booking-success-box');
  const openButtons = document.querySelectorAll('.btn-open-booking, [data-open-modal="booking"], a[href="#book-inspection"], a[href="#book-walkthrough"], a[href="#booking-modal"]');

  function openModal(defaultProperty = '') {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (defaultProperty) {
      const select = modal.querySelector('#booking-property-select');
      if (select) {
        for (let opt of select.options) {
          if (opt.value.toLowerCase().includes(defaultProperty.toLowerCase()) || opt.text.toLowerCase().includes(defaultProperty.toLowerCase())) {
            select.value = opt.value;
            break;
          }
        }
      }
    }
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prop = btn.getAttribute('data-property') || document.title.split('—')[0].trim();
      openModal(prop);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form) form.style.display = 'none';
    if (successBox) successBox.classList.add('is-shown');
  });
}

/* ==========================================================================
   8. Private Newsletter / Architectural Journal Subscription
   ========================================================================== */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form-box');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const email = input?.value || '';
      if (!email) return;

      form.innerHTML = `
        <div style="background: rgba(181, 148, 88, 0.18); border: 1px solid var(--accent-gold); border-radius: 999px; padding: 0.85rem 1.6rem; color: #fff; font-size: 0.88rem; display: flex; align-items: center; gap: 0.6rem;">
          <span style="color: var(--accent-gold-light); font-size: 1.1rem; font-weight: bold;">✓</span>
          <span>Thank you. You have been added to the private AURA Gazette.</span>
        </div>
      `;
    });
  });
}

/* ==========================================================================
   9. Colorful Gazette & Lookbook Form Handler
   ========================================================================== */
function initGazetteForm() {
  const form = document.getElementById('gazette-form');
  const success = document.getElementById('gazette-success');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
    });
  }
}


