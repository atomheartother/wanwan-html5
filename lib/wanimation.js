// This file contains the "engine" used by wanwan to handle animations.

// The animations variable contains animation instructions, and allows us to add more animations in the future
// Attributes:
// Steps: Array, each element is a new animation (Obligatory)
// funcIn: Function to execute when entering this animation (Optional)
// funcOut: Function to execute when leaving this animation (Optional, but clearly needed)

// Steps attributes:
// name: Obligatory, refers to the class attached to wolfGirl
// duration: Obligatory, duration of this animation, revers to the durationValues array
// elems: Optional, animation duration is set for the elements with these IDs (this doesn't trigger the animation!)
// func: Optional, function to execute before this animation plays. Receives the duration as parameter

// See original.js for reference
var animations = {};

// This keeps track of which animation we're playing
var currentAnimation;

// Holds the current song. Must be a Howl object.
var currentSong;

// This variable temporarily stores the next animation
// This is just a temp fix until I get around to making this whole file into an object
var nextAnimation = null;

// Animation index, keeps track of which index we're at within the animation
var aIndex = 0;

// The above but with numbers. I know, I know, but I'm not going to parse a string every 0.5s.
const durationNumValues = [500, 250, 125];

// Holds the animated element since there's only one rn
var anim;

// Post holds a function to execute after an animation has ended and before the next one starts
// Nothing happens if it is null
var post = null;

var setDurationOnElement = function(elem, duration) {
    if (elem.style.animationDuration !== duration) {
        elem.style.WebKitAnimationDuration = duration + 'ms';
        elem.style.animationDuration = duration + 'ms';
    }
}

// Called at the end of each animation
var animHandler = function () {
    // Currently unused since there are no post
    // if (post != null)
    // {
    //     post();
    //     post = null;
    // }
    anim.className = "";
    var cur = currentAnimation.steps[aIndex++];
    if (!cur) { // aIndex isn't up to date for some reason, skip anim and print errors
        console.error("cur is undefined! aIndex = " + aIndex);
        console.error(currentAnimation);
        return ;
    }
    if (cur.hasOwnProperty("func"))
        window[cur.func](cur.duration);
    if (cur.hasOwnProperty("elems")) {
        for (var id of cur.elems) {
            setDurationOnElement(document.getElementById(id), cur.duration);
        }
    }
    setDurationOnElement(anim, cur.duration);
    anim.classList.add(cur.name);
    // If we've reached the end of the animations, we loop infinitely until the animation is changed or the song loops
    if (aIndex === currentAnimation.steps.length)
        anim.classList.add("infiniteLoop");
};

// Never call animHandler directly. To start a new animation, call this function instead which will call it
var startNewAnimation = function() {
    // No new animation has been set. Just call animHandler
    if (nextAnimation !== null) {
        currentAnimation = nextAnimation;
        nextAnimation = null;
    }
    aIndex = 0;
    animHandler();
}

// Handles changing animations.
// For synchronisation purposes, we can't call startNewAnimation() here, each animation needs to call it in funcIn() when it is appropriate.
function changeAnimation(newState) {
    if (!!currentAnimation) {
        if (newState === currentAnimation.name) return;
        // Call the current animation's funcOut if there is one
        if (currentAnimation.hasOwnProperty('funcOut')) {
            currentAnimation.funcOut();
        }
    }
    nextAnimation = animations[newState];
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
            time += n.duration;
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

// Only supports one animated element rn
var registerAnimatedElement = function(element) {
    anim = element;
    // Call animHandler everytime the current animation ends
    element.addEventListener("webkitAnimationEnd", animHandler, false);
    element.addEventListener("MSAnimationEnd", animHandler, false);
    element.addEventListener("animationend", animHandler, false);
}

function volumeChange(newvol) {
    currentSong.volume(newvol);
}
