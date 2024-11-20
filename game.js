// Handle modals

   // Handle modals
   function openCategoryModal(difficulty) {
    const difficultyModal = document.getElementById("difficultyModal");
    const categoryModal = document.getElementById("categoryModal");
    const modalDifficulty = document.getElementById("modal-difficulty");

    
    modalDifficulty.textContent = "Difficulty: " + difficulty;

  
    difficultyModal.style.animation = "zoomOut 0.3s forwards";
    difficultyModal.addEventListener("animationend", function onAnimationEnd() {
        difficultyModal.classList.add("hidden");
        difficultyModal.style.display = "none"; 
        difficultyModal.style.animation = ""; 
        difficultyModal.removeEventListener("animationend", onAnimationEnd);

      
        categoryModal.classList.remove("hidden");
        categoryModal.style.display = "flex";
        categoryModal.style.animation = "zoomIn 0.3s forwards";
    });
}

function closeCategoryModal() {
    const categoryModal = document.getElementById("categoryModal");
    const difficultyModal = document.getElementById("difficultyModal");

 
    categoryModal.style.animation = "zoomOut 0.3s forwards";
    categoryModal.addEventListener("animationend", function onAnimationEnd() {
        categoryModal.classList.add("hidden");
        categoryModal.style.display = "none"; 
        categoryModal.style.animation = ""; 
        categoryModal.removeEventListener("animationend", onAnimationEnd);

   
        difficultyModal.classList.remove("hidden");
        difficultyModal.style.display = "block";
        difficultyModal.style.animation = "zoomIn 0.3s forwards";
    });
}

function selectCategory(category) {
    const categoryModal = document.getElementById("categoryModal");
    const quizContainer = document.getElementById("quizContainer");
    const questionText = document.getElementById("question-text");

    // Log selected category
    console.log("Selected Category: " + category);

    // Close the category modal with animation
    categoryModal.style.animation = "zoomOut 0.3s forwards";
    categoryModal.addEventListener("animationend", function onAnimationEnd() {
        categoryModal.classList.add("hidden");
        categoryModal.style.display = "none"; 
        categoryModal.style.animation = ""; 
        categoryModal.removeEventListener("animationend", onAnimationEnd);

        // Show the QA container
        quizContainer.classList.remove("hidden");
        quizContainer.style.display = "block";
        quizContainer.style.animation = "zoomIn 0.3s forwards";

        // Use the game logic to load the first question
        loadQuiz(category);
    });
}


function openBackModal() {
    const backModal = document.getElementById('back-modal');
    backModal.style.display = 'flex'; // Make modal visible (flex to center it)
}

// Function to close the modal
function closeBackModal() {
    const backModal = document.getElementById('back-modal');
    backModal.style.display = 'none'; // Hide the modal
}

// Function to restart the game
function restartGame() {
    closeBackModal(); // Close the modal first
    // Redirect to the difficulty selection page or restart game
    // You can modify this to reload the page or navigate elsewhere
    window.location.reload(); // Example: Refresh the page
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

// Music
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
        sound.currentTime = 0;  
        sound.play();
    }
}


document.addEventListener('click', function(event) {
    playClickSound();  
});
