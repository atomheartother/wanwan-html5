// This script is the "engine" of sorts of the website. It's fairly generic.

// This keeps track of which animation we're playing
var currentAnimation;
// Animation index, keeps track of which index we're at.
var aIndex = 0;

// The durationValues tab is so we don't have to re-write times every time
const durationValues = ["500ms", "250ms", "125ms"];
// The above but with numbers. I know, I know, but I'm not going to parse a string every 0.5s.
const durationNumValues = [500, 250, 125];

// Post holds a function to execute after an animation has ended and before the next one starts
// Nothing happens if it is null
var post = null;

// Holds the current wolfgirl
var curGirl = null;

// Holds the current song. Must be a Howl object.
var currentSong;

// The animations variable contains animation instructions, and allows us to add more animations in the future
// Attributes:
// Steps: Array, each element is a new animation
// funcIn: Function to execute when entering this animation
// funcOut: Function to execute when leaving this animation

// Steps attributes:
// name: Obligatory, refers to the class attached to wolfGirl
// duration: Obligatory, duration of this animation, revers to the durationValues array
// elems: Optional, animation duration is set for the elements with these IDs (this doesn't trigger the animation!)
// func: Optional, function to execute before this animation plays. Receives the duration as parameter

// See original.js for reference
var animations = {};

var anim = document.getElementById("wolfGirl");
var img = document.getElementById("wolfImg");

var setDurationOnElement = function(elem, duration) {
    if (elem.style.animationDuration !== duration) {
        elem.style.WebKitAnimationDuration = duration;
        elem.style.animationDuration = duration;
    }
}

// Called at the end of each animation
var animHandler = function () {
    // Currently unused since there are no func selectors
    // if (post != null)
    // {
    //     post();
    //     post = null;
    // }
    anim.className = "";
    var cur = currentAnimation.steps[aIndex++];
    if (!cur) { // aIndex isn't up to date for some reason, skip this and print errors
        console.error("cur is undefined! aIndex = " + aIndex);
        console.error(currentAnimation);
        return ;
    }
    if (cur.hasOwnProperty("func"))
        window[cur.func](durationValues[cur.duration]);
    if (cur.hasOwnProperty("elems")) {
        for (var id of cur.elems) {
            setDurationOnElement(document.getElementById(id), durationValues[cur.duration]);
        }
    }
    setDurationOnElement(anim, durationValues[cur.duration]);
    anim.classList.add(cur.name);
    if (aIndex === currentAnimation.steps.length)
        anim.classList.add("infiniteLoop");
};

anim.addEventListener("webkitAnimationEnd", animHandler, false);
anim.addEventListener("MSAnimationEnd", animHandler, false);
anim.addEventListener("animationend", animHandler, false);

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
    currentSong.volume(newvol);
}

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

// Handles changing animations.
function changeAnimation(newState) {
    if (!!currentAnimation) {
        if (newState === currentAnimation.name) return;
        // Call the current animation's funcOut if there is one
        if (currentAnimation.hasOwnProperty('funcOut')) {
            currentAnimation.funcOut();
        }
    }
    // Important: currentanimation MUST be set in funcin(). Funcin() takes care of ALL the initialization.
    if (animations[newState].hasOwnProperty('funcIn')) {
        animations[newState].funcIn();
    }
}

// If the page was hidden, then made visible again, we need to readjust our animation counter
// Because the browser changed the framerate while the user wasn't looking
// All time values in ms
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        var time = 0;
        for (var index in currentAnimation) {
            var n = currentAnimation[index];
            // Add animation timing
            time += durationNumValues[n.duration];
            if (time > currentSong.seek() * 1000 + 100) { // This animation is the next one that should be played in the song
                // Create a closure with the index so it's not affected by the asynchronous nature of the operation, just in caaaase
                (function(idx) {
                    setTimeout(function() {
                    aIndex = idx;
                    animHandler();
                    }, time - currentSong.seek() * 1000);
                })(index);
                return ;
            }
        }
        console.error("Animation offset correction failed. I really tried!");
    }
});

// Handle the window resizing to scale the bgColor element
var resizeHandler = function() {
    document.getElementById('bgColor').style.transform = "scale3d("+ window.innerWidth * 1.2 + ", " + window.innerHeight * 1.2 + ", 1) translate3d(48%, 48%, 0)";
}

window.onload = function() {
    // scale up the background color from 1x1px to whatever the screen size is
    resizeHandler();
    changeAnimation("original");
};
