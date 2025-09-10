// Enhanced cursor trail effect
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
    mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
    });

    // Limit trail length
    if (mouseTrail.length > 20) {
        mouseTrail.shift();
    }

    // Create trail dots
    if (Math.random() > 0.8) { // Reduce frequency
        const cursor = document.createElement('div');
        cursor.style.position = 'fixed';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.width = '5px';
        cursor.style.height = '5px';
        cursor.style.background = 'rgba(79, 70, 229, 0.6)';
        cursor.style.borderRadius = '60%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        document.body.appendChild(cursor);
        
        // Animate out
        setTimeout(() => {
            cursor.style.opacity = '0';
            cursor.style.transform = 'scale(1.5)';
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
            }, 500);
        }, 100);
    }
});
