// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Add interactive hover effects for skill nodes
document.querySelectorAll('.skill-node').forEach(node => {
    node.addEventListener('click', () => {
        // Add a pulse effect on click
        node.style.transform = 'scale(0.95)';
        setTimeout(() => {
            node.style.transform = '';
        }, 150);
    });
});

// Optional: Add particle effect on hover
document.querySelectorAll('.skill-node').forEach(node => {
    node.addEventListener('mouseenter', () => {
        // You could add particle effects here if desired
        console.log('Hovered:', node.textContent.trim());
    });
});