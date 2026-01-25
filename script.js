// Portfolio Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    // Get current theme (considering system preference)
    const getCurrentTheme = () => {
        const savedTheme = html.getAttribute('data-theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Keyboard shortcut: press 'd' to toggle dark mode
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                const target = e.target;
                if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                    const currentTheme = getCurrentTheme();
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    html.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                }
            }
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            html.removeAttribute('data-theme');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items and project items
    document.querySelectorAll('.timeline-item, .project-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Logo animation on click
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('click', (e) => {
            e.preventDefault();
            logoImg.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            logoImg.style.transform = 'rotate(360deg) scale(1.1)';

            setTimeout(() => {
                logoImg.style.transform = 'rotate(0deg) scale(1)';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 600);
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.borderBottom = '1px solid var(--color-border)';
        } else {
            header.style.borderBottom = 'none';
        }

        lastScroll = currentScroll;
    });

    console.log('Portfolio loaded');
});
