const switch_form_button = document.getElementById('switch-form');
const login_form = document.getElementById('login-form');
const signup_form = document.getElementById('signup-form');

function updateFormsBasedOnHash() {
    if (window.location.hash === '#login') {
        switch_form_button.setAttribute('href', '#signup');
        login_form.style.display = 'block';
        switch_form_button.innerText = "Sign up here"
        signup_form.style.display = 'none';
        return;
    } else if (window.location.hash === '#signup') {
        switch_form_button.setAttribute('href', '#login');
        login_form.style.display = 'none';
        switch_form_button.innerText = "Log in here"
        signup_form.style.display = 'block';
        return;
    }
    window.location.hash = '#login';
}

// Listen for hash changes to update forms
window.addEventListener('hashchange', updateFormsBasedOnHash);

// Switch form button click event
switch_form_button.addEventListener('click', function(e) {
    e.preventDefault();
    if (window.location.hash === '#login') {
        window.location.hash = '#signup';
    } else if (window.location.hash === '#signup') {
        window.location.hash = '#login';
    }
});

document.addEventListener("DOMContentLoaded" , function(){
    if (window.location.hash == ""){
        window.location.hash = '#login';
    }
    updateFormsBasedOnHash();
});