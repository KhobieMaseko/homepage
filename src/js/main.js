// Import SCSS
import '../styles/main.scss';

import loaderGif from '../images/loader.gif';

// Import images
import project1Image from '../images/project1.png';
import project2Image from '../images/project2.png';
import project3Image from '../images/project3.png';

// Import video
import techVideo from '../images/0_Technology_Data_Visualization_1920x1080.mp4';

// Import tech stack icons
import html5Icon from '../images/html5.svg';
import css3Icon from '../images/css3.svg';
import jsIcon from '../images/javascript.svg';
import npmIcon from '../images/npm.svg';
import webpackIcon from '../images/webpack.svg';

// Custom cursor initialization
const initCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-trail';
  document.body.appendChild(cursor);

  // Mouse movement tracker with distort animation
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.opacity = 1;

    // Restart distort animation
    cursor.classList.remove('distort');
    void cursor.offsetWidth;
    cursor.classList.add('distort');
  });

  // Click animation
  document.addEventListener('click', (e) => {
    cursor.style.transform = `
      translate(${e.clientX - 10}px, ${e.clientY - 10}px)
      scale(1.5)
    `;
    setTimeout(() => {
      cursor.style.transform = `
        translate(${e.clientX - 10}px, ${e.clientY - 10}px)
        scale(1)
      `;
    }, 300);
  });
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Preloader image injection
  const preloaderImg = document.getElementById('preloader-img');
  if (preloaderImg) {
    preloaderImg.src = loaderGif;
  }

  // initialize custom cursor
  initCursor();

  // Set current year in footer
  document.querySelector('footer p').innerHTML = `Designed & Built by Khobie Maseko &copy; ${new Date().getFullYear()}`;

  // Add tech stack icons
  const contactContainer = document.querySelector('.contact .container');
  if (contactContainer) {
    const techIcons = [html5Icon, css3Icon, jsIcon, npmIcon, webpackIcon];

    const techStackDiv = document.createElement('div');
    techStackDiv.className = 'tech-stack-icons';
    techStackDiv.setAttribute('aria-label', 'Technologies I use');

    techStackDiv.innerHTML = techIcons
      .map(icon => `<img src="${icon}" alt="Tech Icon" loading="lazy">`)
      .join('');

    contactContainer.appendChild(techStackDiv);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // video background to projects section
  const projectsSection = document.querySelector('.projects');
  if (projectsSection) {
    projectsSection.insertAdjacentHTML('afterbegin', `
      <div class="projects__video-bg">
        <video autoplay muted loop playsinline>
          <source src="${techVideo}" type="video/mp4">
        </video>
        <div class="projects__video-overlay"></div>
      </div>
    `);
  }

  // Dynamic projects loading
  const projectsGrid = document.querySelector('.projects__grid');
  if (projectsGrid) {
    const projects = [
      {
        title: 'Battleship',
        description: 'A modern implementation of the classic Battleship board game with sleek UI and responsive design.',
        image: project1Image,
        tech: ['JavaScript', 'SCSS', 'HTML'],
        liveLink: 'https://khobiemaseko.github.io/battleship',
        codeLink: 'https://github.com/KhobieMaseko/battleship'
      },
      {
        title: 'Library',
        description: 'A responsive Library portfolio website built with modern web technologies.',
        image: project2Image,
        tech: ['HTML', 'SCSS', 'JavaScript'],
        liveLink: 'https://khobiemaseko.github.io/Library/',
        codeLink: 'https://github.com/KhobieMaseko/Library'
      },
      {
        title: 'Weather App',
        description: 'A responsive weather application that displays current and forecasted weather conditions for any location.',
        image: project3Image,
        tech: ['HTML', 'SCSS', 'JavaScript', 'webpack', 'prettier'],
        liveLink: 'https://khobiemaseko.github.io/weather-app/',
        codeLink: 'https://github.com/KhobieMaseko/weather-app'
      }
    ];

    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <div class="project-card__image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__description">${project.description}</p>
          <div class="project-card__tech">
            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
          </div>
          <div class="project-card__links">
            <a href="${project.liveLink}" aria-label="View ${project.title} live demo">
              <i class="devicon-github-original"></i> Live Demo
            </a>
            <a href="${project.codeLink}" aria-label="View ${project.title} source code">
              <i class="devicon-github-original"></i> Source Code
            </a>
          </div>
        </div>
      `;
      projectsGrid.appendChild(projectCard);
    });
  }
});

// When everything is fully loaded, hide the preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.style.display = 'none';
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
