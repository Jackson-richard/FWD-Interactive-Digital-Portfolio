document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.getElementById('spotlight');

    document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--x', e.clientX + 'px');
        spotlight.style.setProperty('--y', e.clientY + 'px');
    });
});

// --- AJAX Form Submission ---
document.addEventListener('DOMContentLoaded', () => {
    // Previous code for spotlight effect...

    // New code for the contact form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents the default form submission (page reload)

            const form = e.target;
            const data = new FormData(form);
            
            // Show a "sending" message
            formStatus.innerHTML = 'Sending...';
            formStatus.style.display = 'block';

            // Your Formspree link is now included here
            fetch('https://formspree.io/f/xpwydvlp', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success!
                    formStatus.innerHTML = "Thanks for your message! I'll get back to you soon.";
                    form.reset(); // Clear the form fields
                } else {
                    // Handle server errors
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                    });
                }
            }).catch(error => {
                // Handle network errors
                formStatus.innerHTML = "Oops! There was a network error.";
            });
        });
    }
});