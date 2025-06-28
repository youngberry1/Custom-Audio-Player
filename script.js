document.addEventListener("DOMContentLoaded", () => {
    let audio = new Audio();
    let chosenFormat = "";
    let checkAudio = document.getElementById("status");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const restartBtn = document.getElementById("restartBtn");
    let controls = document.getElementById("controls");

    // Check supported format
    if (audio.canPlayType('audio/mpeg')) {
        audio.src = "./audio/43-Hero-feat-Sasha-Alex-Sloan-VIP-Mix.mp3";
        chosenFormat = "mp3";
    } else if (audio.canPlayType("audio/ogg; codecs=vorbis")) {
        audio.src = "./audio/43-Hero-feat-Sasha-Alex-Sloan-VIP-Mix.ogg";
        chosenFormat = "ogg";
    } else if (audio.canPlayType("audio/wav")) {
        audio.src = "./audio/43-Hero-feat-Sasha-Alex-Sloan-VIP-Mix.wav";
        chosenFormat = "wav";
    } else {
        checkAudio.innerText = "No supported audio formats!";
    }

    if (chosenFormat) {
        checkAudio.innerText = `The first supported chosen format is ${chosenFormat}`;
        controls.style.display = "flex";
        controls.ariaLive = "polite";

        audio.controls = true;
        audio.style.display = "block";
        controls.prepend(audio);

        playBtn.addEventListener("click", () => {
            audio.play();
            audio.volume = 0.5;
        });

        pauseBtn.addEventListener("click", () => {
            audio.pause();
        });

        restartBtn.addEventListener("click", () => {
            audio.pause();
            audio.currentTime = 0;
            audio.play().catch((err) => console.warn("Audio restart failed:", err));
        });


        // Keyboard support
        document.addEventListener("keydown", (e) => {
            switch (e.key.toLowerCase()) {
                case " ": // Space to toggle play/pause
                    e.preventDefault();
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                    break;
                case "r": // 'r' key to restart
                    audio.currentTime = 0;
                    audio.play();
                    break;
            }
        });
    }

})