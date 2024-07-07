// script.js
document.getElementById('read-button').addEventListener('click', function() {
    const description = document.getElementById('product-description').value.trim();

    if (description) {
        const speech = new SpeechSynthesisUtterance(description);
        speech.lang = 'en-US';
        
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Google US English'));
        if (femaleVoice) {
            speech.voice = femaleVoice;
        }

        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter a product description.");
    }
});

// Ensure voices are loaded
window.speechSynthesis.onvoiceschanged = function() {
    const readButton = document.getElementById('read-button');
    readButton.disabled = false;
};
