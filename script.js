// Performance optimization utilities
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Phase Details Data
const phaseDetails = {
  1: {
    title: "Pre-Check Phase",
    duration: "2 Days",
    description: "Validate business readiness and establish project foundation",
    process: [
      {
        title: "Contract Validation",
        description: "Verify contracts are signed and credit checks passed",
      },
      {
        title: "Campaign Pipeline Assessment",
        description:
          "Assess campaign pipeline and specific launch requirements",
      },
      {
        title: "Contract Review",
        description:
          "Review contract terms for technical implications and constraints",
      },
    ],
    deliverables: [
      "Signed off paperwork and legal documentation",
      "Campaign pipeline assessment with launch requirements",
      "Credit check validation and financial clearance",
    ],
    tools: ["Legal documentation systems", "Financial systems", "Sales CRM"],
    stakeholders: ["Legal", "Finance", "Sales", "DSP business/legal contacts"],
    risk: "Missing business context that affects integration scope",
    mitigation: "Understand campaign context and contract implications upfront",
  },
  2: {
    title: "Scoping Phase",
    duration: "1 Week",
    description:
      "Define technical requirements and create comprehensive integration plan",
    process: [
      {
        title: "Documentation & Expectations",
        description:
          "Provision DSP with DSP documentation and set clear expectations",
      },
      {
        title: "Technical Requirements",
        description:
          "Capture detailed technical requirements via integration questionnaire",
      },
      {
        title: "Capability Assessment",
        description:
          "Confirm DSP capabilities including targeting, deals, and geographic coverage",
      },
      {
        title: "Resource Planning",
        description:
          "Assess internal resource availability (Eng/Data capacity)",
      },
      {
        title: "API Integration Alignment",
        description:
          "Align on additional API integrations beyond basic workflow",
      },
    ],
    deliverables: [
      "Sample bid response from DSP for technical validation",
      "Completed integration questionnaire with technical specifications",
      "Technical documentation review from DSP client",
      "Comprehensive list of DSP contacts across all teams",
      "Test plan based on DSP capabilities and requirements",
      "Screenshots/screen recordings of DSP deal and campaign setup process",
    ],
    tools: [
      "Integration questionnaire",
      "DSP documentation",
      "Confluence",
      "JIRA",
    ],
    stakeholders: [
      "SE",
      "Knowledge Management",
      "Product/Eng",
      "Business Development",
      "DSP Product/Eng",
      "DSP SE",
      "DSP Commercial",
    ],
    risk: "Limited internal/external resources or missing scope requirements",
    mitigation:
      "Secure Eng/Data commitments; prioritize based on campaign pipeline",
  },
  3: {
    title: "Initial Setup Phase",
    duration: "2 Weeks",
    description: "Establish technical connectivity and basic functionality",
    process: [
      {
        title: "DSP Endpoint Setup",
        description:
          "DSP stands up bidder endpoint in development/staging environment",
      },
      {
        title: "Traffic Testing",
        description: "Send test traffic and validate basic connectivity",
      },
      {
        title: "Adapter Development",
        description: "Build buyer adapter based on scoping requirements",
      },
      {
        title: "Creative Validation",
        description: "Test creative markup against IAB and DSP standards",
      },
    ],
    deliverables: [
      "Connectivity report with request volumes, HTTP status codes, and response times",
      "Successful test validation showing bid response meets DSP requirements",
      "Requirements documentation outlining buyer adapter support needs",
    ],
    tools: [
      "Slack channels",
      "JIRA",
      "GitHub/VSCode",
      "Postman",
      "Bid response validator",
    ],
    stakeholders: ["SE", "Product/Eng", "DSP technical teams"],
    risk: "Unconfirmed authentication/IP requirements or lack of engineering commitment for adapter development",
    mitigation:
      "Confirm auth/IP requirements during scoping; secure engineering commitments early to avoid delays",
  },
  4: {
    title: "Basic Transaction Workflow",
    duration: "1 Week",
    description: "Validate end-to-end transaction processing",
    process: [
      {
        title: "Test Traffic",
        description: "Send test traffic with deal IDs and open exchange",
      },
      {
        title: "Performance Analysis",
        description:
          "Compare impressions and spend (~5% allowable discrepancy)",
      },
    ],
    deliverables: [
      "Test report showing minimal discrepancy between expected and actual results",
      "Impression target validation and spend reconciliation",
      "End-to-end transaction processing confirmation",
    ],
    tools: ["Traffic simulator", "Looker/Tableau for delivery data"],
    stakeholders: ["SE", "technical teams"],
    risk: "Proactive communication on delays; involve other SE/Eng if discrepancies persist",
    mitigation:
      "Proactive communication on delays; involve other SE/Eng if discrepancies persist",
  },
  5: {
    title: "Detailed Test Scenarios",
    duration: "2 Weeks",
    description:
      "Execute comprehensive testing across all integration capabilities",
    process: [
      {
        title: "Scenario Testing",
        description:
          "Enable test traffic for specific scenarios including PG deals, targeting, and geographic restrictions",
      },
      {
        title: "Results & Troubleshooting",
        description:
          "Execute comprehensive test plan developed during scoping phase",
      },
      {
        title: "Documentation",
        description:
          "Share detailed results with DSP and collaborate on troubleshooting",
      },
    ],
    deliverables: [
      "Comprehensive test reports for each scenario (pass/fail, total impressions, spend, bid rate)",
      "Completed test plan with all edge cases covered",
      "Updated DSP documentation reflecting tested capabilities",
    ],
    tools: ["Confluence", "JIRA", "TestRail/GDrive"],
    stakeholders: ["SE", "AdOps", "DSP technical teams"],
    risk: "Parallel DSP campaign setup; focus on pipeline requirements; document edge cases",
    mitigation:
      "Parallel DSP campaign setup; focus on pipeline requirements; document edge cases",
  },
  6: {
    title: "Limited Live Traffic",
    duration: "1 Week",
    description:
      "Validate production environment with controlled real-world testing",
    process: [
      {
        title: "Production Configuration",
        description:
          "Update DSP bidder configuration to production environment",
      },
      {
        title: "Pilot Campaign",
        description:
          "Run pilot campaign with low-stakes budget for risk mitigation",
      },
      {
        title: "Monitoring",
        description:
          "Monitor performance closely with ability to halt traffic if issues arise",
      },
    ],
    deliverables: [
      "Production environment validation report",
      "Pilot campaign performance metrics",
      "Risk mitigation documentation",
    ],
    tools: [
      "Datadog/Grafana for observability",
      "Budget safety controls",
      "Performance monitoring",
      "Auto-protection systems",
    ],
    stakeholders: ["SE", "AdOps", "DSP technical teams"],
    risk: "Budget safety - Use small budget, PSA creatives for initial testing",
    mitigation:
      "Monitor endpoint response times with immediate rollback capability; implement automatic throttling if performance degrades",
  },
  7: {
    title: "Go-Live",
    duration: "3 Days",
    description:
      "Execute controlled production rollout with comprehensive monitoring",
    process: [
      {
        title: "Gradual Scaling",
        description:
          "Gradually increase QPS while monitoring performance metrics",
      },
      {
        title: "Rollback Procedures",
        description:
          "Implement rollback procedures if performance issues arise",
      },
      {
        title: "Organization Update",
        description:
          "Update organization on integration completion and capabilities",
      },
      {
        title: "Guide Distribution",
        description: "Distribute DSP activation guides to relevant teams",
      },
    ],
    deliverables: [
      "DSP activation guides for internal teams",
      "Screenshots and documentation from DSP for deal and campaign setup processes",
      "Production rollout confirmation and performance validation",
    ],
    tools: [
      "Performance monitoring",
      "Rollback systems",
      "Communication channels",
    ],
    stakeholders: ["SE", "AdOps", "All internal teams", "DSP teams"],
    risk: "Gradual QPS scaling with real-time monitoring, teams on standby for immediate rollback procedures",
    mitigation:
      "Gradual QPS scaling with real-time monitoring, teams on standby for immediate rollback procedures",
  },
  8: {
    title: "Ongoing Support",
    duration: "Continuous",
    description: "Maintain operational excellence and optimize performance",
    process: [
      {
        title: "Automated Reconciliation",
        description:
          "Implement daily automated billing reconciliation processes",
      },
      {
        title: "Performance Dashboards",
        description:
          "Establish comprehensive endpoint and performance monitoring",
      },
      {
        title: "Knowledge Management",
        description: "Maintain knowledge sharing and documentation updates",
      },
      {
        title: "Commercial Handoff",
        description:
          "Execute commercial handoff and relationship building activities",
      },
    ],
    deliverables: [
      "Monitoring and alerting systems for DSP endpoints",
      "Comprehensive dashboard for DSP-level activity tracking",
      "Automated billing reconciliation processes",
    ],
    tools: [
      "Datadog/Grafana",
      "Automated reconciliation systems",
      "Knowledge management platforms",
    ],
    stakeholders: ["SE", "AdOps", "Eng", "DSP AdOps", "DSP technical teams"],
    risk: "Alert noise vs. actionable metrics; no clear technical support process post-launch",
    mitigation:
      "Automated reconciliation with clear escalation paths; DSP tier system for issue prioritization; actionable alerts with troubleshooting steps and clear responsibilities; coordinated commercial team handoff for account planning",
  },
};

// DOM Elements
const modal = document.getElementById("phaseModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.querySelector(".close");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeTimeline();
  initializeTabs();
  initializeMobileMenu();
  initializeScrollEffects();
  initializeThemeToggle();
  initializeLazyLoading();
});

// Navigation functionality with improved browser compatibility
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Check if smooth scrolling is supported
        if ("scrollBehavior" in document.documentElement.style) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          // Fallback for browsers that don't support smooth scrolling
          const navbarHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight - 20;

          // Use requestAnimationFrame for smooth animation fallback
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 500;
          let start = null;

          function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);

            // Easing function for smooth animation
            const easeInOutCubic =
              percentage < 0.5
                ? 4 * percentage * percentage * percentage
                : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

            window.scrollTo(0, startPosition + distance * easeInOutCubic);

            if (progress < duration) {
              requestAnimationFrame(step);
            }
          }

          requestAnimationFrame(step);
        }
      }
    });
  });
}

// Timeline functionality with detailed phase modals
function initializeTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    item.addEventListener("click", function () {
      const stageNumber = parseInt(this.getAttribute("data-stage"));
      openPhaseModal(stageNumber);
    });
  });
}

// Open phase modal with detailed information
function openPhaseModal(stageNumber) {
  const phase = phaseDetails[stageNumber];
  if (!phase) return;

  const modal = document.getElementById("phaseModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${phase.title}</h2>
            <div class="modal-duration">${phase.duration}</div>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div class="phase-section">
                <h3><i class="fas fa-info-circle"></i>Description</h3>
                <p>${phase.description}</p>
            </div>
            
            <div class="phase-section">
                <h3><i class="fas fa-tasks"></i>Process Steps</h3>
                <div class="phase-grid">
                    ${phase.process
                      .map(
                        (step) => `
                        <div class="phase-step">
                            <h4>${step.title}</h4>
                            <p>${step.description}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="phase-section">
                <h3><i class="fas fa-check-circle"></i>Key Deliverables</h3>
                <ul>
                    ${phase.deliverables
                      .map((deliverable) => `<li>${deliverable}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="phase-section">
                <h3><i class="fas fa-tools"></i>Essential Tools</h3>
                <div class="stakeholder-list">
                    ${phase.tools
                      .map(
                        (tool) => `<span class="stakeholder-tag">${tool}</span>`
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="phase-section">
                <h3><i class="fas fa-users"></i>Key Stakeholders</h3>
                <div class="stakeholder-list">
                    ${phase.stakeholders
                      .map(
                        (stakeholder) =>
                          `<span class="stakeholder-tag">${stakeholder}</span>`
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="risk-mitigation">
                <div class="risk-box">
                    <h4>Key Risk</h4>
                    <p>${phase.risk}</p>
                </div>
                <div class="mitigation-box">
                    <h4>Mitigation</h4>
                    <p>${phase.mitigation}</p>
                </div>
            </div>
        </div>
    `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Add event listeners for the new close button
  const newCloseButton = modal.querySelector(".close");
  newCloseButton.addEventListener("click", closePhaseModal);
}

// Close phase modal
function closePhaseModal() {
  const modal = document.getElementById("phaseModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      const tabContainer = this.closest(".section");

      // Remove active class from all buttons in this container
      const containerButtons = tabContainer.querySelectorAll(".tab-button");
      containerButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Hide all tab panes in this container
      const tabPanes = tabContainer.querySelectorAll(".tab-pane");
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Show selected tab pane
      const selectedPane = tabContainer.querySelector(`#${tabId}`);
      if (selectedPane) {
        selectedPane.classList.add("active");
      }
    });
  });
}

// Mobile menu functionality with improved compatibility
function initializeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    // Use both click and touch events for better mobile support
    const toggleMenu = function (e) {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    hamburger.addEventListener("click", toggleMenu);
    hamburger.addEventListener("touchstart", toggleMenu, { passive: false });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      const closeMenu = function () {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
      };

      link.addEventListener("click", closeMenu);
      link.addEventListener("touchstart", closeMenu, { passive: true });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

// Scroll effects
function initializeScrollEffects() {
  // Navbar background on scroll with theme support - throttled for performance
  const throttledScrollHandler = throttle(function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 100) {
      // Add scrolled class for CSS styling
      navbar.classList.add("scrolled");
    } else {
      // Remove scrolled class
      navbar.classList.remove("scrolled");
    }
  }, 16); // ~60fps

  window.addEventListener("scroll", throttledScrollHandler, { passive: true });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".overview-card, .timeline-item, .stakeholder-card, .tool-category, .deliverable-card, .risk-card, .lesson-card"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  const modal = document.getElementById("phaseModal");
  if (event.target === modal) {
    closePhaseModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePhaseModal();
  }
});

// Smooth scrolling for all anchor links with fallback
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Check if smooth scrolling is supported
      if ("scrollBehavior" in document.documentElement.style) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Fallback for browsers that don't support smooth scrolling
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        window.scrollTo(0, targetPosition);
      }
    }
  });
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Utility function to debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Simple file download functionality
function exportToPDF(sectionId, filename) {
  const button = event.target.closest(".export-btn");
  const originalText = button.innerHTML;

  // Show loading state
  button.classList.add("loading");
  button.innerHTML = '<i class="fas fa-spinner"></i> Downloading...';

  try {
    // Create a simple download link for the slides file
    const link = document.createElement("a");
    link.href = "slides"; // Downloads a file named "slides"
    link.download = "slides";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("Error downloading file. Please try again.");
  } finally {
    // Reset button
    button.classList.remove("loading");
    button.innerHTML = originalText;
  }
}

// Theme Toggle Functionality
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  // Update icon based on current theme
  updateThemeIcon();

  // Listen for theme toggle clicks - debounced for performance
  const debouncedThemeToggle = debounce(function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon();
  }, 100);

  themeToggle.addEventListener("click", debouncedThemeToggle);

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        updateThemeIcon();
      }
    });

  function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }
}

// Lazy loading for images and performance optimization
function initializeLazyLoading() {
  // Lazy load images if any are added in the future
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    // Observe all images with lazy class
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Preload critical resources
  const criticalResources = [
    "styles.css",
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = resource;
    link.as = resource.endsWith(".css") ? "style" : "style";
    document.head.appendChild(link);
  });
}
