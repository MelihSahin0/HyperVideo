// script.js

// JSON-Objekt für den Bereich
var areaInfo = {
    top: 50,
    left: 50,
    width: 200,
    height: 100
};

var video = document.getElementById("myVideo");
var overlay = document.getElementById("overlay");
var clickArea = document.getElementById("click-area");
var backgroundAudio = document.getElementById("backgroundAudio");

// Starte das Hintergrundaudio, wenn das Video abgespielt wird
video.addEventListener("play", function () {
    backgroundAudio.play();
});

// Pausiere das Hintergrundaudio, wenn das Video pausiert wird
video.addEventListener("pause", function () {
    backgroundAudio.pause();
});

// Ändere die Zeit des Hintergrundaudios entsprechend der Videowiedergabe
video.addEventListener("timeupdate", function () {
    backgroundAudio.currentTime = video.currentTime;
});

// Set the position and dimensions of the click area
clickArea.style.top = areaInfo.top + "px";
clickArea.style.left = areaInfo.left + "px";
clickArea.style.width = areaInfo.width + "px";
clickArea.style.height = areaInfo.height + "px";

video.addEventListener("click", function (event) {
    if (
        video.currentTime >= 2 &&
        video.currentTime <= 6 &&
        isClickInArea(event, areaInfo)
    ) {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
});

function isClickInArea(event, areaInfo) {
    // Überprüfe, ob der Klick im definierten Bereich liegt
    return (
        event.clientX >= areaInfo.left &&
        event.clientX <= areaInfo.left + areaInfo.width &&
        event.clientY >= areaInfo.top &&
        event.clientY <= areaInfo.top + areaInfo.height
    );
}
