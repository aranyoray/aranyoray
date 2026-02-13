// Project data for modals
const projects = {
    nanocide: {
        title: 'NanoCide',
        description: 'Developed a nano-encapsulated pesticide using silica from rice husk ash (agricultural waste). Created a scalable, low-cost production system that reached 1,200+ farmers across rural India.',
        image: 'images/cover.png',
        gradient: 'linear-gradient(135deg, #1a472a 0%, #2d5a27 100%)',
        details: [
            { label: 'Impact', value: '1,200+ farmers reached' },
            { label: 'Recognition', value: 'USAF Commendation at ISEF' },
            { label: 'Year', value: '2018–2019' }
        ]
    },
    ssp: {
        title: 'Summer Science Program',
        description: 'Selected as 1 of 25 globally for the MIT/Caltech-sponsored biochemistry program. Conducted computational drug discovery research, identifying novel fungal enzyme inhibitors through in-silico and in-vivo methods.',
        image: null,
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        details: [
            { label: 'Selection', value: '1 of 25 globally' },
            { label: 'Focus', value: 'Computational drug discovery' },
            { label: 'Year', value: '2020' }
        ]
    },
    autest: {
        title: 'Autest',
        description: 'Co-developed a culturally adapted autism risk-assessment application for Indian children. Piloted with 82 children, now deployed across 5 special schools and 3 NGOs. Published in Harvard GSAS Journal of Emerging Investigators.',
        image: null,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        details: [
            { label: 'Users', value: '82 children in pilot' },
            { label: 'Deployment', value: '5 schools, 3 NGOs' },
            { label: 'Award', value: '1st Place, APA at ISEF' }
        ]
    },
    reservoir: {
        title: 'Reservoir',
        description: 'Built a digital puppeteering platform for social-emotional learning (SEL) targeting neurodiverse children. Secured $20K grant from IISc Bangalore and Maharashtra State Government. Platform was acqui-hired by BYJU\'S.',
        image: null,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        details: [
            { label: 'Funding', value: '$20K grant' },
            { label: 'Outcome', value: 'Acqui-hired by BYJU\'S' },
            { label: 'Year', value: '2021' }
        ]
    },
    wutsai: {
        title: 'Wu Tsai Institute Research',
        description: 'Research Fellow studying the formation and persistence of attitudes and social memory. Developed novel eye-tracking and cursor-tracking methods to quantify cognitive bias and confidence in decision-making.',
        image: null,
        gradient: 'linear-gradient(135deg, #00416a 0%, #e4e5e6 100%)',
        details: [
            { label: 'Selection', value: '1 of 12 fellows' },
            { label: 'Methods', value: 'Eye & cursor tracking' },
            { label: 'Status', value: 'Manuscript accepted' }
        ]
    },
    graymatics: {
        title: 'Graymatics',
        description: 'Joined as AI & Computer Vision engineer while seeking SBIR partnership. Awarded US SBIR Phase I Grant. Working on computer vision solutions for smart cities and manufacturing safety.',
        image: null,
        gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        details: [
            { label: 'Grant', value: 'US SBIR Phase I (Aug 2024)' },
            { label: 'Focus', value: 'CV for smart cities' },
            { label: 'Year', value: '2023–present' }
        ]
    },
    movein: {
        title: 'Bangalore Metro Pilot',
        description: 'Led a 3-person team to win MoveInSync Mobility Hackathon 2024 (National Winner). Won a pilot deployment with Bangalore Metro serving approximately 700,000 daily riders.',
        image: null,
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        details: [
            { label: 'Result', value: 'National Winner' },
            { label: 'Scale', value: '~700k daily riders' },
            { label: 'Year', value: '2024' }
        ]
    }
};

// DOM elements
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalDetails = document.getElementById('modal-details');

// Open modal
function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Set content
    if (project.image) {
        modalImage.style.backgroundImage = `url(${project.image})`;
    } else {
        modalImage.style.backgroundImage = project.gradient;
    }
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    // Set details
    modalDetails.innerHTML = project.details.map(detail => `
        <div class="modal-detail">
            <span class="modal-detail-label">${detail.label}</span>
            <span class="modal-detail-value">${detail.value}</span>
        </div>
    `).join('');

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        openModal(projectId);
    });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    const getCurrentTheme = () => {
        const saved = html.getAttribute('data-theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = getCurrentTheme();
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // Keyboard shortcut: 'd' to toggle dark mode
    document.addEventListener('keydown', (e) => {
        if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const target = e.target;
            if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                const current = getCurrentTheme();
                const next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            }
        }
    });

    // Gallery carousel
    const galleryTrack = document.getElementById('gallery-track');
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    const galleryDotsContainer = document.getElementById('gallery-dots');

    if (galleryTrack && galleryPrev && galleryNext && galleryDotsContainer) {
        let galleryIndex = 0;

        const getVisibleCount = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        };

        const getMaxIndex = () => {
            const items = galleryTrack.children.length;
            return Math.max(0, items - getVisibleCount());
        };

        const updateGallery = () => {
            const visibleCount = getVisibleCount();
            const gap = 16; // 1rem
            const containerWidth = galleryTrack.parentElement.offsetWidth;
            const itemWidth = (containerWidth - gap * (visibleCount - 1)) / visibleCount;
            const offset = galleryIndex * (itemWidth + gap);
            galleryTrack.style.transform = `translateX(-${offset}px)`;

            galleryPrev.disabled = galleryIndex === 0;
            galleryNext.disabled = galleryIndex >= getMaxIndex();

            // Update dots
            const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === galleryIndex);
            });
        };

        const buildDots = () => {
            const maxIdx = getMaxIndex();
            galleryDotsContainer.innerHTML = '';
            for (let i = 0; i <= maxIdx; i++) {
                const dot = document.createElement('button');
                dot.className = 'gallery-dot' + (i === galleryIndex ? ' active' : '');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    galleryIndex = i;
                    updateGallery();
                });
                galleryDotsContainer.appendChild(dot);
            }
        };

        galleryPrev.addEventListener('click', () => {
            if (galleryIndex > 0) {
                galleryIndex--;
                updateGallery();
            }
        });

        galleryNext.addEventListener('click', () => {
            if (galleryIndex < getMaxIndex()) {
                galleryIndex++;
                updateGallery();
            }
        });

        buildDots();
        updateGallery();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (galleryIndex > getMaxIndex()) {
                    galleryIndex = getMaxIndex();
                }
                buildDots();
                updateGallery();
            }, 150);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
});
