window.onload = () => {
    document.querySelector('#calculate').onclick = calculate;
    document.querySelector('#reset').onclick = reset;
    document.querySelector('#stop').onclick = stopAlarm;
}

// Load alarm sound
const alarmSound = new Audio('sounds/alarm.mp3');
alarmSound.loop = true; // Make the alarm loop

let interval; // Store interval so we can clear it later

function calculate() {
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;

    const endTime = new Date(date + " " + time);
    
    interval = setInterval(() => {
        if (!calculateTime(endTime)) {
            clearInterval(interval);
            alarmSound.play(); // Play looping alarm when timer reaches zero
        }
    }, 1000);
}

function calculateTime(endTime) {
    const currentTime = new Date();

    const days = document.querySelector('#countdown-days');
    const hours = document.querySelector('#countdown-hours');
    const minutes = document.querySelector('#countdown-minutes');
    const seconds = document.querySelector('#countdown-seconds');

    if (endTime > currentTime) {
        const timeLeft = (endTime - currentTime) / 1000;

        days.innerText = Math.floor(timeLeft / (24 * 60 * 60));
        hours.innerText = Math.floor((timeLeft / (60 * 60)) % 24);
        minutes.innerText = Math.floor((timeLeft / 60) % 60);
        seconds.innerText = Math.floor(timeLeft % 60);

        return true;
    } else {
        days.innerText = 0;
        hours.innerText = 0;
        minutes.innerText = 0;
        seconds.innerText = 0;

        return false;
    }
}

function stopAlarm() {
    alarmSound.pause();  // Pause the sound
    alarmSound.currentTime = 0; // Reset to beginning
    clearInterval(interval); // Stop the countdown if it's still running
}

function reset() {
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;

    stopAlarm(); // Stop the alarm if reset is pressed
}
