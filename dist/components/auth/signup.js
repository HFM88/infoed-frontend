const email_input = document.getElementById('email-input-signup');
const username_input = document.getElementById('username-input-signup');
const password_input = document.getElementById('password-input-signup');
const repassword_input = document.getElementById('repassword-input-signup');

const signup_button = document.getElementById('signup-button');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

signup_button.addEventListener('click', async function (e) {

    e.preventDefault();


    if (!validateEmail(email_input.value)) {
        toastr.error("Invalid email");
        return;
    }

    if (username_input.value.length <= 5 || username_input.value.length > 12) {
        toastr.error("Username must be between 5 and 12 characters long");
        return;
    }

    if (password_input.value != repassword_input.value) {
        toastr.error("Passwords don't match");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email_input.value,
                'username': username_input.value,
                'password': password_input.value
            }),
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            toastr.error("Unexpected error occured [1]");
            return;
        }

        toastr.success("Account successfully created , redirecting in 3 seconds...");

        setTimeout(() => {
            window.location.href = "/home"
        }, 3000);
    } catch (ex) {
        toastr.error(ex.message);
    }

})

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}