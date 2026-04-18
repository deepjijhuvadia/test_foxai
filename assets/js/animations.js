/* ═══════════════════════════════════════════════════════════
   FoxAI — Animations Module
   Scroll-triggered animations and interactive effects
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── COUNTER ANIMATION ───
    function animateCounters() {
        var counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                var el = entry.target;
                var target = parseInt(el.getAttribute('data-counter'), 10);
                var duration = 2000;
                var start = 0;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target;
                    }
                }

                requestAnimationFrame(step);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) { observer.observe(c); });
    }

    // ─── TILT EFFECT ON CARDS ───
    function initTiltCards() {
        var cards = document.querySelectorAll('[data-tilt]');
        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform =
                    'perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) scale(1.02)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
            });
        });
    }

    // ─── MAGNETIC BUTTONS ───
    function initMagneticButtons() {
        var buttons = document.querySelectorAll('[data-magnetic]');
        buttons.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ─── PROGRESS BAR ON SCROLL ───
    function initScrollProgress() {
        var bar = document.getElementById('scroll-progress');
        if (!bar) return;

        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = (scrollTop / docHeight) * 100;
            bar.style.width = progress + '%';
        });
    }

    // ─── INIT ───
    function init() {
        animateCounters();
        initTiltCards();
        initMagneticButtons();
        initScrollProgress();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
