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
window.addEventListener('load', function() {
    const audio = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicToggle = document.getElementById('musicToggle');

    // Check if there's saved audio state in localStorage
    const savedMutedState = localStorage.getItem('audioMuted');
    const savedVolume = localStorage.getItem('audioVolume');
    const savedIsPlaying = localStorage.getItem('audioIsPlaying'); // Save playback state

    // Restore the saved volume
    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
        volumeSlider.value = audio.volume * 100; // Update the volume slider
    } else {
        audio.volume = 0.5; // Default to 50% volume
        volumeSlider.value = 50;
    }

    // Restore the mute state
    if (savedMutedState === 'true') {
        audio.muted = true; // Muted audio when state is saved as true
        musicToggle.checked = false; // Set toggle to unchecked (mute state)
    } else {
        audio.muted = false; // Unmuted audio when state is saved as false
        musicToggle.checked = true; // Set toggle to checked (unmute state)
    }

    // Restore playback state and try to resume if it was playing
    if (savedIsPlaying === 'true' && !audio.paused) {
        audio.play().catch((err) => {
            console.log('Autoplay was blocked or failed:', err);
        });
    }

    // Handle volume change
    volumeSlider.addEventListener('input', function() {
        const volume = volumeSlider.value / 100;
        audio.volume = volume;
        localStorage.setItem('audioVolume', volume); // Save volume in localStorage
    });

    // Handle mute/unmute toggle
    musicToggle.addEventListener('change', function() {
        if (musicToggle.checked) {
            // Unmute the audio
            audio.muted = false;
            localStorage.setItem('audioMuted', 'false');
            // Try to play the audio if it was playing before
            tryToPlayAudio();
        } else {
            // Mute the audio
            audio.muted = true;
            audio.pause(); // Pause the audio when muted
            localStorage.setItem('audioMuted', 'true');
        }
    });

    // Function to attempt playing the audio if it's not muted
    function tryToPlayAudio() {
        if (!audio.muted && audio.paused) {
            audio.play().catch((err) => {
                console.log('Autoplay blocked or failed to play audio:', err);
            });
        }
    }

    // Save the audio state when the user navigates away or mutes/unmutes
    window.addEventListener('beforeunload', function() {
        if (!audio.paused) {
            localStorage.setItem('audioIsPlaying', 'true');
        } else {
            localStorage.setItem('audioIsPlaying', 'false');
        }
    });

    // Handle the initial state when the page loads (audio should play if it was previously playing)
    if (!audio.muted && savedIsPlaying === 'true' && audio.paused) {
        tryToPlayAudio();
    }

    // Handle audio ended event to prevent page reset
    audio.addEventListener('ended', function() {
        // Restart the music from the beginning, do not reload the page
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play(); // Restart the audio playback
    });
});

// Function to play the click sound
function playClickSound() {
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle.checked) { // Play sound only if toggle is on
        const sound = document.getElementById('click-sound');
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }
}

// Function to play the click sound
function playClickSound() {
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle && soundToggle.checked) { // Play sound only if toggle is on
        const sound = document.getElementById('click-sound');
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }
}

// Save sound toggle state to localStorage
function saveSoundSetting(isEnabled) {
    localStorage.setItem('soundSetting', isEnabled ? 'on' : 'off');
}

// Load sound toggle state from localStorage
function loadSoundSetting() {
    const soundToggle = document.getElementById('soundToggle');
    const savedSetting = localStorage.getItem('soundSetting');

    if (soundToggle) {
        soundToggle.checked = savedSetting === 'on'; // Set toggle based on saved setting
    }
}

// Add event listener to save state when toggle is changed
function initializeSoundToggle() {
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        // Load the saved setting on page load
        loadSoundSetting();

        // Save the new setting whenever the toggle changes
        soundToggle.addEventListener('change', function () {
            saveSoundSetting(soundToggle.checked);
        });
    }
}

// Add event listener for clicks to play sound
document.addEventListener('click', function(event) {
    playClickSound();
});

// Initialize settings when the page loads
window.onload = function () {
    initializeSoundToggle();
};



// Create bubbles dynamically
function createBubbles() {
    const container = document.querySelector('.bubbles-container');

    for (let i = 0; i < 20; i++) { // Create 20 bubbles
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size
        if (Math.random() > 0.5) {
            bubble.classList.add('large');
        }

        // Random position
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${Math.random() * 6 + 6}s`; // Random animation duration

        container.appendChild(bubble);
    }
}

// Call the function when the page loads
window.onload = createBubbles;







