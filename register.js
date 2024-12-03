document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');

    // Password strength indicator
    password.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updatePasswordStrengthIndicator(strength);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitButton.disabled = true;

            // Simulate API call (replace with actual API call)
            setTimeout(() => {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                // Show success message and redirect
                showSuccessMessage();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        }
    });

    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 25;
        
        // Contains number
        if (/\d/.test(password)) strength += 25;
        
        // Contains lowercase
        if (/[a-z]/.test(password)) strength += 25;
        
        // Contains uppercase
        if (/[A-Z]/.test(password)) strength += 25;
        
        return strength;
    }

    function updatePasswordStrengthIndicator(strength) {
        passwordStrength.style.setProperty('--strength', strength + '%');
        
        let color;
        if (strength < 25) color = '#ef4444';
        else if (strength < 50) color = '#f97316';
        else if (strength < 75) color = '#eab308';
        else color = '#22c55e';

        passwordStrength.style.setProperty('--strength-color', color);
        passwordStrength.style.background = `linear-gradient(to right, var(--strength-color) var(--strength), #e2e8f0 var(--strength))`;
    }

    function validateForm() {
        let isValid = true;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;

        // Clear previous error states
        clearErrors();

        // Username validation
        if (username.length < 3) {
            showError('username', 'Username must be at least 3 characters long');
            isValid = false;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (password.value.length < 8) {
            showError('password', 'Password must be at least 8 characters long');
            isValid = false;
        }

        // Confirm password
        if (password.value !== confirmPassword.value) {
            showError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#ef4444';
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '#e2e8f0';
        });
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.backgroundColor = '#22c55e';
        successDiv.style.color = 'white';
        successDiv.style.padding = '16px';
        successDiv.style.borderRadius = '8px';
        successDiv.style.textAlign = 'center';
        successDiv.style.marginTop = '16px';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Account created successfully!';
        
        form.appendChild(successDiv);
    }

    // Social login buttons animation
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
