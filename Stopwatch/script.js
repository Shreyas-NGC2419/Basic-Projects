const powBtn = document.getElementById("powerBtn");
const disptxt = document.getElementById("displaytxt");
const audplay = document.getElementById("clickSound");

let interval = null; //Interval for stopwatch updation
let blinkint = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let isOn = false;
let blinkint_counter = 0;  //Used to stop extra blink intervals from being invoked

function start() {
    if (!isRunning && isOn) {
        interval = setInterval(update, 10);
        startTime = Date.now() - elapsedTime;
        isRunning = true;
    }
    if (isOn)
        playSound();
}

function stop() {
    if (isRunning && isOn) {
        isRunning = false;
        clearInterval(interval);
        if (blinkint_counter == 0)
            blinkint = setInterval(blink, 500);
        blinkint_counter += 1;
        playSound();
    }
}

function reset() {
    stop();
    clearInterval(blinkint);
    blinkint = null;
    blinkint_counter = 0;
    interval = null;
    startTime = 0;
    elapsedTime = 0;
    displaytxt.innerText = '00:00:00:00';
    disptxt.classList.remove("hidden");
    playSound();
}

function power() {
    if (!isOn) {
        isOn = true;
        powBtn.innerText = "Power Off";
    }
    else {
        reset();
        isOn = false;
        powBtn.innerText = "Power On";
        // reset();  // Placing here gives a bug which is related to stop()
    }
    disptxt.classList.toggle("hidden");
    playSound();
}

function update() {
    if (isRunning && isOn) {
        let currentTime = Date.now();
        elapsedTime = currentTime - startTime;

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);

        let seconds = Math.floor((elapsedTime / 1000) % 60);

        let msecs = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        msecs = String(msecs).padStart(2, "0");

        displaytxt.textContent = `${hours}:${minutes}:${seconds}:${msecs}`;
    }
}

function blink() {
    if (isOn)
        disptxt.classList.toggle("hidden");
    else {
        disptxt.classList.remove("hidden");
        clearInterval(blinkint);
        blinkint_counter = 0;
    }
}

function playSound() {
    audplay.currentTime = 0;
    audplay.play();
}
