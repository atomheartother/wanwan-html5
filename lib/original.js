// Audio
var wanwan =  new Howl({
    src: ['res/wanwan.ogg', 'res/wanwan.mp3'],
    format: ['webm', 'mp3'],
    autoplay: false,
    loop: true,
    volume: parseFloat(document.getElementById("volSlider").value),
    onplay : function() {
        startNewAnimation();
        document.getElementById('loadingScreen').style.display = "none";
    },
    onloaderror: function() {
        alert("I can't play on your browser, sorry! Please click About and contact my maker about this.");
    },
});

function startOriginal() {
    currentSong = wanwan;
    currentSong.rate(1);
    currentSong.seek(0);
    if (wanwan.playing()) {
        startNewAnimation();
    } else {
        // We defer the animation to when the song is ready to play, see onplay handler
        wanwan.play();
    }
}

var bLeftText = function(duration) {
    wanText.innerHTML = (!!curGirl  && curGirl.hasOwnProperty("text")) ? curGirl.text[0] : "WAN!~";
}

var bRightText = function(duration) {
    wanText.innerHTML = (!!curGirl  && curGirl.hasOwnProperty("text")) ? curGirl.text[1] : "~WAN!";
}

var tRightText = function(duration) {
    wanText.innerHTML = (!!curGirl  && curGirl.hasOwnProperty("text")) ? curGirl.text[2] : "WAN!";
}


animations["original"] = {
    "steps" : [
        {"name" : "bottomLeft", "func": "bLeftText", "elems" : ["wanText"], "duration": 500},
        {"name" : "bottomRight", "func": "bRightText", "elems" : ["wanText"], "duration": 500},
        {"name" : "topRight", "func": "tRightText", "elems" : ["wanText"], "duration": 500},
        {"name" : "backFlip", "duration": 500},
        {"name" : "fullScreen", "elems" : ["botBox", "topBox"], "duration": 500},
        {"name" : "frontFlip", "duration": 500},
        {"name" : "shake", "duration": 500},
        {"name" : "frontFlip", "duration": 500},
        {"name" : "bottomLeft", "func": "bLeftText", "elems" : ["wanText"], "duration": 250},
        {"name" : "fullScreen", "elems" : ["botBox", "topBox"], "duration": 250},
        {"name" : "bottomRight", "func": "bRightText", "elems" : ["wanText"], "duration": 250},
        {"name" : "topRight", "func": "tRightText", "elems" : ["wanText"], "duration": 250},
        {"name" : "frontFlipAborted", "duration": 250},
        {"name" : "frontFlip", "duration": 250},
        {"name" : "bottomLeft", "func": "bLeftText", "elems" : ["wanText"], "duration": 250},
        {"name" : "bottomRight", "func": "bRightText", "elems" : ["wanText"], "duration": 250},
        {"name" : "frontFlip", "duration": 250},
        {"name" : "backFlip", "duration": 250},
        {"name" : "frontFlip", "duration": 250},
        {"name" : "bottomLeft", "func": "bLeftText", "elems" : ["wanText"], "duration": 250},
        {"name" : "bottomRight", "func": "bRightText", "elems" : ["wanText"], "duration": 125},
        {"name" : "frontFlipAborted", "duration": 125},
        {"name" : "backFlip", "duration": 125},
        {"name" : "frontFlip", "duration": 125},
        {"name" : "shake", "duration": 125},
    ],
    "funcIn" : startOriginal,
};
