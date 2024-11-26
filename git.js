// script.js

const textArea = document.getElementById('text');
const speakButton = document.getElementById('speakButton');
const clearButton = document.getElementById('clearButton');
const voiceSelect = document.getElementById('voiceSelect');

const synth = window.speechSynthesis;

// Populate the voice options
function populateVoices() {
    const voices = synth.getVoices();
    voiceSelect.innerHTML = '';

    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Speak the text when the button is clicked
speakButton.addEventListener('click', () => {
    const text = textArea.value;

    if (text.trim() === '') {
        alert('Please enter some text!');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Set selected voice
    const selectedVoiceIndex = voiceSelect.value;
    utterance.voice = synth.getVoices()[selectedVoiceIndex];

    // Speak the text
    synth.speak(utterance);
});

// Clear the text area when the "Clear" button is clicked
clearButton.addEventListener('click', () => {
    textArea.value = '';
});

// Populate voices on page load
populateVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
}
