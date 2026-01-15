// Enhanced Portfolio Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe timeline items with stagger effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        observer.observe(item);
    });

    // Enhanced parallax effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
            }
        });
    });

    // Header scroll effect with shadow
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.08)';
            header.style.background = 'rgba(253, 252, 250, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(253, 252, 250, 0.95)';
        }
        
        lastScroll = currentScroll;
    });

    // Logo rotation animation on click
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('click', () => {
            logoImg.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            logoImg.style.transform = 'rotate(360deg) scale(1.1)';
            
            setTimeout(() => {
                logoImg.style.transform = 'rotate(0deg) scale(1)';
            }, 800);
        });
    }

    // Custom cursor for project cards
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<span>View</span>';
    cursor.style.cssText = `
        position: fixed;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(45, 90, 39, 0.95), rgba(45, 90, 39, 0.85));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        font-weight: 600;
        pointer-events: none;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(45, 90, 39, 0.4);
    `;
    document.body.appendChild(cursor);

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursor.style.transform = 'scale(1)';
        });
        
        card.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursor.style.transform = 'scale(0)';
        });
        
        card.addEventListener('mousemove', (e) => {
            cursor.style.left = (e.clientX - 45) + 'px';
            cursor.style.top = (e.clientY - 45) + 'px';
        });
    });

    // Smooth scroll for anchor links
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

    // Add ripple effect to CTA button
    const ctaButton = document.querySelector('.header-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Highlight text selection
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', () => {
            highlight.style.background = 'linear-gradient(180deg, transparent 50%, #d4e5d1 50%)';
        });
        
        highlight.addEventListener('mouseleave', () => {
            highlight.style.background = 'linear-gradient(180deg, transparent 60%, #d4e5d1 60%)';
        });
    });

    // Lazy loading optimization for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Performance monitoring
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                           window.performance.timing.navigationStart;
            console.log(`🚀 Portfolio loaded in ${loadTime}ms`);
        });
    }

    // Add subtle parallax to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            document.body.style.animation = 'rainbow 3s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
        }
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    console.log('🌿 Portfolio initialized successfully');
    console.log('💡 Tip: Try the Konami code for a surprise!');
});
