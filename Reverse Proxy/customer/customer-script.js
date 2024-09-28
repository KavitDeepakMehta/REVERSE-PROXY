document.addEventListener("DOMContentLoaded", function() {
    const employeeLoginForm = document.getElementById("employeeLoginForm");
    const employeeRegisterForm = document.getElementById("employeeRegisterForm");

    // Handle Employee Login
    employeeLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("employeeEmail").value;
        const password = document.getElementById("employeePassword").value;

        if (!email || !password) {
            alert("Please fill in both email and password fields.");
        } else {
            alert(`Employee Login Success with Email: ${email}`);
            // Later: Add actual authentication logic (AJAX, Fetch, etc.)
        }
    });

    // Handle Employee Registration
    employeeRegisterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newEmployeeEmail = document.getElementById("newEmployeeEmail").value;
        const newEmployeePassword = document.getElementById("newEmployeePassword").value;

        if (!newEmployeeEmail || !newEmployeePassword) {
            alert("Please fill in all registration fields.");
        } else {
            alert(`Employee Registered Successfully with Email: ${newEmployeeEmail}`);
            // Later: Add actual registration logic (AJAX, Fetch, etc.)
        }
    });
});