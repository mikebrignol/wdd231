document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    const form = document.getElementById('join-form');

    if (timestampInput) {
        timestampInput.value = new Date().toDateString();
    }

    form.addEventListener('submit', (e) => {
        const orgTitle = document.getElementById('orgTitle');
        const pattern = new RegExp(orgTitle.pattern);
        if (orgTitle.value && !pattern.test(orgTitle.valiue)) {
            e.preventDefault();
            orgTitle.focus();
            orgTitle.setCustomValidity("Use letters, hyphens ot spaces only. Minimum 7 characters.");
            orgTitle.reportValidity();
            orgTitle.addEventListener('input', () => orgTitle.setCustomValidity(''), {once: True});
            return false;
        }
    })
})