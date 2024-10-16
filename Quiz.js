// See Pass
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', function () {

    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
  
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

console.log('Test');

// See Pass

// Sign Up settings
document.getElementById("settingsIcon").addEventListener("click", function() {
    document.getElementById("settingsModal").classList.add("show");
});

document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("settingsModal").classList.remove("show");
});

// BG MUSIC
function toggleMusic() {
    var audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
