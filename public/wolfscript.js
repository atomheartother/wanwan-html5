// This file is our 'main'. It handles everything specific to wanwan.moe
// Everything related to the animation is in lib/wanimation.js

// Holds the current wolfgirl
var curGirl = null;

// Holds the image
var img = document.getElementById("wolfImg");

function changeGirl(name) {
  if (wolves[name].hasOwnProperty("altFormat")) {
    // If the girl has a non-png file
    img.src = "girls/" + name + "." + wolves[name].altFormat;
    img.onerror = function() {
      img.src = "girls/" + name + ".png";
    };
  } else {
    img.src = "girls/" + name + ".png";
  }
  curGirl = wolves[name];
}

// Checks the new hash's value and interpret it
function checkHash() {
  var newHash = location.hash.substring(1);

  for (var name in wolves) {
    if (newHash.toUpperCase() == name.toUpperCase()) {
      changeGirl(name);
      return;
    }
  }
  // Check if it could be a custom URL
  if (newHash.substring(0, 5) === "curl=") {
    img.src = newHash.substring(5);
    curGirl = null;
    // If it fails. display momiji
    img.onerror = function() {
      changeGirl("Momiji");
    };
    return;
  }

  // If no valid hash was found, Momiji is default
  changeGirl("Momiji");
}

// Call checkHash on page load & everytime the hash changes
checkHash();
window.addEventListener("hashchange", checkHash);

window.onkeydown = function(e) {
  if (e.keyCode == 27) {
    // ESC
    // leave menu
    if (e.target == document.body && menu_isup == true) hideMenu();
    // unfocus input text
    else if (
      document.activeElement.id == "customUrl" ||
      document.activeElement.id == "wolfSearch"
    )
      document.activeElement.blur();
  }
  // Enter to submit URL
  else if (e.keyCode == 13 && document.activeElement.id == "customUrl") {
    customGirl();
  }
};

// Handle the window resizing to scale the bgColor element
var resizeHandler = function() {
  // scale up the background color from 1x1px to whatever the screen size is
  document.getElementById("bgColor").style.transform =
    "scale3d(" + window.innerWidth + ", " + window.innerHeight + ", 1)";
};

window.onload = function() {
  resizeHandler();
  registerAnimatedElement(document.getElementById("wolfGirl"));
  changeAnimation("original");
  this.setTimeout(function() {
    this.document.getElementById("loadingText").innerText =
      "Your browser doesn't autoplay sound. Click anywhere to start.";
  }, 1000);
};
