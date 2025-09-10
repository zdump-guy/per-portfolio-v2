// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill tree nodes with staggered effect
            if (entry.target.classList.contains('skills-tree')) {
                animateSkillNodes();
            }
        }
    });
}, observerOptions);

// Observe all animation elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Skill nodes staggered animation
function animateSkillNodes() {
    const skillBranches = document.querySelectorAll('.skill-branch');
    skillBranches.forEach((branch, branchIndex) => {
        setTimeout(() => {
            branch.classList.add('animated');
        }, branchIndex * 200);
    });
}

// Navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Interactive skill node effects
document.querySelectorAll('.skill-node').forEach(node => {
    node.addEventListener('click', () => {
        // Add a pulse effect on click
        node.style.transform = 'scale(0.95)';
        setTimeout(() => {
            node.style.transform = '';
        }, 150);
        
        // Log skill for potential tracking
        console.log('Skill clicked:', node.textContent.trim());
    });

    // Add hover sound effect (optional)
    node.addEventListener('mouseenter', () => {
        // You could add a subtle sound effect here
        node.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.25)';
    });

    node.addEventListener('mouseleave', () => {
        node.style.boxShadow = '';
    });
});

document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '6px';
    cursor.style.height = '6px';
    cursor.style.background = 'rgba(79, 70, 229, 0.5)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.style.opacity = '0';
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
        }, 300);
    }, 100);
});



window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Skills hub pulsing effect
setInterval(() => {
    const hub = document.querySelector('.skills-hub');
    if (hub) {
        hub.style.transform = 'scale(1.02)';
        setTimeout(() => {
            hub.style.transform = 'scale(1)';
        }, 200);
    }
}, 4000);

// Connection lines animation
function animateConnections() {
    const lines = document.querySelectorAll('.connection-line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'scaleX(1)';
        }, index * 100);
    });
}

// Initialize connection animations when skills section is visible
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateConnections, 1000);
        }
    });
}, { threshold: 0.3 });

skillsObserver.observe(skillsSection);

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Add focus indicators for better accessibility
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('skill-node')) {
            focusedElement.style.outline = '2px solid var(--accent)';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        // Remove custom focus when moving away
        document.querySelectorAll('.skill-node').forEach(node => {
            if (node !== document.activeElement) {
                node.style.outline = 'none';
            }
        });
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Set initial connection line styles
    const lines = document.querySelectorAll('.connection-line');
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'scaleX(0)';
        line.style.transformOrigin = 'center';
        line.style.transition = 'all 0.5s ease-out';
    });
});