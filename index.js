"use strict";

var btnClickedp = [];
var btnClicked = [];
var btnSupClicked = [];
var results = [];
var started = false;

let sounds = {
  green: "sounds/green.mp3",
  red: "sounds/red.mp3",
  yellow: "sounds/yellow.mp3",
  blue: "sounds/blue.mp3",
  wrong: "sounds/wrong.mp3",
};

function sing(sound) {
  var audio = new Audio(sound);
  audio.play();
}

function getSound(key) {
  switch (key) {
    case "green":
      sing(sounds.green);
      break;
    case "red":
      sing(sounds.red);
      break;
    case "yellow":
      sing(sounds.yellow);
      break;
    case "blue":
      sing(sounds.blue);
      break;
    default:
      console.log("YO What the heeeeeeeeeeeell!!");
      break;
  }
}

function butanimsoun(w) {
  var object = $(`.${w}`);
  object.addClass("pressed");
  setTimeout(function () {
    object.removeClass("pressed"), 5000000;
  });
  getSound(w);
}

let t = 0;
function colortox(color) {
  if (color == "green") {
    var s = t + 1;
  } else if (color == "red") {
    var s = t + 2;
  } else if (color == "yellow") {
    var s = t + 3;
  } else if (color == "blue") {
    var s = t + 4;
  } else {
    console.log("siuu");
  }
  return s;
}

let r = "";
function xtocolor(x) {
  if (x == 1) {
    var s = r + "green";
  } else if (x == 2) {
    var s = r + "red";
  } else if (x == 3) {
    var s = r + "yellow";
  } else if (x == 4) {
    var s = r + "blue";
  } else {
    console.log("siuu");
  }
  return s;
}

let z = "";
function checkAns(Arr1, Arr2) {
  for (let i = 0; i < Arr2.length; i++) {
    if (Arr1[i] === Arr2[i]) {
      var s = z + "gg";
    } else {
      var s = z + "nt";
    }
    results.push(s);
  }
  return results;
}

function nextSequence(n) {
  switch (n) {
    case 1:
      sing(sounds.green);
      $(".green").addClass("pressed");
      setTimeout(function () {
        $(".green").removeClass("pressed"), 50000;
      });
      break;
    case 2:
      sing(sounds.red);
      $(".red").addClass("pressed");
      setTimeout(function () {
        $(".red").removeClass("pressed"), 50000;
      });
      break;
    case 3:
      sing(sounds.yellow);
      $(".yellow").addClass("pressed");
      setTimeout(function () {
        $(".yellow").removeClass("pressed"), 50000;
      });
      break;
    case 4:
      sing(sounds.blue);
      $(".blue").addClass("pressed");
      setTimeout(function () {
        $(".blue").removeClass("pressed"), 50000;
      });
      break;
    default:
      console.log("YO What the heeeeeeeeeeeell!!");
      break;
  }
}

function startOver() {
  $("body").addClass("wrong");
  setTimeout(function () {
    $("body").removeClass("wrong"), 500;
  });
  sing(sounds.wrong);
  started = false;
  btnClicked.length = 0;
  btnSupClicked.length = 0;
  btnClickedp.length = 0;
  ll = 1;
  results.length = 0;
}

let l = 0;
$(document).keypress(function () {
  if (!started) {
    let x = Math.floor(Math.random() * 4 + 1);
    nextSequence(x);
    btnSupClicked.push(xtocolor(x));
    console.log(btnSupClicked);
    $("h1").html(`LEVEL ${l}`);
    started = true;
  } else {
    started = false;
  }
});

let ll = 1;
$(`.btn`).click(function () {
  console.log(started);
  if (started) {
    butanimsoun(this.id, this.innerHTML);
    btnClickedp.push(this.id);
    console.log(ll);
    if (btnClickedp.length == ll) {
      for (let i = 0; i < btnClickedp.length; i++) {
        btnClicked.push(btnClickedp[i]);
        console.log(btnClicked);
      }
      btnClickedp.length = 0;
      $("h1").html(`LEVEL ${ll}`);
      ll++;
      if (checkAns(btnClicked, btnSupClicked).includes("nt") == 0) {
        let x = Math.floor(Math.random() * 4 + 1);
        setTimeout(() => {
          nextSequence(x);
          btnSupClicked.push(xtocolor(x));
          console.log(btnSupClicked);
        }, 1000);
      } else {
        $("h1").html("Game Over,Press A Key Restart.");
        startOver();
      }
    }

    btnClicked.length = 0;
  } else {
    startOver();
  }
});
