function startNightcore() {
    currentSong = wanwan;
    wanwan.rate(1.55);
    wanwan.seek(0);
    startNewAnimation();
    document.getElementById("bgColor").classList.add("colorCycleBg");
}

function endNightcore() {
    document.getElementById("bgColor").classList.remove("colorCycleBg");
    wanwan.rate(1);
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
        button.innerHTML = "Nightcore";
    } else {
        changeAnimation("nightcore");
        button.innerHTML = "Original";
    }
}
