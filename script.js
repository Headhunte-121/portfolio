/**
 * Nikhil Gavel — Portfolio Interactivity Engine
 * Features:
 * 1. Intersection Observer Active Pill Navigation Highlight (ByteGrad / AstroZen style)
 * 2. Case Study Tab Switching
 * 3. Smooth Anchor Scrolling
 * 4. Clipboard Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initClipboardToast();
});
/**
 * 01. ScrollSpy — Highlight active pill in navbar on scroll
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    if (!sections.length || !navItems.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}


/**
 * 03. Quick Copy Feedback on Email Pill
 */
function initClipboardToast() {
    const emailPill = document.getElementById('email-pill');
    if (!emailPill) return;

    emailPill.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'nikhilgavel2202@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const handleEl = emailPill.querySelector('.c-handle');
            const originalText = handleEl.textContent;
            
            handleEl.textContent = 'Copied to Clipboard! ✓';
            handleEl.style.color = 'var(--emerald)';

            setTimeout(() => {
                handleEl.textContent = originalText;
                handleEl.style.color = '';
            }, 2200);
        }).catch(() => {
            window.location.href = `mailto:${email}`;
        });
    });
}
