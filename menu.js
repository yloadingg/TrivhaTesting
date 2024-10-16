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
    window.close(); 
});

// Handle No button (cancel exit)
noExit.addEventListener('click', () => {
    exitGameModal.style.display = 'none';
});

// BackGround Music
function toggleMusic() {
    var audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}