// This keeps track of which animation we're playing
var currentAnimation;
// Animation index, keeps track of which index we're at.
var aIndex = 0;

// The durationValues tab is so we don't have to re-write times every time
const durationValues = ["500ms", "250ms", "125ms"];

// post holds a function to execute after an animation has ended and before the next one starts
var post = null;

// The animations variable contains animation instructions, and allows us to add more animations in the future
var animations = {
    "original" : [
    {"name" : "goLeft", "func" : "goLeft", "duration": 0},
    {"name" : "fromBRight", "func" : "fromBRight", "duration": 0},
    {"name" : "topRight", "func" : "topRight", "duration": 0},
    {"name" : "backFlip", "duration": 0},
    {"name" : "fullScreen", "func" : "blackBoxes", "duration": 0},
    {"name" : "frontFlip", "duration": 0},
    {"name" : "shake", "func" : "shake", "duration": 0},
    {"name" : "frontFlip", "duration": 0},
    {"name" : "goLeft", "func" : "goLeft", "duration": 1},
    {"name" : "fullScreen", "func" : "blackBoxes", "duration": 1},
    {"name" : "fromBRight", "func" : "fromBRight", "duration": 1},
    {"name" : "topRight", "func" : "topRight", "duration": 1},
    {"name" : "frontFlipAborted", "duration": 1},
    {"name" : "frontFlip", "duration": 1},
    {"name" : "goLeft", "func" : "goLeft", "duration": 1},
    {"name" : "fromBRight", "func" : "fromBRight", "duration": 1},
    {"name" : "frontFlip", "duration": 1},
    {"name" : "backFlip", "duration": 1},
    {"name" : "frontFlip", "duration": 1},
    {"name" : "goLeft", "func" : "goLeft", "duration": 1},
    {"name" : "fromBRight", "func" : "fromBRight", "duration": 2},
    {"name" : "frontFlipAborted", "duration": 2},
    {"name" : "backFlip", "duration": 2},
    {"name" : "frontFlip", "duration": 2},
    {"name" : "shake", "func" : "shake", "duration": 2},
  ],
  "nightcore" : [
    {"name" : "shake", "func" : "shake", "duration": 2},
  ],
};

var animHandler = function () {
    if (post != null)
    {
        post();
        post = null;
    }

    var cur = animations[currentAnimation][aIndex];
    if (cur.hasOwnProperty("func"))
        window[cur.func](durationValues[cur.duration]);
    anim.style.WebKitAnimationDuration = durationValues[cur.duration];
    anim.style.animationDuration = durationValues[cur.duration];
    anim.style.WebKitAnimationName = cur.name;
    anim.style.animationName = cur.name;
    aIndex++;
    if (aIndex == animations[currentAnimation].length)
        anim.classList.add("infiniteLoop");
    else if (anim.classList.contains("infiniteLoop"))
        anim.classList.remove("infiniteLoop");
}

var anim = document.getElementById("wolfGirl");
var img = document.getElementById("wolfImg");
var box1 = document.getElementById("topBox");
var box2 = document.getElementById("botBox");

// var wanLeft = document.getElementById("wanLeft");
// var wanRight = document.getElementById("wanRight");
// var wanCenter = document.getElementById("wanCenter");
var wanText = document.getElementById("wanText");

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

var resetBoxes = function() {
    box1.style.display = "none";
    box2.style.display = "none";
    box1.style.animationName = "";
    box2.style.animationName = "";
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

var noshake = function() {
    anim.style.WebKitAnimationTimingFunction = "ease";
    anim.style.animationTimingFunction = "ease";
}

var shake = function(duration) {
    anim.style.WebKitAnimationTimingFunction = "steps(10, end)";
    anim.style.animationTimingFunction = "steps(10, end)";

    post = noshake;
}

var noText = function() {
    wanText.style.display = "none";
}

var goLeft = function(duration) {
    wanText.innerHTML = "WAN~";
    wanText.style.display = "block";

    wanText.style.animationName = "rightText";
    wanText.style.WebKitAnimationDuration = duration;
    wanText.style.animationDuration  = duration;

    post = noText;
}

var fromBRight = function(duration) {
    wanText.innerHTML = "~ WAN";
    wanText.style.display = "block";

    wanText.style.animationName = "leftText";
    wanText.style.WebKitAnimationDuration = duration;
    wanText.style.animationDuration  = duration;
    post = noText;
}

var topRight = function (duration) {
    wanText.innerHTML = "WAN!";
    wanText.style.display = "block";
    wanText.style.animationName = "stretchyWan";
    wanText.style.WebKitAnimationDuration = duration;
    wanText.style.animationDuration  = duration;
    post = noText;
}

window.onload = function () {
    anim.addEventListener("webkitAnimationEnd", animHandler, false);
    anim.addEventListener("MSAnimationEnd", animHandler, false);
    anim.addEventListener("animationend", animHandler, false);

    box1.addEventListener("wekbkitAnimationEnd", resetBoxes, false);
    box1.addEventListener("MSAnimationEnd", resetBoxes, false);
    box1.addEventListener("animationend", resetBoxes, false);

    currentAnimation = "original";
    wanwan.play();
}
