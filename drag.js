const carouselWrapper = document.querySelector('.carousel-stop-wrap');
const carousels = document.querySelectorAll('.carousel');

let isDragging = false;
let startX, scrollLeft;
let animationPaused = false;

// Function to enable dragging
const startDragging = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    scrollLeft = carouselWrapper.scrollLeft;

    carousels.forEach(c => {
        c.style.animationPlayState = 'paused'; // Pause animation
    });
    animationPaused = true;
};

// Function to stop dragging
const stopDragging = () => {
    if (!isDragging) return;
    isDragging = false;

    // Resume animation after short delay
    setTimeout(() => {
        if (!animationPaused) return;
        carousels.forEach(c => c.style.animationPlayState = 'running');
        animationPaused = false;
    }, 500);
};

// Function to move the carousel while dragging
const moveDragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX) * 2; // Adjust sensitivity
    carouselWrapper.scrollLeft = scrollLeft - walk;
};

// Mouse events
carouselWrapper.addEventListener('mousedown', startDragging);
carouselWrapper.addEventListener('mouseup', stopDragging);
carouselWrapper.addEventListener('mouseleave', stopDragging);
carouselWrapper.addEventListener('mousemove', moveDragging);

// Touch events
carouselWrapper.addEventListener('touchstart', startDragging);
carouselWrapper.addEventListener('touchend', stopDragging);
carouselWrapper.addEventListener('touchcancel', stopDragging);
carouselWrapper.addEventListener('touchmove', moveDragging);
