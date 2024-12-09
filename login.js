document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
             //ace samarita gonzales gener
             //danrev lazo asistido kasongkamayan 
             

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                localStorage.setItem('token', data.token);
                if (data.isAdmin) {
                    window.location.href = '/admin.html'
                } else {
                    window.location.href = '/menu';
                }
            } else {
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    });
});

