/* ═══════════════════════════════════════════════════════════
   FoxAI — Main JavaScript
   Navigation, scroll reveal, loading screen, shared utilities
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── LOADING SCREEN ───
    function initLoadingScreen() {
        const loader = document.getElementById('loading-screen');
        if (!loader) return;

        window.addEventListener('load', function () {
            setTimeout(function () {
                loader.classList.add('hidden');
            }, 2000);
        });

        // Fallback: hide after max 4 seconds
        setTimeout(function () {
            if (loader) loader.classList.add('hidden');
        }, 4000);
    }

    // ─── NAVBAR SCROLL EFFECT ───
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // ─── MOBILE NAV TOGGLE ───
    function initMobileNav() {
        const toggle = document.getElementById('nav-toggle');
        const links = document.getElementById('nav-links');
        if (!toggle || !links) return;

        toggle.addEventListener('click', function () {
            links.classList.toggle('open');
            toggle.classList.toggle('active');
        });

        // Close on link click
        links.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                links.classList.remove('open');
                toggle.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && !links.contains(e.target)) {
                links.classList.remove('open');
                toggle.classList.remove('active');
            }
        });
    }

    // ─── SCROLL REVEAL ───
    function initScrollReveal() {
        var reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, i * 80);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ─── SMOOTH SCROLL FOR HASH LINKS ───
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                var target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ─── ACTIVE NAV LINK HIGHLIGHT ───
    function initActiveNavLink() {
        var path = window.location.pathname;
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        if (path === '') {
            path = '/';
        }
        
        document.querySelectorAll('.nav-links a').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === path || (path === '/' && href === '/index.html')) {
                link.classList.add('active');
            }
        });
    }

    // ─── SHOWCASE TABS ───
    function initShowcaseTabs() {
        var tabs = document.querySelectorAll('.showcase-tab');
        if (!tabs.length) return;

        var titles = {
            product: 'Product Ad',
            travel: 'Travel Reel',
            podcast: 'Podcast Clip',
            gym: 'Gym Edit',
            luxury: 'Luxury Promo',
            gaming: 'Gaming Montage'
        };

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');
                var titleEl = document.getElementById('showcase-title');
                if (titleEl) {
                    titleEl.textContent = titles[tab.dataset.cat] || '';
                }
            });
        });
    }

    // ─── TIMELINE PLAYHEAD ───
    function initTimelinePlayhead() {
        var section = document.getElementById('timeline');
        var playhead = document.getElementById('tl-playhead');
        if (!section || !playhead) return;

        function updatePlayhead() {
            var rect = section.getBoundingClientRect();
            var vh = window.innerHeight;
            var progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
            playhead.style.left = (progress * 95) + '%';
            requestAnimationFrame(updatePlayhead);
        }
        updatePlayhead();
    }

    // ─── PARALLAX HERO PHONE ───
    function initHeroPhoneParallax() {
        var phone = document.getElementById('hero-phone');
        if (!phone) return;

        window.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 2;
            var y = (e.clientY / window.innerHeight - 0.5) * 2;
            phone.style.transform =
                'perspective(1200px) rotateY(' + (-12 + x * 8) + 'deg) rotateX(' + (4 + y * 5) + 'deg)';
        });
    }

    // ─── INITIALIZE ALL ───
    function init() {
        initLoadingScreen();
        initNavbarScroll();
        initMobileNav();
        initScrollReveal();
        initSmoothScroll();
        initActiveNavLink();
        initShowcaseTabs();
        initTimelinePlayhead();
        initHeroPhoneParallax();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
