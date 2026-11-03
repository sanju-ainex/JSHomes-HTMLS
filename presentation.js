/**
 * EXECUTIVE PRESENTATION HUB - CLIENT SHOWCASE ENGINE
 * Live Design Switcher, Device Frame Sizing & Deep Linking
 * EXECUTIVE CLIENT PRESENTATION SUITE — AUSTRALIA
 * Switcher Engine & Dynamic Device Frame Resizer
 */

document.addEventListener('DOMContentLoaded', () => {
  initPresentationHub();
  initPresentationSuite();
});

function initPresentationHub() {
  const conceptBtns = document.querySelectorAll('.concept-btn');
  const deviceBtns = document.querySelectorAll('.device-btn');
  const iframe = document.getElementById('preview-iframe');
  const deviceShell = document.getElementById('device-frame-shell');
  const urlBar = document.getElementById('frame-url-bar');
  const openTabBtn = document.getElementById('btn-open-tab');

  const conceptNameTag = document.getElementById('concept-name-tag');
  const conceptAesthetic = document.getElementById('concept-aesthetic');
  const conceptTarget = document.getElementById('concept-target');
  const quickLinksContainer = document.getElementById('quick-links-group');
  function initPresentationSuite() {
    const conceptBtns = document.querySelectorAll('.exec-concept-btn');
    const deviceBtns = document.querySelectorAll('.exec-device-btn');
    const iframe = document.getElementById('exec-preview-iframe');
    const frameBezel = document.getElementById('exec-frame-bezel');
    const urlField = document.getElementById('exec-url-field');
    const openTabBtn = document.getElementById('exec-open-btn');

    // Metadata for both concepts
    const conceptsData = {
      const bannerTitle = document.getElementById('exec-banner-title');
      const bannerDesc = document.getElementById('exec-banner-desc');
      const quickLinksGroup = document.getElementById('exec-quick-links');

      const concepts = {
        'design-1': {
          name: "Concept 1: AURA Architectural Homes",
          aesthetic: "Monolithic Organic Luxury • Dark Bronze & Travertine",
          target: "Trophy home buyers in Sydney Harbour (Vaucluse, Mosman), Melbourne Toorak, & Byron Hinterland.",
          title: "CONCEPT 01: KRONOS ARCHITECTURAL HOMES",
          desc: "Monolithic Brutalism & Raw Luxury • Off-Form Concrete, Aged Gold (#D4AF37), Vein-Cut Travertine & Spotted Gum.",
          baseUrl: "design-1/index.html",
          pages: [
            { label: "Home Showcase", url: "design-1/index.html" },
            { label: "Residences (Portfolio)", url: "design-1/residences.html" },
            { label: "The Craft (5-Stage Method)", url: "design-1/process.html" },
            { label: "Private Briefing & Estimator", url: "design-1/contact.html" }
        { label: "Manifesto (Home)", url: "design-1/index.html" },
            { label: "Residences Folio", url: "design-1/residences.html" },
            { label: "Engineering Method", url: "design-1/process.html" },
            { label: "Private Commission", url: "design-1/contact.html" }
          ]
        },
        'design-2': {
          name: "Concept 2: MERIDIAN Coastal Residences",
          aesthetic: "Sun-Drenched Coastal Modernism • Warm Sand & Brushed Brass",
          target: "Affluent coastal lifestyle clients in Palm Beach, Sorrento, Noosa, & Cottesloe.",
          title: "CONCEPT 02: SOLIS COASTAL RESIDENCES",
          desc: "Sun-Drenched Coastal Modernism • Sunlit Linen (#F7F4EE), Hawkesbury Sandstone, Brushed Champagne Brass (#C89B7B).",
          baseUrl: "design-2/index.html",
          pages: [
            { label: "Overview Showcase", url: "design-2/index.html" },
            { label: "Collections & Floorplans", url: "design-2/collections.html" },
            { label: "The Sovereign Journey", url: "design-2/journey.html" },
            { label: "VIP Land Appraisal", url: "design-2/consultation.html" }
        { label: "Overview (Home)", url: "design-2/index.html" },
            { label: "Signatures Folio", url: "design-2/collections.html" },
            { label: "Sovereign Journey", url: "design-2/journey.html" },
            { label: "Private Feasibility", url: "design-2/consultation.html" }
          ]
        }
      };

      let activeConcept = 'design-1';

      function updateConcept(conceptId) {
        activeConcept = conceptId;
    const data = conceptsData[conceptId];
    function switchConcept(id) {
      activeConcept = id;
      const data = concepts[id];
      if (!data) return;

      // Update buttons
      conceptBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.concept === conceptId);
        btn.classList.toggle('active', btn.dataset.concept === id);
      });

      // Update iframe and UI
      if (iframe) iframe.src = data.baseUrl;
      if (urlBar) urlBar.textContent = `https://australian-luxury-builders.com.au/${data.baseUrl}`;
      if (urlField) urlField.textContent = `https://australian-luxury-builders.com.au/${data.baseUrl}`;
      if (openTabBtn) openTabBtn.href = data.baseUrl;
      if (conceptNameTag) conceptNameTag.textContent = data.name;
      if (conceptAesthetic) conceptAesthetic.textContent = data.aesthetic;
      if (conceptTarget) conceptTarget.textContent = data.target;
      if (bannerTitle) bannerTitle.textContent = data.title;
      if (bannerDesc) bannerDesc.textContent = data.desc;

      // Render quick link chips
      if (quickLinksContainer) {
        quickLinksContainer.innerHTML = '';
        // Render quick jump chips
        if (quickLinksGroup) {
          quickLinksGroup.innerHTML = '';
          data.pages.forEach(p => {
            const link = document.createElement('a');
            link.className = 'quick-link-chip';
            link.href = '#';
            link.textContent = p.label;
            link.addEventListener('click', (e) => {
              const a = document.createElement('a');
              a.className = 'exec-chip';
              a.href = '#';
              a.textContent = p.label;
              a.addEventListener('click', (e) => {
                e.preventDefault();
                if (iframe) iframe.src = p.url;
                if (urlBar) urlBar.textContent = `https://australian-luxury-builders.com.au/${p.url}`;
                if (urlField) urlField.textContent = `https://australian-luxury-builders.com.au/${p.url}`;
                if (openTabBtn) openTabBtn.href = p.url;
              });
              quickLinksContainer.appendChild(link);
              quickLinksGroup.appendChild(a);
            });
          }
  }

        // Concept switcher listeners
        conceptBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const c = btn.dataset.concept;
            updateConcept(c);
            switchConcept(btn.dataset.concept);
          });
        });

        // Device switcher listeners
        deviceBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            deviceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const device = btn.dataset.device;
            if (deviceShell) {
              deviceShell.className = `device-frame-shell ${device}`;
              const dev = btn.dataset.device;
              if (frameBezel) {
                frameBezel.className = `exec-frame-bezel ${dev}`;
              }
            });
        });

        // Listen to external triggers (from comparison matrix)
        window.switchShowcaseConcept = function (conceptId) {
          updateConcept(conceptId);
          window.selectConceptAndScroll = function (id) {
            switchConcept(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };

          // Initial load
          updateConcept('design-1');
          switchConcept('design-1');
        }

