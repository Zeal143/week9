document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('formMessages');

    contactForm.addEventListener('submit', function(e) {
        //Prevents the default form reset
        e.preventDefault();

        let isValid = true;

        // Clear previous messages
        formMessages.innerHTML = '';

        // Validate Name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Please provide your full name.');
            isValid = false;
        } else {
            showSuccess(name);
        }

        // Validate Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'Please provide an email address.');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please provide a valid email address.');
            isValid = false;
        } else {
            showSuccess(email);
        }

        // Validate Query Type
        const queryType = document.getElementById('queryType');
        if (queryType.value === '') {
            showError(queryType, 'Please select a query type.');
            isValid = false;
        } else {
            showSuccess(queryType);
        }

        // Validate Message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError(message, 'Please provide a message.');
            isValid = false;
        } else if (message.value.trim().length < 20) {
            showError(message, 'Message must be at least 20 characters long.');
            isValid = false;
        } else {
            showSuccess(message);
        }

        if (isValid) {
            // Show success message
            formMessages.innerHTML = `
                <div class="alert alert-success">
                    Thank you! Your message has been sent to us successfully. We will contact you in next 2 or 3 working days.
                </div>
            `;
            contactForm.reset();
            
            // Removes the is-valid CSS class from each
            const fields = [name, email, queryType, message];
            fields.forEach(field => field.classList.remove('is-valid'));
            
        } else {
            formMessages.innerHTML = `
                <div class="alert alert-danger">
                    Please correct the errors in the above form.
                </div>
            `;
        }
    });

    function showError(field, message) {
        // Visual styling for invalid state
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        let feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        }
    }

    function showSuccess(field) {
        // Visual styling for valid state
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
    }
});
