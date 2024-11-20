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
    const sound = document.getElementById('click-sound');
    if (sound) {
        sound.currentTime = 0;  // Reset the sound to the beginning (in case it's still playing)
        sound.play();
    }
}

// Add an event listener for click events on the entire document
document.addEventListener('click', function(event) {
    playClickSound();  // Play the click sound for any click event
});









