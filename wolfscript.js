// This keeps track of which animation we're playing
var currentAnimation;
// Animation index, keeps track of which index we're at.
var aIndex = 0;

// The durationValues tab is so we don't have to re-write times every time
const durationValues = ["500ms", "250ms", "125ms"];

// The animations variable contains animation instructions, and allows us to add more animations in the future
var animations = {
    "original" : [
        {"name" : "goLeft", "func" : "goLeft", "duration": 0},
        {"name" : "fromBRight",  "func" : "fromBRight",  "duration": 0},
        {"name" : "topRight",  "func" : "topRight",  "duration": 0},
        {"name" : "backFlip",  "func" : null,  "duration": 0},
        {"name" : "fullScreen",  "func" : "blackBoxes",  "duration": 0},
        {"name" : "frontFlip",  "func" : null,  "duration": 0},
        {"name" : "shake",  "func" : "shake",  "duration": 0},
        {"name" : "frontFlip",  "func" : null,  "duration": 0},
        {"name" : "goLeft",  "func" : "goLeft",  "duration": 1},
        {"name" : "fullScreen",  "func" : "blackBoxes",  "duration": 1},
        {"name" : "fromBRight",  "func" : "fromBRight",  "duration": 1},
        {"name" : "topRight",  "func" : "topRight",  "duration": 1},
        {"name" : "frontFlipAborted",  "func" : null,  "duration": 1},
        {"name" : "frontFlip",  "func" : null,  "duration": 1},
        {"name" : "goLeft",  "func" : "goLeft",  "duration": 1},
        {"name" : "fromBRight",  "func" : "fromBRight",  "duration": 1},
        {"name" : "frontFlip",  "func" : null,  "duration": 1},
        {"name" : "backFlip",  "func" : null,  "duration": 1},
        {"name" : "frontFlip",  "func" : null,  "duration": 1},
        {"name" : "goLeft",  "func" : "goLeft",  "duration": 1},
        {"name" : "fromBRight",  "func" : "fromBRight",  "duration": 2},
        {"name" : "frontFlipAborted",  "func" : null,  "duration": 2},
        {"name" : "backFlip",  "func" : null,  "duration": 2},
        {"name" : "frontFlip",  "func" : null,  "duration": 2},
        {"name" : "shake",  "func" : "shake",  "duration": 2},
        {"name" : "shake2",  "func" : "shake",  "duration": 2},
    ],
    "nightcore" : [
        {"name" : "shake",  "func" : "shake",  "duration": 2},
        {"name" : "shake2",  "func" : "shake",  "duration": 2},
    ],
};

var animHandler = function () {
    // Reset box styles
    box1.style.display = "none";
    box2.style.display = "none";
    box1.style.animationName = "";
    box2.style.animationName = "";

    anim.style.WebKitAnimationTimingFunction = "ease";
    anim.style.animationTimingFunction = "ease";

    wanLeft.style.display = "none";
    wanRight.style.display = "none";
    wanCenter.style.display = "none";

    var cur = animations[currentAnimation][aIndex];
    if (cur.func != null)
        window[cur.func](durationValues[cur.duration]);
    anim.style.WebKitAnimationDuration = durationValues[cur.duration];
    anim.style.animationDuration = durationValues[cur.duration];
    anim.style.WebkitAnimationName = cur.name;
    anim.style.animationName = cur.name;
    if (aIndex != animations[currentAnimation].length - 1)
        aIndex++;
    else
        aIndex--;
}

var anim = document.getElementById("wolfGirl");
var img = document.getElementById("wolfImg");
var box1 = document.getElementById("topBox");
var box2 = document.getElementById("botBox");

var wanLeft = document.getElementById("wanLeft");
var wanRight = document.getElementById("wanRight");
var wanCenter = document.getElementById("wanCenter");

function changeGirl(name) {
    // If the girl has an svg file
    if (wolves[name].svg === true) {
        img.src = "girls/" + name + ".svg";
        img.onerror = function() {
            img.src = "girls/" + name + ".png";
        }
    }
    else {
        img.src = "girls/" + name + ".png";
    }
}

function checkHash() {
    var newHash = location.hash.substring(1);

        for (var name in wolves) {
            if (newHash.toUpperCase() === name.toUpperCase()) {
                changeGirl(name);
                return ;
            }
        }
    // Check if it could be a custom URL
    if (newHash.substring(0, 5) === "curl=")
    {
        img.src = newHash.substring(5);
        // If it fails. display momiji
        img.onerror = function() {
            changeGirl("Momiji");
        }
        return ;
    }

    // If no valid hash was found, Momiji is default
    changeGirl("Momiji");
}

checkHash();

window.addEventListener("hashchange", checkHash);

function volumeChange(newvol) {
    wanwan.volume(newvol);
}

// Audio
var wanwan =  new Howl({
    src: ['res/wanwan.ogg', 'res/wanwan.mp3'],
    format: ['webm', 'mp3'],
    autoplay: false,
    loop: true,
    volume: parseFloat(document.getElementById("volSlider").value),
    onplay : function() {
        document.getElementById('loadingScreen').style.display = "none";
        aIndex = 0;
        animHandler();
    },
    onloaderror: function() {
        alert("I can't play on your browser, sorry! :c Please go to About and contact my maker about this.");
    },
});

window.onkeydown = function(e) {
    if (e.keyCode == 27) {
        // leave menu
        if (e.target == document.body && menu_isup == true)
            hideMenu();
        // unfocus input text
        else if (document.activeElement.id == 'customUrl' ||
                 document.activeElement.id == 'wolfSearch')
            document.activeElement.blur();
    }
    // Enter to submit URL
    else if (e.keyCode == 13 && document.activeElement.id == 'customUrl') {
        customGirl();
    }
};

function toggleNightcore() {
    aIndex = 0;
    if (currentAnimation === "nightcore") {
        currentAnimation = "original";
        wanwan.rate(1);
    } else {
        currentAnimation = "nightcore";
        wanwan.rate(1.55);
    }
    wanwan.seek(0);
    animHandler();
}

var blackBoxes = function(duration) {
    box1.style.display = "inline";
    box2.style.display = "inline";
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

var goLeft = function(duration) {
    wanRight.style.left = `${document.body.clientWidth * 5 / 100 + anim.clientWidth}px`;
    wanRight.style.display = "inline";

    wanRight.style.animationName = "rightText";
    wanRight.style.WebKitAnimationDuration = duration;
    wanRight.style.animationDuration  = duration;
}

var fromBRight = function(duration) {
    wanLeft.style.right = `${document.body.clientWidth * 2 / 100 + anim.clientWidth}px`;
    wanLeft.style.display = "inline";

    wanLeft.style.animationName = "leftText";
    wanLeft.style.WebKitAnimationDuration = duration;
    wanLeft.style.animationDuration  = duration;
}

var topRight = function (duration) {
    wanCenter.style.display = "inline";
    wanCenter.style.animationName = "stretchyWan";
    wanCenter.style.WebKitAnimationDuration = duration;
    wanCenter.style.animationDuration  = duration;
}

var boxAnimHandler = function () {
    box1.style.animationName = "";
    box2.style.animationName = "";
}

window.onload = function () {
    anim.addEventListener("webkitAnimationEnd", animHandler, false);
    anim.addEventListener("MSAnimationEnd", animHandler, false);
    anim.addEventListener("animationend", animHandler, false);

    box1.addEventListener("wekbkitAnimationEnd", boxAnimHandler, false);
    box1.addEventListener("MSAnimationEnd", boxAnimHandler, false);
    box1.addEventListener("animationend", boxAnimHandler, false);

    currentAnimation = "original";
    wanwan.play();
}

