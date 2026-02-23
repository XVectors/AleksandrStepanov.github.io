// Project data
const projectData = {
  uxui: [
    {
      id: 1,
      title: "Music streaming Mobile App",
      image: "images/Musify4.png",
      description: "text-placeholder."
    },
    {
      id: 2,
      title: "Checklist Mobile App",
      image: "images/LOP2.png",
      description: "text-placeholder.",
      figmaLink: "https://figma.com/proto/VignmHHc0wtbrQobOctPtU/LoadoutPrep-App?node-id=1-70&t=WwLeBSrh35t5yJmV-1"
    },
    {
      id: 3,
      title: "Personal web-page",
      image: "images/frame 3.png",
      description: "text-placeholder."
    }
  ],
  gamedev: [
    {
      id: 1,
      title: "Third Person Arena Shooter",
      image: "images/TPSUE4.png",
      description: "text-placeholder"
    },
    {
      id: 2,
      title: "Horror Game prototyping",
      image: "https://via.placeholder.com/400x250/ea580c/ffffff?text=Game+2",
      description: "text-placeholder."
    },
    {
      id: 3,
      title: "2D platformer",
      image: "https://via.placeholder.com/400x250/0891b2/ffffff?text=Game+3",
      description: "text-placeholder."
    },
    {
      id: 4,
      title: "Test Game",
      image: "images/CatUnity.png",
      description: "text-placeholder."
    }
  ]
};

// About data
const aboutData = [
  {
    id: 1,
    title: "Background",
    content: "I'm a passionate designer and developer with 5+ years of experience creating digital experiences. I started my journey in graphic design and evolved into UX/UI design and game development."
  },
  {
    id: 2,
    title: "Skills",
    content: "UX/UI Design • Figma • Adobe Creative Suite • Unity • C# • JavaScript • React • User Research • Prototyping • Game Design • 3D Modeling"
  },
  {
    id: 3,
    title: "Education",
    content: "Bachelor's in Computer Science from University Name (2019). Certified UX Designer from Google UX Design Certificate. Continuous learner with courses in game development and emerging technologies."
  },
  {
    id: 4,
    title: "Experience",
    content: "Currently working as Senior UX Designer at Tech Company. Previously worked at Startup Inc. as Product Designer and freelanced for various clients creating mobile apps and web experiences."
  },
  {
    id: 5,
    title: "Philosophy",
    content: "I believe in user-centered design and creating experiences that are not only beautiful but also functional and accessible. Every pixel has a purpose, and every interaction should feel natural."
  },
  {
    id: 6,
    title: "Interests",
    content: "When I'm not designing or coding, you can find me playing indie games, exploring new technologies, hiking in nature, or experimenting with digital art and animation."
  }
];

// Current active tab
let currentTab = localStorage.getItem('activeTab') || 'uxui';

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const projectsGrid = document.getElementById('projects-grid');
const aboutGrid = document.getElementById('about-grid');
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMobile = document.getElementById('nav-mobile');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  renderProjects(currentTab);
  renderAbout();
  setupEventListeners();
  
  // Активируем соответствующую вкладку
  tabButtons.forEach(button => {
    if (button.dataset.tab === currentTab) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
});

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tab = this.dataset.tab;
      
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Render projects for selected tab
      renderProjects(tab);
      
      // Save active tab to localStorage
      localStorage.setItem('activeTab', tab);
      currentTab = tab;
    });
  });
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Mobile theme toggle
  const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile menu
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
      // Close mobile menu if open
      navMobile.classList.remove('active');
    });
  });
}

// Switch project tabs
function switchTab(tab) {
  currentTab = tab;
  
  // Update tab buttons
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tab) {
      btn.classList.add('active');
    }
  });
  
  // Render projects for the selected tab
  renderProjects(tab);
}

// Render projects
function renderProjects(tab) {
  const projects = projectData[tab] || [];
  
  projectsGrid.innerHTML = projects.map((project, index) => `
    <div class="project-card card">
      <img src="${project.image}" alt="${project.title}" class="project-image">
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-actions">
          <a href="project-details.html?project=${tab}-${index}" class="btn btn-primary">View Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Render about cards
function renderAbout() {
  aboutGrid.innerHTML = aboutData.map(item => `
    <div class="about-card card">
      <h3 class="about-card-title">${item.title}</h3>
      <p class="about-card-text">${item.content}</p>
    </div>
  `).join('');
}

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const sunIcons = document.querySelectorAll('.sun-icon, .sun-icon-mobile');
  const moonIcons = document.querySelectorAll('.moon-icon, .moon-icon-mobile');
  
  if (body.getAttribute('data-theme') === 'dark') {
    // Switch to light theme
    body.removeAttribute('data-theme');
    sunIcons.forEach(icon => icon.style.display = 'block');
    moonIcons.forEach(icon => icon.style.display = 'none');
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark theme
    body.setAttribute('data-theme', 'dark');
    sunIcons.forEach(icon => icon.style.display = 'none');
    moonIcons.forEach(icon => icon.style.display = 'block');
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const sunIcons = document.querySelectorAll('.sun-icon, .sun-icon-mobile');
  const moonIcons = document.querySelectorAll('.moon-icon, .moon-icon-mobile');
  
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    sunIcons.forEach(icon => icon.style.display = 'none');
    moonIcons.forEach(icon => icon.style.display = 'block');
  } else {
    document.body.removeAttribute('data-theme');
    sunIcons.forEach(icon => icon.style.display = 'block');
    moonIcons.forEach(icon => icon.style.display = 'none');
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  navMobile.classList.toggle('active');
}


