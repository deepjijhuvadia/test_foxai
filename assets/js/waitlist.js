/* ═══════════════════════════════════════════════════════════
   FoxAI — Waitlist Module (Supabase)
   Handles form submissions via Supabase backend
   ═══════════════════════════════════════════════════════════ */

var WaitlistModule = (function () {
    'use strict';

    // ─── SUPABASE CONFIG ───
    var SUPABASE_URL = 'https://bvayshgtithlsgkiukdk.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_anJ6XPz7sQ8JCKmRcr_pXA_JRJYCVx3';

    var _supabase = null;

    function getClient() {
        if (!_supabase) {
            if (typeof supabase !== 'undefined' && supabase.createClient) {
                _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            } else {
                console.error('WaitlistModule: Supabase JS not loaded');
                return null;
            }
        }
        return _supabase;
    }

    // ─── SAVE A NEW ENTRY ───
    async function saveEntry(entry) {
        var client = getClient();
        if (!client) {
            return { success: false, message: 'Connection error. Please try again.' };
        }

        try {
            var row = {
                full_name: entry.fullName || '',
                email: entry.email,
                instagram: entry.instagram || null,
                creator_type: entry.creatorType || 'Not specified',
                source: window.location.pathname
            };

            var result = await client
                .from('waitlist')
                .insert([row]);

            if (result.error) {
                // Check for duplicate email (unique constraint)
                if (result.error.code === '23505' || (result.error.message && result.error.message.includes('duplicate'))) {
                    return { success: false, message: 'This email is already on the waitlist!' };
                }
                console.error('WaitlistModule: Supabase error', result.error);
                return { success: false, message: 'Something went wrong. Please try again.' };
            }

            return { success: true, message: 'Welcome to FoxAI! You\'re on the list. 🎉' };
        } catch (e) {
            console.error('WaitlistModule: Failed to save entry', e);
            return { success: false, message: 'Connection error. Please try again.' };
        }
    }

    // ─── GET WAITLIST COUNT ───
    async function getCount() {
        var client = getClient();
        if (!client) return 0;

        try {
            var result = await client
                .from('waitlist')
                .select('*', { count: 'exact', head: true });

            return (result.count !== null && result.count !== undefined) ? result.count : 0;
        } catch (e) {
            console.error('WaitlistModule: Failed to get count', e);
            return 0;
        }
    }

    // ─── INIT INLINE WAITLIST (email-only form on home/CTA) ───
    function initInlineForm() {
        var forms = document.querySelectorAll('[data-waitlist-inline]');
        forms.forEach(function (form) {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                var emailInput = form.querySelector('input[type="email"]');
                var messageEl = form.querySelector('.form-message');
                var submitBtn = form.querySelector('button[type="submit"]');

                if (!emailInput || !emailInput.value.trim()) {
                    showMessage(messageEl, 'Please enter a valid email.', 'error');
                    return;
                }

                // Disable button
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Joining...';
                }

                var result = await saveEntry({
                    email: emailInput.value.trim(),
                    fullName: '',
                    instagram: '',
                    creatorType: 'Not specified'
                });

                showMessage(messageEl, result.message, result.success ? 'success' : 'error');

                if (result.success) {
                    emailInput.value = '';
                }

                // Re-enable button
                setTimeout(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Join Waitlist';
                    }
                }, 2000);
            });
        });
    }

    // ─── INIT FULL WAITLIST FORM (dedicated page) ───
    function initFullForm() {
        var form = document.getElementById('waitlist-full-form');
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            var fullName = form.querySelector('#wl-name');
            var email = form.querySelector('#wl-email');
            var instagram = form.querySelector('#wl-instagram');
            var creatorType = form.querySelector('#wl-creator-type');
            var messageEl = form.querySelector('.form-message');
            var submitBtn = form.querySelector('button[type="submit"]');

            // Validation
            if (!fullName.value.trim() || !email.value.trim()) {
                showMessage(messageEl, 'Please fill in your name and email.', 'error');
                return;
            }

            // Disable button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Joining...';
            }

            var result = await saveEntry({
                fullName: fullName.value.trim(),
                email: email.value.trim(),
                instagram: (instagram ? instagram.value.trim() : ''),
                creatorType: (creatorType ? creatorType.value : 'Not specified')
            });

            showMessage(messageEl, result.message, result.success ? 'success' : 'error');

            if (result.success) {
                form.reset();
            }

            // Re-enable button
            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Join Waitlist';
                }
            }, 2000);
        });

        // Live counter from Supabase
        updateLiveCounter();
    }

    // ─── UPDATE LIVE COUNTER ───
    async function updateLiveCounter() {
        var counterEl = document.querySelector('.counter-number');
        if (!counterEl) return;

        var count = await getCount();
        if (count > 0) {
            animateCounter(counterEl, count);
        }
    }

    function animateCounter(el, target) {
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(step);
    }

    // ─── SHOW MESSAGE HELPER ───
    function showMessage(el, text, type) {
        if (!el) return;
        el.textContent = text;
        el.className = 'form-message ' + type;
        el.style.display = 'block';

        setTimeout(function () {
            el.style.display = 'none';
        }, 5000);
    }

    // ─── INIT ───
    function init() {
        initInlineForm();
        initFullForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    return {
        saveEntry: saveEntry,
        getCount: getCount
    };
})();
