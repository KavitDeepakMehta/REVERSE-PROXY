document.addEventListener("DOMContentLoaded", function() {
    const adminLoginForm = document.getElementById("adminLoginForm");
    const adminRegisterForm = document.getElementById("adminRegisterForm");

    // Handle Admin Login
    adminLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;

        if (!email || !password) {
            alert("Please fill in both email and password fields.");
        } else {
            alert(`Admin Login Success with Email: ${email}`);
            // Later: Add actual authentication logic (AJAX, Fetch, etc.)
        }
    });

    // Handle Admin Registration
    adminRegisterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newAdminEmail = document.getElementById("newAdminEmail").value;
        const newAdminPassword = document.getElementById("newAdminPassword").value;

        if (!newAdminEmail || !newAdminPassword) {
            alert("Please fill in all registration fields.");
        } else {
            alert(`Admin Registered Successfully with Email: ${newAdminEmail}`);
            // Later: Add actual registration logic (AJAX, Fetch, etc.)
        }
    });
});