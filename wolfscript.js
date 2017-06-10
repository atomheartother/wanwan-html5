// Music volume
var volume = 0.5;

// Animation index, keeps track of which CSS animation we're at
var aIndex = 0;

// Get wolfgirl elem and listen for animation end
var anim = document.getElementById("wolfGirl");
var img = document.getElementById("wolfImg");
var box1 = document.getElementById("topBox");
var box2 = document.getElementById("botBox");

// Wan texts
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

// Audio
var wanwan =  new Howl({
    src: ['res/wanwan.ogg', 'res/wanwan.mp3'],
    format: ['webm', 'mp3'],
    autoplay: false,
    loop: true,
    volume: volume,
    onplay : function() {
        aIndex = 0;
        animHandler();
    },
    onloaderror: function() {
        alert("I can't play on your browser, sorry! :c Please go to About and contact my maker about this.");
    },
});

window.onkeydown = function(e) {
    // Use ESC to leave menu
    if (e.keyCode == 27 && e.target == document.body && menu_isup == true) {
        hideMenu();
    }
};

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

var animHandler = function () {
    const durationValues = ["500ms", "250ms", "125ms"];

    box1.style.display = "none";
    box2.style.display = "none";
    box1.style.animationName = "";
    box2.style.animationName = "";

    anim.style.WebKitAnimationTimingFunction = "ease";
    anim.style.animationTimingFunction = "ease";

    wanLeft.style.display = "none";
    wanRight.style.display = "none";
    wanCenter.style.display = "none";

    const funcs = ['goLeft', 'fromBRight', 'topRight',
             null, 'blackBoxes', null,
             'shake', null, 'goLeft',
             'blackBoxes', 'fromBRight', 'topRight',
             null, null, 'goLeft',
             'fromBRight', null, null,
             null, 'goLeft', 'fromBRight',
             null, null, null,
             null, null];

    const animations = ["goLeft", "fromBRight", "topRight",
                  "backFlip", "fullScreen", "frontFlip",
                  "shake", "frontFlip", "goLeft",
                  "fullScreen", "fromBRight", 'topRight',
                  "frontFlipAborted", "frontFlip", "goLeft",
                  "fromBRight", "frontFlip", "backFlip",
                  "frontFlip", "goLeft", "fromBRight",
                  "frontFlipAborted", "backFlip", "frontFlip",
                  "shake", "shake2"];
    const durations = [0, 0, 0,
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

window.onload = function () {
    anim.addEventListener("webkitAnimationEnd", animHandler, false);
    anim.addEventListener("MSAnimationEnd", animHandler, false);
    anim.addEventListener("animationend", animHandler, false);

    box1.addEventListener("wekbkitAnimationEnd", boxAnimHandler, false);
    box1.addEventListener("MSAnimationEnd", boxAnimHandler, false);
    box1.addEventListener("animationend", boxAnimHandler, false);
    wanwan.play();
    document.getElementById('loadingScreen').style.display = "none";
}

