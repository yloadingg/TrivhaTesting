document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value;
        const username = form.querySelector('input[type="text"]').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful!.');
                window.location.href = '/login.html';
            } else {
                alert(`Signup failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup.');
        }
    });
});
    