/**
 * HMS Pro - Login Form Controller
 * Handles form validation, submission, and user interactions
 */

// DOM Elements
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const submitBtn = document.getElementById('submitBtn');
const errorAlert = document.getElementById('errorAlert');
const errorText = document.getElementById('errorText');
const successAlert = document.getElementById('successAlert');
const successText = document.getElementById('successText');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

// Validation patterns
const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: {
        minLength: 8,
        hasUpperCase: /[A-Z]/,
        hasLowerCase: /[a-z]/,
        hasNumbers: /\d/,
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
    }
};

// State
let isSubmitting = false;

/**
 * Initialize the login form
 */
function init() {
    setupEventListeners();
    loadRememberedEmail();
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Form submission
    form.addEventListener('submit', handleSubmit);

    // Password toggle
    togglePasswordBtn.addEventListener('click', togglePassword);

    // Real-time validation
    emailInput.addEventListener('blur', () => validateEmail(true));
    emailInput.addEventListener('input', () => {
        clearError('email');
        hideAlerts();
    });

    passwordInput.addEventListener('blur', () => validatePassword(true));
    passwordInput.addEventListener('input', () => {
        clearError('password');
        hideAlerts();
        updatePasswordStrength();
    });

    // Social login buttons
    document.getElementById('googleLogin').addEventListener('click', () => handleSocialLogin('Google'));
    document.getElementById('githubLogin').addEventListener('click', () => handleSocialLogin('GitHub'));

    // Forgot password
    document.getElementById('forgotPassword').addEventListener('click', handleForgotPassword);

    // Contact admin
    document.getElementById('contactAdmin').addEventListener('click', (e) => {
        e.preventDefault();
        showInfo('Please contact your system administrator to create an account.');
    });
}

/**
 * Load remembered email from localStorage
 */
function loadRememberedEmail() {
    const remembered = localStorage.getItem('hms_remember');
    if (remembered === 'true') {
        const savedEmail = localStorage.getItem('hms_email');
        if (savedEmail) {
            emailInput.value = savedEmail;
            document.getElementById('remember').checked = true;
        }
    }
}

/**
 * Save email to localStorage if remember me is checked
 */
function saveRememberedEmail() {
    const remember = document.getElementById('remember').checked;
    if (remember) {
        localStorage.setItem('hms_email', emailInput.value);
        localStorage.setItem('hms_remember', 'true');
    } else {
        localStorage.removeItem('hms_email');
        localStorage.removeItem('hms_remember');
    }
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate all fields
    const isEmailValid = validateEmail(true);
    const isPasswordValid = validatePassword(true);

    if (!isEmailValid || !isPasswordValid) {
        return;
    }

    // Start submission
    setSubmitting(true);
    hideAlerts();

    try {
        // Simulate API call
        await simulateLogin(emailInput.value, passwordInput.value);

        // Save remember me preference
        saveRememberedEmail();

        // Show success
        showSuccess('Login successful! Redirecting to dashboard...');

        // Simulate redirect
        setTimeout(() => {
            console.log('Redirecting to dashboard...');
            // window.location.href = '/dashboard';
        }, 2000);

    } catch (error) {
        showError(error.message || 'An error occurred. Please try again.');
    } finally {
        setSubmitting(false);
    }
}

/**
 * Simulate login API call
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Simulated API response
 */
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo credentials
            if (email === 'admin@hospital.com' && password === 'Admin@123') {
                resolve({ success: true, token: 'demo-token-123' });
            } else if (password.length < 8) {
                reject(new Error('Password must be at least 8 characters long.'));
            } else {
                reject(new Error('Invalid email or password. Please try again.'));
            }
        }, 1500);
    });
}

/**
 * Validate email field
 * @param {boolean} showError - Whether to show error message
 * @returns {boolean} - Is valid
 */
function validateEmail(showError = false) {
    const value = emailInput.value.trim();
    const emailGroup = document.getElementById('emailGroup');

    if (!value) {
        if (showError) {
            setError('email', 'Email address is required.');
            emailInput.setAttribute('aria-invalid', 'true');
        }
        return false;
    }

    if (!patterns.email.test(value)) {
        if (showError) {
            setError('email', 'Please enter a valid email address.');
            emailInput.setAttribute('aria-invalid', 'true');
        }
        return false;
    }

    clearError('email');
    emailInput.setAttribute('aria-invalid', 'false');
    return true;
}

/**
 * Validate password field
 * @param {boolean} showError - Whether to show error message
 * @returns {boolean} - Is valid
 */
function validatePassword(showError = false) {
    const value = passwordInput.value;

    if (!value) {
        if (showError) {
            setError('password', 'Password is required.');
            passwordInput.setAttribute('aria-invalid', 'true');
        }
        return false;
    }

    if (value.length < patterns.password.minLength) {
        if (showError) {
            setError('password', `Password must be at least ${patterns.password.minLength} characters.`);
            passwordInput.setAttribute('aria-invalid', 'true');
        }
        return false;
    }

    clearError('password');
    passwordInput.setAttribute('aria-invalid', 'false');
    return true;
}

/**
 * Update password strength indicator
 */
function updatePasswordStrength() {
    const value = passwordInput.value;
    let strength = 0;

    if (value.length >= patterns.password.minLength) strength++;
    if (patterns.password.hasUpperCase.test(value)) strength++;
    if (patterns.password.hasLowerCase.test(value)) strength++;
    if (patterns.password.hasNumbers.test(value)) strength++;
    if (patterns.password.hasSpecialChar.test(value)) strength++;

    // Update visual indicator
    strengthFill.className = 'strength-fill';

    if (value.length === 0) {
        strengthText.textContent = '';
        return;
    }

    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Weak password';
        strengthText.style.color = 'var(--error-500)';
    } else if (strength <= 3) {
        strengthFill.classList.add('fair');
        strengthText.textContent = 'Fair password';
        strengthText.style.color = 'var(--warning-500)';
    } else if (strength <= 4) {
        strengthFill.classList.add('good');
        strengthText.textContent = 'Good password';
        strengthText.style.color = '#22c55e';
    } else {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Strong password';
        strengthText.style.color = 'var(--success-600)';
    }
}

/**
 * Toggle password visibility
 */
function togglePassword() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    const eyeOpen = togglePasswordBtn.querySelector('.eye-open');
    const eyeClosed = togglePasswordBtn.querySelector('.eye-closed');

    if (type === 'text') {
        eyeOpen.hidden = true;
        eyeClosed.hidden = false;
        togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        togglePasswordBtn.setAttribute('aria-pressed', 'true');
    } else {
        eyeOpen.hidden = false;
        eyeClosed.hidden = true;
        togglePasswordBtn.setAttribute('aria-label', 'Show password');
        togglePasswordBtn.setAttribute('aria-pressed', 'false');
    }
}

/**
 * Set error message for a field
 * @param {string} field - Field name
 * @param {string} message - Error message
 */
function setError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear error message for a field
 * @param {string} field - Field name
 */
function clearError(field) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Show error alert
 * @param {string} message - Error message
 */
function showError(message) {
    hideAlerts();
    errorText.textContent = message;
    errorAlert.hidden = false;
    errorAlert.focus();
}

/**
 * Show success alert
 * @param {string} message - Success message
 */
function showSuccess(message) {
    hideAlerts();
    successText.textContent = message;
    successAlert.hidden = false;
}

/**
 * Show info message
 * @param {string} message - Info message
 */
function showInfo(message) {
    alert(message);
}

/**
 * Hide all alerts
 */
function hideAlerts() {
    errorAlert.hidden = true;
    successAlert.hidden = true;
}

/**
 * Set submitting state
 * @param {boolean} submitting - Is submitting
 */
function setSubmitting(submitting) {
    isSubmitting = submitting;
    submitBtn.disabled = submitting;

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    btnText.hidden = submitting;
    btnLoading.hidden = !submitting;
}

/**
 * Handle social login
 * @param {string} provider - Social provider name
 */
function handleSocialLogin(provider) {
    showInfo(`${provider} login coming soon!`);
}

/**
 * Handle forgot password
 * @param {Event} e - Click event
 */
function handleForgotPassword(e) {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (email && patterns.email.test(email)) {
        showInfo(`Password reset link sent to ${email}`);
    } else {
        showInfo('Please enter your email address first, then click "Forgot password".');
        emailInput.focus();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);