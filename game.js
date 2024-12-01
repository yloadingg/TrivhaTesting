// Handle modals
function openCategoryModal(difficulty) {
    const difficultyModal = document.getElementById("difficultyModal");
    const categoryModal = document.getElementById("categoryModal");
    const modalDifficulty = document.getElementById("modal-difficulty");
    const iconContainer = document.getElementById("iconContainer"); // Target the icons container

    modalDifficulty.textContent = "Difficulty: " + difficulty;

    // Disable or hide icons
    iconContainer.classList.add("hidden-icons"); // To hide icons
    // iconContainer.classList.add("disabled-icons"); // To disable icons instead

    difficultyModal.style.animation = "zoomOut 0.3s forwards"; // Apply zoom-out animation
    difficultyModal.addEventListener("animationend", function onAnimationEnd() {
        difficultyModal.classList.add("hidden"); // Hide the difficulty modal after animation
        difficultyModal.style.display = "none"; // Set display to none to hide it
        difficultyModal.style.animation = ""; // Reset animation
        difficultyModal.removeEventListener("animationend", onAnimationEnd); // Remove event listener

        categoryModal.classList.remove("hidden"); // Show the category modal
        categoryModal.style.display = "flex"; // Set display to flex to show it
        categoryModal.style.animation = "zoomIn 0.3s forwards"; // Apply zoom-in animation
    });
}

function closeCategoryModal() {
    const categoryModal = document.getElementById("categoryModal");
    const difficultyModal = document.getElementById("difficultyModal");
    const iconContainer = document.getElementById("iconContainer"); // Target the icons container

    // Enable or show icons
    iconContainer.classList.remove("hidden-icons"); // To show icons
    // iconContainer.classList.remove("disabled-icons"); // To re-enable icons

    categoryModal.style.animation = "zoomOut 0.3s forwards"; // Apply zoom-out animation
    categoryModal.addEventListener("animationend", function onAnimationEnd() {
        categoryModal.classList.add("hidden"); // Hide the category modal after animation
        categoryModal.style.display = "none"; // Set display to none to hide it
        categoryModal.style.animation = ""; // Reset animation
        categoryModal.removeEventListener("animationend", onAnimationEnd); // Remove event listener

        difficultyModal.classList.remove("hidden"); // Show the difficulty modal
        difficultyModal.style.display = "block"; // Set display to block to show it
        difficultyModal.style.animation = "zoomIn 0.3s forwards"; // Apply zoom-in animation
    });
}

function selectCategory(category) {
    const categoryModal = document.getElementById("categoryModal");
    const quizContainer = document.getElementById("quizContainer");
    const questionText = document.getElementById("question-text");

    // Log selected category
    console.log("Selected Category: " + category);

    // Close the category modal with animation
    categoryModal.style.animation = "zoomOut 0.3s forwards"; // Apply zoom-out animation
    categoryModal.addEventListener("animationend", function onAnimationEnd() {
        categoryModal.classList.add("hidden"); // Hide the category modal after animation
        categoryModal.style.display = "none"; // Set display to none to hide it
        categoryModal.style.animation = ""; // Reset animation
        categoryModal.removeEventListener("animationend", onAnimationEnd); // Remove event listener

        // Show the quiz container with animation
        quizContainer.classList.remove("hidden");
        quizContainer.style.display = "block"; // Set display to block to show it
        quizContainer.style.animation = "zoomIn 0.3s forwards"; // Apply zoom-in animation

        // Use the game logic to load the first question
        loadQuiz(category);
    });
}

function openBackModal() {
    const backModal = document.getElementById('back-modal');
    backModal.style.display = 'flex'; // Make modal visible (flex to center it)
}

function closeBackModal() {
    const backModal = document.getElementById('back-modal');
    backModal.style.display = 'none'; // Hide the modal
}

function restartGame() {
    closeBackModal(); // Close the modal first
    // Reload the page to restart the game or navigate elsewhere
    window.location.reload(); // Reloads the page to restart the quiz
}



// Game settings modal
document.getElementById("settingsIcon").addEventListener("click", function (event) {
    event.preventDefault();

    const difficultyModal = document.getElementById("difficultyModal");
    difficultyModal.style.display = "none";

    const settingsModal = document.getElementById("settingsModal");
    settingsModal.style.display = "flex";
});


document.getElementById("closeModal").addEventListener("click", function () {
    const settingsModal = document.getElementById("settingsModal");
    settingsModal.style.display = "none";

  
    const difficultyModal = document.getElementById("difficultyModal");
    difficultyModal.style.display = "block";
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

// Default sound setting
let soundEnabled = localStorage.getItem("soundEnabled") === "false" ? false : true;

// Set the toggle's initial state based on the saved preference
document.getElementById("soundToggle").checked = soundEnabled;

// Add event listener to the sound toggle
document.getElementById("soundToggle").addEventListener("change", (event) => {
    soundEnabled = event.target.checked;
    localStorage.setItem("soundEnabled", soundEnabled); // Save preference
});


