// This keeps track of which animation we're playing
var currentAnimation;
// Animation index, keeps track of which index we're at.
var aIndex = 0;

// The durationValues tab is so we don't have to re-write times every time
const durationValues = ["500ms", "250ms", "125ms"];

// The above but with numbers. I know, I know.
const durationNumValues = [500, 250, 125];

// post holds a function to execute after an animation has ended and before the next one starts
var post = null;

// Holds the current girl
var curGirl = null;

// The animations variable contains animation instructions, and allows us to add more animations in the future
var animations = {
    "original" : [
        {"name" : "bottomLeft", "duration": 0},
        {"name" : "bottomRight",  "duration": 0},
        {"name" : "topRight",  "duration": 0},
        {"name" : "backFlip", "duration": 0},
        {"name" : "fullScreen", "func" : "blackBoxes", "duration": 0},
        {"name" : "frontFlip", "duration": 0},
        {"name" : "shake", "duration": 0},
        {"name" : "frontFlip", "duration": 0},
        {"name" : "bottomLeft",  "duration": 1},
        {"name" : "fullScreen",  "duration": 1},
        {"name" : "bottomRight",  "duration": 1},
        {"name" : "topRight",  "duration": 1},
        {"name" : "frontFlipAborted", "duration": 1},
        {"name" : "frontFlip", "duration": 1},
        {"name" : "bottomLeft", "duration": 1},
        {"name" : "bottomRight", "duration": 1},
        {"name" : "frontFlip", "duration": 1},
        {"name" : "backFlip", "duration": 1},
        {"name" : "frontFlip", "duration": 1},
        {"name" : "bottomLeft", "duration": 1},
        {"name" : "bottomRight", "duration": 2},
        {"name" : "frontFlipAborted", "duration": 2},
        {"name" : "backFlip", "duration": 2},
        {"name" : "frontFlip", "duration": 2},
        {"name" : "shake", "duration": 2},
  ],
    "nightcore" : [
        {"name" : "shake", "duration": 2},
    ],
};

var anim = document.getElementById("wolfGirl");
var img = document.getElementById("wolfImg");
var box1 = document.getElementById("topBox");
var box2 = document.getElementById("botBox");
var wanText = document.getElementById("wanText");

// Called at the end of each animation
var animHandler = function () {
    if (post != null)
    {
        post();
        post = null;
    }
    // if we're still on the previous animation, remove it
    if ((aIndex != 0 && anim.classList.contains(currentAnimation[aIndex - 1].name)) ||
        (aIndex === 0 && anim.classList.contains(currentAnimation[currentAnimation.length - 1].name)))
    {
        anim.classList.remove(aIndex === 0 ? currentAnimation[currentAnimation.length - 1].name
                              : currentAnimation[aIndex - 1].name);
    }
    var cur = currentAnimation[aIndex];
    if (cur.hasOwnProperty("func"))
        window[cur.func](durationValues[cur.duration]);
    anim.style.WebKitAnimationDuration = durationValues[cur.duration];
    anim.style.animationDuration = durationValues[cur.duration];
    anim.classList.add(cur.name);
    aIndex++;
    if (aIndex === currentAnimation.length)
        anim.classList.add("infiniteLoop");
    else if (anim.classList.contains("infiniteLoop"))
        anim.classList.remove("infiniteLoop");
}

function changeGirl(name) {
    if (wolves[name].hasOwnProperty("altFormat")) {    // If the girl has a non-png file
        img.src = "girls/" + name + "." + wolves[name].altFormat;
        img.onerror = function() {
            img.src = "girls/" + name + ".png";
        }
    }
    else {
        img.src = "girls/" + name + ".png";
    }
    curGirl = wolves[name];
}

// Checks the new hash's value and interpret it
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
        curGirl = null;
        // If it fails. display momiji
        img.onerror = function() {
            changeGirl("Momiji");
        }
        return ;
    }

    // If no valid hash was found, Momiji is default
    changeGirl("Momiji");
}

// Call checkHash on page load & everytime the hash changes
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
    if (e.keyCode == 27) { // ESC
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
    if (currentAnimation === animations["nightcore"]) {
        currentAnimation = animations["original"];
        wanwan.rate(1);
    } else {
        currentAnimation = animations["nightcore"];
        wanwan.rate(1.55);
    }
    wanwan.seek(0);
    aIndex = 0;
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

var noText = function() {
    wanText.style.display = "none";
}

var goLeft = function(duration) {
    wanText.innerHTML = curGirl != null && curGirl.hasOwnProperty("text") ? curGirl.text[0] : "WAN~";
    wanText.style.display = "block";

    wanText.style.animationName = "rightText";
    wanText.style.WebKitAnimationDuration = duration;
    wanText.style.animationDuration  = duration;

    post = noText;
}

var fromBRight = function(duration) {
    wanText.innerHTML = curGirl != null && curGirl.hasOwnProperty("text") ? curGirl.text[1] : "~WAN";
    wanText.style.display = "block";

    wanText.style.animationName = "leftText";
    wanText.style.WebKitAnimationDuration = duration;
    wanText.style.animationDuration  = duration;
    post = noText;
}

var topRight = function (duration) {
    wanText.innerHTML = curGirl != null && curGirl.hasOwnProperty("text") ? curGirl.text[2] : "WAN!";
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

    currentAnimation = animations["original"];
    wanwan.play();
}

// If the page was hidden, then made visible again, we need to readjust our animation counter
// Because the browser changed the framerate while the user wasn't looking
// All time values in ms
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        var time = 0;
        var index = 0;
        while (index < currentAnimation.length) {
            var n = currentAnimation[index];
            // Add animation timing
            time += durationNumValues[n.duration];
            if (time > wanwan.seek() * 1000 + 100) {
                // This animation is the next one that should be played in the song
                // Create a closure with the index so it's not affected by the asynchronous nature of the operation, just in caaaase
                (function(idx) {
                    setTimeout(function() {
                    aIndex = idx;
                    animHandler();
                    }, time - wanwan.seek() * 1000);
                })(index);
                return ;
            }
            index++;
        }
        console.error("Animation offset correction failed. I really tried!");
    }
});
