function startNightcore() {
    currentSong.rate(1.55);
    currentSong.seek(0);
    startNewAnimation();
    document.getElementById("bgColor").classList.add("colorCycleBg");
}

function endNightcore() {
    document.getElementById("bgColor").classList.remove("colorCycleBg");
    currentSong.rate(1);
}

// Add nightcore animation to the animations list
animations["nightcore"] = {
    "funcIn" : startNightcore,
    "funcOut": endNightcore,
    "steps" :[
        {"name" : "shake", "duration": 125},
    ],
};

function toggleNightcore() {
    var button = document.getElementById("nightcoreButton");
    if (currentAnimation === animations["nightcore"]) {
        changeAnimation("original");
        button.innerHTML = "nightcore";
    } else {
        changeAnimation("nightcore");
        button.innerHTML = "original";
    }
}
