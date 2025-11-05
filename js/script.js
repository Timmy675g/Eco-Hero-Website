// idk i think i might tweak scroll later if navbar overlaps content
function scrollToContent() {
  const content = document.getElementById('content');
  if (!content) return;
  
  content.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// handle FAQ open/close
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const q = item.querySelector('.question');
  
  q.addEventListener('click', () => {
    const open = item.classList.contains('active');

    // close all first
    faqItems.forEach(i => i.classList.remove('active'));

    // then open the clicked one if it wasn’t already
    if (!open) item.classList.add('active');
  });
});

// fade-in animation when scrolling into view
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { 
  threshold: 0.12,
  rootMargin: '0px 0px -80px 0px' // was -100px; quite stiff? idk
});

// init fade-in styles
faqItems.forEach(f => {
  f.style.opacity = 0;
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
