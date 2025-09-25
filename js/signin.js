// Enhanced form functionality
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signinForm');
    const inputs = document.querySelectorAll('.input-field');
    const submitBtn = document.getElementById('submitBtn');
    const googleSignIn = document.getElementById('googleSignIn');

    // Input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Form submission with fetch API
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Get form data
        const userData = {
            username: document.querySelector('.user_Name').value,
            password: document.querySelector('.user_Password').value,
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data.data);

            // Store tokens and username
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            localStorage.setItem("userName", userData.username);

            // Show success message (optional)
            await Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Redirecting to homepage...',
                background: 'rgba(15, 15, 35, 0.95)',
                color: '#fff',
                confirmButtonColor: '#06b6d4',
                timer: 1500,
                showConfirmButton: false
            });

            // Redirect after delay for smoother UX
            setTimeout(() => {
                window.location.href = "../pages/homePage.html";
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);

            // Show error message
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid credentials or server error. Please try again.",
                background: 'rgba(15, 15, 35, 0.95)',
                color: '#fff',
                confirmButtonColor: '#06b6d4'
            });

            // Reset form
            form.reset();
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Google Sign In
    if (googleSignIn) {
        googleSignIn.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show loading message
            Swal.fire({
                title: 'Google Sign In',
                text: 'Redirecting to Google OAuth...',
                icon: 'info',
                background: 'rgba(15, 15, 35, 0.95)',
                color: '#fff',
                confirmButtonColor: '#06b6d4',
                timer: 2000,
                showConfirmButton: false
            });

            // Redirect to Google OAuth
            setTimeout(() => {
                googleSignInRedirect();
            }, 1000);
        });
    }

    // Forgot password
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', async function (e) {
            e.preventDefault();

            const { value: email } = await Swal.fire({
                title: 'Reset Password',
                text: 'Enter your email address and we\'ll send you a reset link.',
                input: 'email',
                inputPlaceholder: 'Enter your email',
                background: 'rgba(15, 15, 35, 0.95)',
                color: '#fff',
                confirmButtonColor: '#06b6d4',
                cancelButtonColor: '#6b7280',
                showCancelButton: true,
                confirmButtonText: 'Send Reset Link',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to enter your email!'
                    }
                    if (!value.includes('@')) {
                        return 'Please enter a valid email address!'
                    }
                }
            });

            if (email) {
                try {
                    // Optional: Send password reset request to backend
                    const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: email })
                    });

                    if (response.ok) {
                        Swal.fire({
                            title: 'Reset Link Sent!',
                            text: 'Check your email for password reset instructions.',
                            icon: 'success',
                            background: 'rgba(15, 15, 35, 0.95)',
                            color: '#fff',
                            confirmButtonColor: '#06b6d4'
                        });
                    } else {
                        throw new Error('Failed to send reset email');
                    }
                } catch (error) {
                    console.error('Password reset error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to send reset email. Please try again later.',
                        icon: 'error',
                        background: 'rgba(15, 15, 35, 0.95)',
                        color: '#fff',
                        confirmButtonColor: '#06b6d4'
                    });
                }
            }
        });
    }
});

// Password visibility toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
        `;
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
}

// Google Sign In redirect function
function googleSignInRedirect() {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}

// Smooth scroll reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Observe form elements for reveal animation
document.querySelectorAll('.input-group, .btn-primary, .btn-google, .welcome-badge').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});