let emission = 0;
const target = 42.2; //target number for avg Co2 Emissions as of 2025, probably change it when its 2026
const text = document.getElementById('emission');

const timer = setInterval(() => {
  emission += 0.2; //yay animation :D
  text.textContent = emission.toFixed(1);
  if (emission >= target) clearInterval(timer);
  text.textContent = emission.toFixed(1);
}, 40);

// idk i think i might tweak scroll later if navbar overlaps content
function scrollToContent() {
  const content = document.getElementById('about');
  if (!content) return; //if theres no value / content just stay idle 
  
  content.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Update nav button visibility based on scroll position
function updateNavButtons() {
  const slider = document.querySelector('.stats-slider');
  const leftBtn = document.querySelector('.stat-nav.left');
  const rightBtn = document.querySelector('.stat-nav.right');
  
  if (!slider || !leftBtn || !rightBtn) return;
  
  const scrollLeft = slider.scrollLeft;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  
  // Hide left button if at start (no more content on the left)
  if (scrollLeft <= 5) {
    leftBtn.style.opacity = '0';
    leftBtn.style.pointerEvents = 'none';
  } else {
    leftBtn.style.opacity = '1';
    leftBtn.style.pointerEvents = 'all';
  }
  
  // Hide right button if at end (no more content on the right)
  if (scrollLeft >= maxScroll - 5) {
    rightBtn.style.opacity = '0';
    rightBtn.style.pointerEvents = 'none';
  } else {
    rightBtn.style.opacity = '1';
    rightBtn.style.pointerEvents = 'all';
  }
}

function scrollStats(direction) {
  const slider = document.querySelector('.stats-slider');
  const scrollAmount = 300; //basically if you click > = right < = left just like - + but in px 
  slider.scrollBy({
    left: direction * scrollAmount, // yea, still the same, direction ( left - , right + ) x 300 
    behavior: 'smooth'
  });
  
  // Update buttons after scroll animation finishes
  setTimeout(updateNavButtons, 350);
}

// Listen for scroll events on the slider to update button visibility
const slider = document.querySelector('.stats-slider');
if (slider) {
  slider.addEventListener('scroll', updateNavButtons);
  // Initial check on page load
  updateNavButtons();
}

// handle FAQ open/close
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const q = item.querySelector('.question');
  
  q.addEventListener('click', () => {
    const open = item.classList.contains('active');

    // close all first
    faqItems.forEach(i => i.classList.remove('active'));

    // then open the clicked one if it wasn't already
    if (!open) item.classList.add('active');
  });
});

// fade in animation when scrolling into view
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1; // e is for entry or event or whatever you call it ig
      e.target.style.transform = 'translateY(0)';
    }
  });
});

// init fade in styles
faqItems.forEach(f => {
  f.style.opacity = 0; // f is for fade, could be frame but uhh f is fade, variable names :]
  f.style.transform = 'translateY(18px)';
  f.style.transition = 'opacity .6s ease, transform .62s ease';
  fadeObserver.observe(f);
});

// show navbar after hero scroll
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');
  if (!hero || !nav) return;

  const heroHeight = hero.offsetHeight;
  if (window.scrollY > heroHeight - 120) {
    nav.classList.add('show');
  } else {
    nav.classList.remove('show');
  }
});