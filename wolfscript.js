// Animation index, keeps track of which CSS animation we're at
var aIndex = 0;

// Get wolfgirl elem and listen for animation end
var anim = document.getElementById("wolfGirl");
var box1 = document.getElementById("topBox");
var box2 = document.getElementById("botBox");

// Audio
var wanwan =  new Audio('wanwan.ogg');

var blackBoxes = function(duration) {
    box1.style.animationName = "boxTop";
    box2.style.animationName = "boxBot";

    box1.style.WebKitAnimationDuration = duration;
    box1.style.animationDuration  = duration;

    box2.style.WebKitAnimationDuration = duration;
    box2.style.animationDuration  = duration;
}

var shake = function(duration) {
    anim.style.WebKitAnimationTimingFunction = "steps(10, end)";
    anim.style.animationTimingFunction = "steps(10, end)";
}

var animHandler = function () {
    const durationValues = ["500ms", "250ms", "125ms"];

    anim.style.WebKitAnimationTimingFunction = "ease";
    anim.style.animationTimingFunction = "ease";

    funcs = [null,null, null,
             null, 'blackBoxes', null,
             'shake', null, null,
             'blackBoxes', null,
             null, null, null,
             null, null, null,
             null, null, null,
             null, null, null,
             null, null];
    animations = ["goLeft", "fromBRight", "topRight",
                  "backFlip", "fullScreen", "frontFlip",
                  "shake", "frontFlip", "goLeft",
                  "fullScreen", "fromBRight", 'topRight',
                  "frontFlipAborted", "frontFlip", "goLeft",
                  "fromBRight", "frontFlip", "backFlip",
                  "frontFlip", "goLeft", "fromBRight",
                  "frontFlipAborted", "backFlip", "frontFlip",
                  "shake", "shake2"];
    durations = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 1,
                 1, 1, 1,
                 1, 1, 1,
                 1, 1, 1,
                 1, 1, 2,
                 2, 2, 2,
                 2, 2];

    if (funcs[aIndex] != null)
        window[funcs[aIndex]](durationValues[durations[aIndex]]);
    if (animations[aIndex] != null)
    {
        anim.style.WebKitAnimationDuration = durationValues[durations[aIndex]];
        anim.style.animationDuration = durationValues[durations[aIndex]];
        anim.style.WebkitAnimationName = animations[aIndex];
        anim.style.animationName = animations[aIndex];
        if (aIndex != animations.length - 1)
            aIndex++;
        else
            aIndex--;
    }
}

var boxAnimHandler = function () {
    box1.style.animationName = "";
    box2.style.animationName = "";
}

function userSaidPlay() {
    document.getElementById("playButton").style.display = "none";
    wanwan.play();
}

window.onload = function () {
    anim.addEventListener("webkitAnimationEnd", animHandler, false);
    anim.addEventListener("MSAnimationEnd", animHandler, false);
    anim.addEventListener("animationend", animHandler, false);

    box1.addEventListener("animationend", boxAnimHandler, false);
    box1.addEventListener("wekbkitAnimationEnd", boxAnimHandler, false);
    box1.addEventListener("MSAnimationEnd", boxAnimHandler, false);

    wanwan.addEventListener("play", function() {
        aIndex = 0;
        animHandler();
    }, false);
    wanwan.addEventListener("ended", function() {
        box1.style.animationName = "";
        box2.style.animationName = "";
        this.currentTime = 0;
        this.play();
    }, false);
    wanwan.play();
    // If their browser sucks, we display the play button.
    if (wanwan.paused)
    {
        document.getElementById("playButton").style.display = "block";
    }
}
