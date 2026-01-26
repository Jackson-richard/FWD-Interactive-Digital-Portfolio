document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.getElementById('spotlight');

    document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--x', e.clientX + 'px');
        spotlight.style.setProperty('--y', e.clientY + 'px');
    });
});


document.addEventListener('DOMContentLoaded', () => {
   
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const form = e.target;
            const data = new FormData(form);
            
           
            formStatus.innerHTML = 'Sending...';
            formStatus.style.display = 'block';

           
            fetch('https://formspree.io/f/xpwydvlp', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    
                    formStatus.innerHTML = "Thanks for your message! I'll get back to you soon.";
                    form.reset();
                } else {
                  
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                    });
                }
            }).catch(error => {
                
                formStatus.innerHTML = "Oops! There was a network error.";
            });
        });
    }
});