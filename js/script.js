const faqItems = document.querySelectorAll('.faq-item');

function scrollToContent() {
    const contentSection = document.getElementById('content');
    if (contentSection) {
        contentSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

faqItems.forEach(faq => {
    const question = faq.querySelector('.question');

    question.addEventListener('click', () => {
        const isOpen = faq.classList.contains('active');

        faqItems.forEach(item => item.classList.remove('active'));

        if (!isOpen) {
            faq.classList.add('active');
        }
    });
});

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1, 
    rootMargin: '0px 0px -100px 0px' 
});

faqItems.forEach(faq => {
    faq.style.opacity = '0';
    faq.style.transform = 'translateY(20px)';
    faq.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(faq);
});

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const heroHeight = document.querySelector('.hero').offsetHeight;

  if (window.scrollY > heroHeight - 100) {
    navbar.classList.add('show');
  } else {
    navbar.classList.remove('show');
  }
});