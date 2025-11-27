let emission = 0;
const target = 42.2; //target number for avg Co2 Emissions as of 2025, probably change it when its 2026
const text = document.getElementById('emission');

const timer = setInterval(() => {
  emission += 0.2; //yay animation :D
  text.textContent = emission.toFixed(1);
  if (emission >= target) clearInterval(timer); //prevents it from wasting resources when it hits the target numbers
}, 40);

//For AOS to function
AOS.init({
  duration: 700,
  once: true, // animate only on first scroll
  offset: 60 // slight delay before triggering the animation
});

function scrollToContent(id, event) {
  if (event) event.preventDefault();

  const section = document.getElementById(id);
  if (!section) return;

  const offset = 1;
  const scrollTo = section.offsetTop - offset;

  window.scrollTo({
    top: scrollTo,
    behavior: "smooth"
  });
}

function scrollToAbout(event) {
  event.preventDefault();

  const section = document.getElementById("about");
  const offset = 1; 
  const scrollTo = section.offsetTop - offset;

  window.scrollTo({
    top: scrollTo,
    behavior: "smooth"
  });
}

function updateNavButtons() {
  const slider = document.querySelector('.stats-slider');
  const leftBtn = document.querySelector('.stat-nav.left');
  const rightBtn = document.querySelector('.stat-nav.right');
  
  if (!slider || !leftBtn || !rightBtn) return;
  
  const scrollLeft = slider.scrollLeft;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  
  if (scrollLeft <= 5) {
    leftBtn.style.opacity = '0';
    leftBtn.style.pointerEvents = 'none';
  } else {
    leftBtn.style.opacity = '1';
    leftBtn.style.pointerEvents = 'all';
  }
  
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

//FAQ Related code
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const q = item.querySelector('.question');
  
  q.addEventListener('click', () => {
    const open = item.classList.contains('active');

    faqItems.forEach(i => i.classList.remove('active'));

    if (!open) item.classList.add('active');
  });
});
