document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('[data-aos]');
    let delay = 100;

    animatedElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('aos-animate');
        }, delay);
        delay += 100;
    });

    // Animate link cards with staggered delay
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        card.style.animationDelay = `${0.8 + (index * 0.1)}s`;
    });

    // Add click ripple effect
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover animation class
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
