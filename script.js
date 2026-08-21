/* =======================================
   X TKJ 2 — HOGWARTS EDITION SCRIPTS
   Harry Potter Themed Class Website
   ======================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ================================================
    // LOADING SCREEN
    // ================================================
    const loadingScreen = document.getElementById('loading-screen');

    const dismissLoading = () => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
        initParticles();
    };

    document.body.style.overflow = 'hidden';

    setTimeout(dismissLoading, 3000);

    loadingScreen.addEventListener('click', dismissLoading);

    // ================================================
    // DIGITAL CLOCK
    // ================================================
    const clockHours = document.getElementById('clock-hours');
    const clockMinutes = document.getElementById('clock-minutes');
    const clockSeconds = document.getElementById('clock-seconds');
    const clockDate = document.getElementById('clock-date');

    const hariIndonesia = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulanIndonesia = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const updateClock = () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');

        if (clockHours) clockHours.textContent = h;
        if (clockMinutes) clockMinutes.textContent = m;
        if (clockSeconds) clockSeconds.textContent = s;

        if (clockDate) {
            const hari = hariIndonesia[now.getDay()];
            const tgl = now.getDate();
            const bulan = bulanIndonesia[now.getMonth()];
            const tahun = now.getFullYear();
            clockDate.textContent = `${hari}, ${tgl} ${bulan} ${tahun}`;
        }
    };

    updateClock();
    setInterval(updateClock, 1000);

    // ================================================
    // NAVIGATION
    // ================================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Hamburger toggle
    navHamburger.addEventListener('click', () => {
        navHamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navHamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Navbar scroll behavior
    let lastScrollY = 0;
    const handleNavScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinkItems.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ================================================
    // SCROLL REVEAL
    // ================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ================================================
    // COUNTER ANIMATION
    // ================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;

        statNumbers.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out cubic)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * eased);

                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(updateCounter);
        });

        countersAnimated = true;
    };

    // Trigger counters when stats grid is visible
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsGrid);
    }

    // ================================================
    // GALLERY CAROUSEL
    // ================================================
    const carouselTrack = document.getElementById('carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = carouselItems.length;
    let autoSlideInterval;

    const goToSlide = (index) => {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        currentSlide = index;
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // 3D tilt effect on active slide
        carouselItems.forEach((item, i) => {
            if (i === currentSlide) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1) rotateY(0deg)';
            } else if (i < currentSlide) {
                item.style.opacity = '0.5';
                item.style.transform = 'scale(0.9) rotateY(15deg)';
            } else {
                item.style.opacity = '0.5';
                item.style.transform = 'scale(0.9) rotateY(-15deg)';
            }
        });
    };

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetAutoSlide();
        });
    });

    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;

    const carouselStage = document.getElementById('carousel-stage');
    carouselStage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselStage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }
            resetAutoSlide();
        }
    }, { passive: true });

    // Auto slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Initialize carousel
    goToSlide(0);
    startAutoSlide();

    // ================================================
    // LIGHTBOX
    // ================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryImages = document.querySelectorAll('.gallery-img');
    let currentLightboxIndex = 0;
    const imageSources = Array.from(galleryImages).map(img => img.src);

    const openLightbox = (index) => {
        currentLightboxIndex = index;
        lightboxImg.src = imageSources[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const navigateLightbox = (direction) => {
        currentLightboxIndex += direction;
        if (currentLightboxIndex < 0) currentLightboxIndex = imageSources.length - 1;
        if (currentLightboxIndex >= imageSources.length) currentLightboxIndex = 0;
        lightboxImg.src = imageSources[currentLightboxIndex];
    };

    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });

    // Also open lightbox when clicking the frame
    document.querySelectorAll('.photo-frame').forEach((frame, index) => {
        frame.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ================================================
    // BACK TO TOP BUTTON
    // ================================================
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================================================
    // PARALLAX EFFECT ON HERO
    // ================================================
    const heroBg = document.querySelector('.hero-bg-img');
    const heroContent = document.getElementById('hero-content');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.getElementById('hero').offsetHeight;

        if (scrollY < heroHeight) {
            const parallaxAmount = scrollY * 0.4;
            heroBg.style.transform = `scale(1.1) translateY(${parallaxAmount}px)`;

            const contentOpacity = 1 - (scrollY / (heroHeight * 0.7));
            const contentTranslate = scrollY * 0.3;
            heroContent.style.opacity = Math.max(contentOpacity, 0);
            heroContent.style.transform = `translateY(${contentTranslate}px)`;
        }
    }, { passive: true });

    // Mouse parallax on hero
    const hero = document.getElementById('hero');

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        // Subtle parallax on floating elements
        document.querySelectorAll('.float-element').forEach(el => {
            const speed = 15;
            el.style.transform += ` translate(${moveX * speed}px, ${moveY * speed}px)`;
        });

        // Subtle tilt on hero content
        if (heroContent) {
            heroContent.style.transform = `perspective(1000px) rotateX(${moveY * -2}deg) rotateY(${moveX * 2}deg)`;
        }
    });

    hero.addEventListener('mouseleave', () => {
        if (heroContent) {
            heroContent.style.transform = '';
        }
    });

    // ================================================
    // 3D TILT EFFECT ON CARDS
    // ================================================
    const tiltCards = document.querySelectorAll('.stat-card, .vision-card-inner');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ================================================
    // PARTICLE SYSTEM (Canvas)
    // ================================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.3 - 0.2;
            this.opacity = Math.random() * 0.6 + 0.1;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.fadeDirection = 1;

            // Golden color variations
            const hue = 38 + Math.random() * 20;
            const sat = 70 + Math.random() * 30;
            const light = 55 + Math.random() * 25;
            this.color = `hsla(${hue}, ${sat}%, ${light}%, `;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Fade in and out
            this.opacity += this.fadeSpeed * this.fadeDirection;
            if (this.opacity >= 0.7) this.fadeDirection = -1;
            if (this.opacity <= 0.05) {
                this.fadeDirection = 1;
                this.reset();
            }

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();

            // Glow effect
            if (this.size > 1.5) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color + (this.opacity * 0.15) + ')';
                ctx.fill();
            }
        }
    }

    const initParticles = () => {
        resizeCanvas();

        const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
        particles = [];

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        animateParticles();
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationId = requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // ================================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================
    // MAGICAL HOVER SOUND EFFECT (Visual)
    // ================================================
    // Add sparkle trail on card hover
    document.querySelectorAll('.parchment-card, .vision-card-inner, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            createSparkleEffect(card);
        });
    });

    const createSparkleEffect = (element) => {
        const rect = element.getBoundingClientRect();

        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--gold-bright);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                box-shadow: 0 0 6px var(--gold), 0 0 12px rgba(212, 168, 67, 0.5);
                animation: sparkleOut 0.8s ease-out forwards;
            `;
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 800);
        }
    };

    // Add sparkle animation to stylesheet
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleOut {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 40 + 10}px, -${Math.random() * 40 + 20}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // ================================================
    // FOOTER MARAUDER'S MAP EASTER EGG
    // ================================================
    const marauderText = document.querySelector('.footer-marauder');
    if (marauderText) {
        marauderText.addEventListener('click', () => {
            marauderText.style.transition = 'all 1s ease';
            marauderText.textContent = 'Mischief Managed! 🪄✨';
            marauderText.style.color = 'var(--gold)';
            marauderText.style.textShadow = '0 0 20px rgba(212, 168, 67, 0.8)';
            marauderText.style.fontSize = '1.1rem';

            setTimeout(() => {
                marauderText.textContent = 'I solemnly swear that I am up to no good 🗺️';
                marauderText.style.color = '';
                marauderText.style.textShadow = '';
                marauderText.style.fontSize = '';
            }, 3000);
        });
    }

    // ================================================
    // KONAMI CODE EASTER EGG
    // ================================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateExpelliarmius();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    const activateExpelliarmius = () => {
        // Create magical explosion effect
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: radial-gradient(circle, rgba(212, 168, 67, 0.3) 0%, transparent 70%);
            pointer-events: none;
            animation: explosionFlash 1.5s ease-out forwards;
        `;

        const explosionText = document.createElement('div');
        explosionText.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100000;
            font-family: 'Cinzel Decorative', serif;
            font-size: 4rem;
            color: var(--gold-bright);
            text-shadow: 0 0 30px var(--gold), 0 0 60px rgba(212, 168, 67, 0.5);
            pointer-events: none;
            animation: spellCast 2s ease-out forwards;
            letter-spacing: 8px;
        `;
        explosionText.textContent = '⚡ EXPELLIARMUS! ⚡';

        const spellStyle = document.createElement('style');
        spellStyle.textContent = `
            @keyframes explosionFlash {
                0% { opacity: 0; }
                20% { opacity: 1; }
                100% { opacity: 0; }
            }
            @keyframes spellCast {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                30% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                60% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
            }
        `;

        document.head.appendChild(spellStyle);
        document.body.appendChild(explosion);
        document.body.appendChild(explosionText);

        // Create burst particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 150 + Math.random() * 200;
            const size = 4 + Math.random() * 8;

            particle.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: ${size}px;
                height: ${size}px;
                background: ${Math.random() > 0.5 ? 'var(--gold-bright)' : 'var(--gold)'};
                border-radius: 50%;
                z-index: 100000;
                pointer-events: none;
                box-shadow: 0 0 10px var(--gold);
                animation: burstParticle 1s ease-out forwards;
                --tx: ${Math.cos(angle) * distance}px;
                --ty: ${Math.sin(angle) * distance}px;
            `;

            const burstStyle = document.createElement('style');
            burstStyle.textContent = `
                @keyframes burstParticle {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(burstStyle);
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }

        setTimeout(() => {
            explosion.remove();
            explosionText.remove();
        }, 2000);
    };

    // ================================================
    // CURSOR MAGIC TRAIL
    // ================================================
    let trailThrottle = 0;

    document.addEventListener('mousemove', (e) => {
        trailThrottle++;
        if (trailThrottle % 4 !== 0) return;

        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: var(--gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.6;
            box-shadow: 0 0 6px rgba(212, 168, 67, 0.4);
            transition: all 0.6s ease-out;
        `;

        document.body.appendChild(trail);

        requestAnimationFrame(() => {
            trail.style.opacity = '0';
            trail.style.transform = `translateY(-10px) scale(0)`;
        });

        setTimeout(() => trail.remove(), 600);
    });

    // ================================================
    // INITIALIZATION COMPLETE LOG
    // ================================================
    console.log(
        '%c⚡ X TKJ 2 — Hogwarts Edition ⚡\n%cMischief Managed!',
        'color: #d4a843; font-size: 20px; font-weight: bold; font-family: serif; text-shadow: 1px 1px 2px #000;',
        'color: #9e8e7a; font-size: 14px; font-style: italic;'
    );

});
