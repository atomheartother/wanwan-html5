function startNightcore() {
    currentSong.rate(1.55);
    aIndex = 0;
    currentAnimation = animations["nightcore"];
    animHandler();
    currentSong.seek(0);
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
        {"name" : "shake", "duration": 2},
    ],
};

function toggleNightcore() {
    if (currentAnimation === animations["nightcore"]) {
        changeAnimation("original")
    } else {
        changeAnimation("nightcore");
    }
}
