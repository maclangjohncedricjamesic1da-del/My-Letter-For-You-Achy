// Date generator
function setLetterDate() {
    const dateElement = document.getElementById('letterDate');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Envelope interaction
const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const particlesBtn = document.getElementById('particlesBtn');
const resetBtn = document.getElementById('resetBtn');
const heartsContainer = document.getElementById('heartsContainer');

let isOpened = false;

// Toggle envelope open/close
function toggleEnvelope() {
    isOpened = !isOpened;
    
    if (isOpened) {
        envelope.classList.add('opened');
        openBtn.style.display = 'none';
        closeBtn.style.display = 'inline-block';
        createConfetti();
    } else {
        envelope.classList.remove('opened');
        openBtn.style.display = 'inline-block';
        closeBtn.style.display = 'none';
    }
}

// Click envelope to open/close
envelope.addEventListener('click', toggleEnvelope);

// Button events
openBtn.addEventListener('click', () => {
    if (!isOpened) toggleEnvelope();
});

closeBtn.addEventListener('click', () => {
    if (isOpened) toggleEnvelope();
});

// Create floating hearts
function createFloatingHearts(count = 30) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '❤';
        
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 3 + Math.random() * 2;
        
        heart.style.left = randomX + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.animationDelay = randomDelay + 's';
        heart.style.animationDuration = randomDuration + 's';
        heart.style.color = getRandomColor();
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), (randomDuration + randomDelay) * 1000);
    }
}

// Create confetti inside envelope
function createConfetti(count = 20) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '❤';
        
        const randomX = Math.random() * 360;
        const randomDelay = Math.random() * 0.3;
        
        heart.style.left = randomX + 'px';
        heart.style.top = '50%';
        heart.style.animationDelay = randomDelay + 's';
        heart.style.color = getRandomColor();
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3500);
    }
}

// Shower hearts button
particlesBtn.addEventListener('click', () => {
    createFloatingHearts(50);
});

// Reset button
resetBtn.addEventListener('click', () => {
    if (isOpened) toggleEnvelope();
    
    // Remove all floating hearts
    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach(heart => heart.remove());
});

// Helper functions
function getRandomColor() {
    const colors = ['#e74c3c', '#f39c12', '#e91e63', '#9c27b0', '#2196f3'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Mouse tracking effect for envelope
document.addEventListener('mousemove', (e) => {
    if (!isOpened) {
        const envelope = document.getElementById('envelope');
        const rect = envelope.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (e.clientY - centerY) * 0.02;
        const angleY = (e.clientX - centerX) * 0.02;
        
        envelope.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    }
});

// Reset transform when mouse leaves
document.addEventListener('mouseleave', () => {
    envelope.style.transform = 'rotateX(0) rotateY(0)';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleEnvelope();
    }
    if (e.code === 'KeyH') {
        createFloatingHearts(30);
    }
    if (e.code === 'KeyR') {
        resetBtn.click();
    }
});

// Add Easter eggs
document.addEventListener('dblclick', () => {
    createFloatingHearts(100);
});

// Mobile touch support
let touchStartX = 0;
let touchEndX = 0;

envelope.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

envelope.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        if (!isOpened) toggleEnvelope();
    } else if (touchEndX > touchStartX + 50) {
        if (isOpened) toggleEnvelope();
    }
}

// Add particle effects on button hover
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `particleFloat 1s ease-out forwards`;
        
        button.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    });
});

// Add particle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 50 - 25}px, -50px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize
setLetterDate();

// Add info about shortcuts
console.log('%c💝 Love Letter Envelope 💝', 'font-size: 20px; color: #e74c3c;');
console.log('%cKeyboard Shortcuts:', 'font-size: 14px; font-weight: bold;');
console.log('SPACE - Open/Close Letter');
console.log('H - Shower Hearts');
console.log('R - Reset');
console.log('Double Click - Heart Explosion');
console.log('Mobile - Swipe left/right to open/close');
