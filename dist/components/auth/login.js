const email_input_login = document.getElementById('emailuser-input-login');
const password_input_login = document.getElementById('password-input-login');
const login_button = document.getElementById('login-button');

login_button.addEventListener('click', async function (e) {
    e.preventDefault();

    if (email_input_login.value.length < 5) {
        toastr.error("Please provide a valid username or email adress");
        return;
    }


    try {
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': email_input_login.value,
                'password': password_input_login.value
            }),
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            toastr.error("Login failed. Please check your email and password.");
            return;
        }

        toastr.success("Login successful, redirecting in 3 seconds...");

        setTimeout(() => {
            window.location.href = "/home"; // Redirect to the dashboard or home page after login
        }, 3000);
    } catch (ex) {
        toastr.error(ex.message);
    }
});
