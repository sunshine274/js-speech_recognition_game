const msgEl = document.getElementById('msg');

const randomeNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You Said: </div>
    <span class="box">${msg}</span>
    `;
}

// Check msg against number
function checkNumber(msg) {
    const num = +msg;

    // Check if valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += `<div>That is not a valid number</div>`;
        return;
    }

    // Check in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
        return;
    }

    // Check number
    if(num === randomeNum) {
        document.body.innerHTML = `
        <h2>Congratulations! You have guessed the number! <br><br>
        It was ${msg}</h2>
        <button class="play-again" id="play-again">Play again!</button>
        `;
    } else if(num > randomeNum) {
        msgEl.innerHTML += '<div>Go Lower</div>';
    } else {
        msgEl.innerHTML += '<div>Go Higher</div>';
    }
}


// Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end',() => recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});