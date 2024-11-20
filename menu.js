// MENU JS
const settingsModal = document.getElementById('settingsModal');
const achievementsModal = document.getElementById('achievementsModal');
const exitGameModal = document.getElementById('exitGameModal');

// Get buttons
const settingsBtn = document.getElementById('settingsBtn');
const achievementsBtn = document.getElementById('achievementsBtn');
const exitGameBtn = document.getElementById('exitGameBtn');

// close buttons
const closeSettingsModal = document.getElementById('closeSettingsModal');
const closeAchievementsModal = document.getElementById('closeAchievementsModal');

// modals
settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

achievementsBtn.addEventListener('click', () => {
    achievementsModal.style.display = 'flex';
});

exitGameBtn.addEventListener('click', () => {
    exitGameModal.style.display = 'flex';
});

closeSettingsModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});


closeAchievementsModal.addEventListener('click', () => {
    achievementsModal.style.display = 'none';
});


const yesExit = document.getElementById('yesExit');
const noExit = document.getElementById('noExit');

yesExit.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
});

// Handle No button (cancel exit)
noExit.addEventListener('click', () => {
    exitGameModal.style.display = 'none';
});

// BackGround Music
window.addEventListener('load', function() {
    const audio = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicToggle = document.getElementById('musicToggle');

    // Check if there's saved audio state in localStorage
    const savedMutedState = localStorage.getItem('audioMuted');
    const savedVolume = localStorage.getItem('audioVolume');
    const savedIsPlaying = localStorage.getItem('audioIsPlaying');

    // Restore the saved volume
    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
        volumeSlider.value = audio.volume * 100; // Update the volume slider
    } else {
        audio.volume = 0.5; // Default to 50% volume
        volumeSlider.value = 50;
    }

    // Handle mute/unmute toggle
    if (savedMutedState === 'true') {
        audio.muted = true; // Muted audio when state is saved as true
        musicToggle.checked = false; // Set toggle to unchecked (mute state)
    } else {
        audio.muted = false; // Unmuted audio when state is saved as false
        musicToggle.checked = true; // Set toggle to checked (unmute state)
    }

    // Function to attempt playing the audio (if it's unmuted)
    function tryToPlayAudio() {
        if (!audio.muted && audio.paused) {
            audio.play().catch(err => {
                console.log('Autoplay blocked or failed to play audio:', err);
            });
        }
    }

    // Handle the volume change
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
            tryToPlayAudio(); // Try to play the audio if it's unmuted
        } else {
            // Mute the audio
            audio.muted = true;
            audio.pause(); // Pause the audio when muted
            localStorage.setItem('audioMuted', 'true');
        }
    });

    // If the audio was playing before navigation, try to restore playback
    if (savedIsPlaying === 'true') {
        tryToPlayAudio();
    }

    // Save the audio state when the user navigates away or mutes/unmutes
    window.addEventListener('beforeunload', function() {
        // Save whether the audio is playing or paused
        if (!audio.paused) {
            localStorage.setItem('audioIsPlaying', 'true');
        } else {
            localStorage.setItem('audioIsPlaying', 'false');
        }
    });

    // Play the audio if it's not muted and it's not already playing
    if (!audio.muted && savedIsPlaying !== 'true' && audio.paused) {
        tryToPlayAudio();
    }
});
