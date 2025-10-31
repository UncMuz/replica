// Loading screen
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 1000);
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('OHO Design - Website loaded successfully!');
    
    // Color Mode Toggle
    const colorModeToggle = document.getElementById('color-mode-toggle');
    const html = document.documentElement;
    
    // Check for saved color mode preference
    const savedMode = localStorage.getItem('colorMode');
    if (savedMode === 'light') {
        html.classList.add('light-mode');
    }
    
    if (colorModeToggle) {
        colorModeToggle.addEventListener('click', function() {
            html.classList.toggle('light-mode');
            
            // Save preference
            if (html.classList.contains('light-mode')) {
                localStorage.setItem('colorMode', 'light');
            } else {
                localStorage.setItem('colorMode', 'dark');
            }
        });
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe project and insight cards
    const cards = document.querySelectorAll('.project-card, .insight-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Contact greeting text rotation
    const greetings = [
        'sag hallo →',
        'say hello →',
        'sag hi →',
        'bonjour →',
        'ciao →',
        'hey →'
    ];
    
    const contactGreeting = document.querySelector('.contact-greeting');
    if (contactGreeting) {
        let currentIndex = 0;
        
        contactGreeting.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % greetings.length;
            this.style.opacity = '0';
            
            setTimeout(() => {
                this.textContent = greetings[currentIndex];
                this.style.opacity = '1';
            }, 200);
        });
    }
    
    // Add stagger animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger animation delay to insight cards
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Parallax effect for hero section (subtle)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Add hover effect for service items
    const serviceItems = document.querySelectorAll('.service-column li');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Video Player Controls
    const video = document.getElementById('showreel-video');
    const playButton = document.getElementById('play-button');
    const videoOverlay = document.getElementById('video-overlay');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    if (video && playButton) {
        // Play/Pause toggle
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoOverlay.classList.add('hidden');
            } else {
                video.pause();
                videoOverlay.classList.remove('hidden');
            }
        });
        
        // Click on video to play/pause
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoOverlay.classList.add('hidden');
            } else {
                video.pause();
                videoOverlay.classList.remove('hidden');
            }
        });
        
        // Mute/Unmute
        if (muteBtn) {
            muteBtn.addEventListener('click', function() {
                video.muted = !video.muted;
                if (video.muted) {
                    this.style.opacity = '0.5';
                } else {
                    this.style.opacity = '1';
                }
            });
        }
        
        // Fullscreen toggle
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', function() {
                if (!document.fullscreenElement) {
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                    } else if (video.msRequestFullscreen) {
                        video.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            });
        }
        
        // Auto-play on scroll into view (muted)
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && video.paused) {
                    video.play();
                    setTimeout(() => {
                        videoOverlay.classList.add('hidden');
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(video);
    }
    
    // Pause logo marquee animations on hover
    const logoTracks = document.querySelectorAll('.logo-track');
    logoTracks.forEach(track => {
        track.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
    
    // Enhanced project card interactions
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            const card = this.closest('.project-card');
            card.style.transform = 'translateY(-10px)';
        });
        
        image.addEventListener('mouseleave', function() {
            const card = this.closest('.project-card');
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Mouse cursor effect (custom cursor like original)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', function(e) {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Detect clickable elements and scale cursor
    const clickableElements = document.querySelectorAll('a, button, .project-card, .insight-card');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
        });
    });
    
    // Log message for developers
    console.log('%c🎨 OHO Design', 'font-size: 24px; font-weight: bold; color: #fff; background: #151515; padding: 10px 20px; border-radius: 5px;');
    console.log('%cInterested in how we work? Check out our code!', 'font-size: 14px; color: #999;');
    console.log('%cWir kreieren interaktive Erlebnisse.', 'font-size: 12px; color: #666; font-style: italic;');
});
