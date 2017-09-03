function startNightcore() {
    currentSong.rate(1.55);
    aIndex = 0;
    animHandler();
    currentSong.seek(0);
}

function endNightcore() {
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
