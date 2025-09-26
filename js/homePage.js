
// Token handling
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

if (token) {
    localStorage.setItem("accessToken", token);
    window.history.replaceState({}, document.title, window.location.pathname);
}

// Page Loader
window.addEventListener('load', function () {
    const loader = document.getElementById('pageLoader');
    document.body.classList.add('page-loaded');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollY = 0;
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
});

// Profile dropdown functionality
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

profileBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("hidden");
    if (!dropdownMenu.classList.contains("hidden")) {
        dropdownMenu.style.transform = "scale(1)";
        dropdownMenu.style.opacity = "1";
    } else {
        dropdownMenu.style.transform = "scale(0.95)";
        dropdownMenu.style.opacity = "0";
    }
});

mobileMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
    if (profileBtn && !profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
        dropdownMenu.style.transform = "scale(0.95)";
        dropdownMenu.style.opacity = "0";
    }
    if (mobileMenuBtn && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Logout function
function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "/pages/signin.html";
}

// Add loading states for buttons
document.querySelectorAll('.btn-modern').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';

            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = originalText;
            }, 2000);
        }
    });
});

// Add hover effects for cards
document.querySelectorAll('.feature-card, .review-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typewriter effect restart on scroll
let typewriterTriggered = false;
const typewriterElement = document.querySelector('.typewriter');

const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !typewriterTriggered) {
            typewriterTriggered = true;
            entry.target.style.animation = 'typing 4s steps(40, end), blink-caret 0.75s step-end infinite';
        }
    });
});

if (typewriterElement) {
    typewriterObserver.observe(typewriterElement);
}

// Add dynamic particle generation
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 25 + 's';
    particle.style.animationDuration = (20 + Math.random() * 10) + 's';
    container.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 30000);
}

// Generate particles periodically
document.querySelectorAll('.particles').forEach(container => {
    setInterval(() => {
        if (container.children.length < 15) {
            createParticle(container);
        }
    }, 3000);
});

// Add scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    let progressBar = document.getElementById('scrollProgress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scrollProgress';
        progressBar.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: ${scrollPercent}%;
                    height: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    z-index: 9999;
                    transition: width 0.3s ease;
                `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Add enhanced mobile menu animations
const mobileMenuToggle = () => {
    if (mobileMenu) {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.style.maxHeight = '500px';
                mobileMenu.style.opacity = '1';
            }, 10);
        } else {
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    }
};

// Update mobile menu event listener
if (mobileMenuBtn) {
    mobileMenuBtn.removeEventListener("click", mobileMenuBtn._clickHandler);
    mobileMenuBtn._clickHandler = (e) => {
        e.stopPropagation();
        mobileMenuToggle();
    };
    mobileMenuBtn.addEventListener("click", mobileMenuBtn._clickHandler);
}

// Add Easter egg for multiple clicks on logo
let logoClickCount = 0;
const logo = document.querySelector('h1 a, .gradient-text a');

if (logo) {
    logo.addEventListener('click', (e) => {
        logoClickCount++;
        if (logoClickCount >= 7) {
            // Create celebration effect
            createCelebration();
            logoClickCount = 0;
        }
    });
}

function createCelebration() {
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉 You found the Easter egg! Thanks for exploring FindCare! 🎉';
    celebration.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 20px 40px;
                border-radius: 20px;
                font-size: 18px;
                font-weight: bold;
                z-index: 10000;
                animation: bounceIn 0.6s ease-out;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            `;

    document.body.appendChild(celebration);

    setTimeout(() => {
        celebration.style.animation = 'bounceOut 0.6s ease-in forwards';
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
        }, 600);
    }, 3000);
}

// Add CSS animations for celebration
const celebrationStyles = document.createElement('style');
celebrationStyles.textContent = `
            @keyframes bounceIn {
                0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.05); }
                70% { transform: translate(-50%, -50%) scale(0.9); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            
            @keyframes bounceOut {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
            }
        `;
document.head.appendChild(celebrationStyles);

// Add performance optimization
let ticking = false;

function optimizedScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', optimizedScroll, { passive: true });

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Fade in elements on load
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// Add service worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmMWY1ZjkiLz48cGF0aCBkPSJNNTAgNzBhMjAgMjAgMCAxIDAgMC00MCAyMCAyMCAwIDAgMCAwIDQweiIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==';
        this.style.backgroundColor = '#f1f5f9';
    });
});

console.log('🐾 FindCare Enhanced - Loaded Successfully! 🐾');
