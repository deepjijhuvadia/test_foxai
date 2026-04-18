/* ═══════════════════════════════════════════════════════════
   FoxAI — Particle System
   Floating ambient particles
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    function initParticles() {
        var container = document.getElementById('particles');
        if (!container) return;

        var count = 30;

        for (var i = 0; i < count; i++) {
            var p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (15 + Math.random() * 25) + 's';
            p.style.animationDelay = (Math.random() * 20) + 's';
            var size = (1 + Math.random() * 2) + 'px';
            p.style.width = size;
            p.style.height = size;
            container.appendChild(p);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
})();
