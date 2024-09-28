document.addEventListener("DOMContentLoaded", function() {
    const loginForms = document.querySelectorAll('form');

    loginForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;

            if (email === "" || password === "") {
                alert("Please fill out all fields!");
            } else {
                alert(`Logging in with Email: ${email}`);
                // In a real application, you would handle authentication here.
            }
        });
    });

    // Optional: Handle switching between login and registration forms
    // You can add JavaScript for form toggling, if required.
});