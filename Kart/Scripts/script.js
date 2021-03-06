"use strict";
var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");

var x = 200,
  y = 100,
  larg = 10,
  alt = 10;
var ang = 0;
var drift = 0;
var leftDrift = 0;
var rightDrift = 0;
var luz = 0;
var blue = "130";
var red = "130";
var green = "130";
var horn = 0;
var sound = 0;

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
} else if (localStorage.getItem("theme") == "dark") {
  document.getElementById("body").style.backgroundColor = "rgb(0,0,0)";
  for (var i = 0; i < 11; i++) {
    document.getElementsByClassName("text")[i].style.color = "rgb(255,255,255)";
  }
} else if (localStorage.getItem("theme") == "light") {
  document.getElementById("body").style.backgroundColor = "rgb(255,255,255)";
  for (var i = 0; i < 11; i++) {
    document.getElementsByClassName("text")[i].style.color = "rgb(0,0,0)";
  }
}
if (localStorage.getItem("music") == null) {
  localStorage.setItem("music", "on");
} else if (localStorage.getItem("music") == "off") {
  sound = 1;
} else if (localStorage.getItem("music") == "on") {
  sound = 0;
}

const audio = document.querySelector("audio");
const audio2 = document.querySelector("#drift");
const audio3 = document.querySelector("#horn");

audio2.volume = 0.25;
audio3.volume = 0.25;

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //mapa
  ctx.fillStyle = "rgb(0, 128, 0)";
  ctx.fillRect(0, 0, 640, 480);
  ctx.fillStyle = "rgb(60, 60, 60)";
  ctx.beginPath();
  ctx.arc(100, 380, 70, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(90, 370, 450, 80);
  ctx.beginPath();
  ctx.arc(550, 380, 70, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(540, 90, 80, 300);
  ctx.beginPath();
  ctx.arc(550, 90, 70, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(350, 20, 200, 80);
  ctx.beginPath();
  ctx.arc(350, 90, 70, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(30, 260, 80, 120);
  ctx.beginPath();
  ctx.arc(100, 250, 70, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(90, 180, 210, 80);
  ctx.beginPath();
  ctx.arc(291, 190, 70, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(281, 75, 80, 120);

  ctx.fillStyle = "rgb(0, 128, 0)";
  ctx.beginPath();
  ctx.arc(470, 300, 70, 0, 2 * Math.PI);
  ctx.arc(170, 315, 55, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(480, 160, 60, 0, 2 * Math.PI);
  ctx.arc(430, 170, 70, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(211, 110, 70, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "rgb(255, 255, 255)";

  ctx.beginPath();

  ctx.moveTo(120, 220);
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.quadraticCurveTo(250, 220, 250, 220);
  ctx.moveTo(250, 220);
  ctx.quadraticCurveTo(320, 200, 320, 120);
  ctx.moveTo(320, 120);
  ctx.quadraticCurveTo(310, 40, 500, 60);
  ctx.moveTo(500, 60);
  ctx.quadraticCurveTo(610, 60, 570, 370);
  ctx.moveTo(570, 370);
  ctx.quadraticCurveTo(560, 440, 120, 400);
  ctx.moveTo(120, 400);
  ctx.quadraticCurveTo(70, 400, 70, 310);
  ctx.moveTo(70, 310);
  ctx.quadraticCurveTo(70, 240, 120, 220);
  ctx.stroke();

  ctx.fillStyle = "rgb(60, 60, 60)";
  ctx.fillRect(0, 0, 250, 150);
  ctx.fillStyle = "rgb(255, 211, 0)";
  ctx.fillRect(250, 0, 10, 150);
  ctx.fillRect(0, 140, 250, 10);
  ctx.fillRect(160, 50, 10, 100);
  ctx.fillRect(70, 50, 10, 100);

  //Lago
  ctx.fillStyle = "rgb(0, 162, 232)";
  ctx.beginPath();
  ctx.ellipse(410, 290, 50, 70, Math.PI / 2, 0, 2 * Math.PI);
  ctx.ellipse(450, 240, 60, 80, Math.PI, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(470, 160, 40, 50, 1.2 + Math.PI, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(250, 320, 85, 30, Math.PI, 0, 2 * Math.PI);
  ctx.ellipse(270, 320, 85, 30, Math.PI, 0, 2 * Math.PI);
  ctx.ellipse(290, 320, 85, 30, Math.PI, 0, 2 * Math.PI);
  ctx.ellipse(310, 320, 85, 30, Math.PI, 0, 2 * Math.PI);
  ctx.ellipse(350, 320, 85, 30, Math.PI, 0, 2 * Math.PI);
  ctx.fill();

  //Barreira
  ctx.fillStyle = "rgb(150, 75, 0)";
  ctx.fillRect(630, 0, 10, 480);
  ctx.fillRect(0, 0, 630, 10);
  ctx.fillRect(0, 0, 10, 480);
  ctx.fillRect(0, 470, 630, 10);

  //carro

  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.strokeStyle = "rgb(0, 255, 100)";
  ctx.lineWidth = 2;
  ctx.save(); //Faz um backup do CTX
  ctx.translate(x - 40, y + 100);
  ctx.rotate(rightDrift + leftDrift + ang / Math.PI);
  ctx.beginPath();

  ctx.stroke();

  //rodas
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(-larg / 2, -alt / 2, larg + 5, alt);
  ctx.fillRect(larg * 4.5, alt - 15, larg + 5, alt);
  ctx.fillRect(larg * 4.5, alt + 30, larg + 5, alt);
  ctx.fillRect(-larg / 2, alt + 30, larg + 5, alt);

  //corpo do carro

  ctx.fillStyle = "rgb(0, 120, 255)";
  ctx.fillRect(-10, 0, 80, 44);

  ctx.fillStyle = "rgb(0, 0 ,0 )";
  ctx.fillRect(40, 10, 13, 25);
  ctx.fillRect(23, 30, 30, 7);
  ctx.fillRect(23, 8, 30, 7);

  //farol

  ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ") ";
  ctx.fillRect(60, 8, 6, 7);

  ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ") ";
  ctx.fillRect(60, 30, 6, 7);

  //Aerofólio

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(-23, 8, 30, 7);
  ctx.fillRect(-23, 30, 30, 7);
  ctx.fillRect(-28, -7, 10, 60);

  ctx.restore(); //Restaura o backup do CTX
  requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);

var movement = 0;
var turnLeft = 0;
var turnRight = 0;
var movementDrift = 0;
var movementRe = 0;
var movementFront = 0;

document.onkeydown = function (evt) {
  switch (evt.keyCode) {
    case 39: //direita
      turnRight = 39;
      break;
    case 37: //esquerda
      turnLeft = 37;
      break;
    case 38: //cima
      console.log("x: " + x);
      console.log("re: " + movementRe);
      console.log("front: " + movementFront);
      movement = 38;
      break;
    case 40: //baixo
      movement = 40;
      break;
    case 32: //espaço
      movementDrift = 32;
      audio2.play();
      break;
    case 76: //L
      if (luz == 0) {
        luz = 1;
        blue = "0";
        red = "255";
        green = "211";
      } else {
        luz = 0;
        blue = "130";
        red = "130";
        green = "130";
      }
      break;
    case 69: //E
      horn = 69;
      break;
    case 77: //M
      if (sound == 0) {
        sound = 1;
        break;
      } else if (sound == 1) {
        sound = 0;
      }
      break;
    case 84: //T
      theme();
      break;
    case 82: //R
      x = 200;
      y = 100;
      ang = 0;
      drift = 0;
      leftDrift = 0;
      rightDrift = 0;
      break;
  }
};

function theme() {
  if (localStorage.getItem("theme") == "light") {
    document.getElementById("body").style.backgroundColor = "rgb(0,0,0)";
    for (var i = 0; i < 11; i++) {
      document.getElementsByClassName("text")[i].style.color =
        "rgb(255,255,255)";
    }
    localStorage.setItem("theme", "dark");
  } else if (localStorage.getItem("theme") == "dark") {
    document.getElementById("body").style.backgroundColor = "rgb(255,255,255)";
    for (var i = 0; i < 11; i++) {
      document.getElementsByClassName("text")[i].style.color = "rgb(0,0,0)";
    }
    localStorage.setItem("theme", "light");
  }
}

var intervalo = setInterval(() => {
  //If responsável por mutar e desmutar a música
  if (sound == 0) {
    audio.play();
    audio.volume = 0.25;
    localStorage.setItem("music", "on");
  } else {
    audio.volume = 0;
    localStorage.setItem("music", "off");
  }
  //If responsável por acionar o barulho de buzina
  if (horn == 69) {
    audio3.play();
  }
  //If reponsável por fazer o carro andar
  if (movement == 38) {
    if ((x < 670 && y < 380 && x > 60 && y > -100) || movementFront == 1) {
      movementFront = 0;
      if (movementDrift == 32) {
        if (turnLeft != 0 || turnRight != 0) {
          x += 3 * Math.cos(ang / Math.PI);
          y += 3 * Math.sin(ang / Math.PI);
        }
      } else {
        x += 3 * Math.cos(ang / Math.PI);
        y += 3 * Math.sin(ang / Math.PI);
      }
    } else if (movementRe != 1) {
      movementRe = 1;
    } else if (x > 670) {
      x = 670;
    } else if (y > 380) {
      y = 380;
    } else if (x < 60) {
      x = 60;
    } else if (y < -100) {
      y = -100;
    }
  }
  if (movement == 40) {
    if ((x < 670 && y < 380 && x > 60 && y > -100) || movementRe == 1) {
      movementRe = 0;
      x -= 2 * Math.cos(ang / Math.PI);
      y -= 2 * Math.sin(ang / Math.PI);
    } else if (movementFront != 1) {
      movementFront = 1;
    } else if (x > 670) {
      x = 670;
    } else if (y > 380) {
      y = 380;
    } else if (x < 60) {
      x = 60;
    } else if (y < -100) {
      y = -100;
    }
  }
  //If responsável por fazer e desfazer o drift para a direita
  if (turnRight == 39) {
    if (x < 670 && y < 380 && x > 60 && y > -100) {
      if (movementDrift == 0 && rightDrift > 0) {
        rightDrift -= 0.02;
        drift = rightDrift;
        ang += 0.07;
      }
      if (movementDrift == 32 && rightDrift < 1.0) {
        rightDrift += 0.02;
        drift = rightDrift;
        ang -= 0.07;
      }
    }
  }
  //If responsável por fazer e desfazer o drift para a esquerda
  if (turnLeft == 37) {
    if (x < 670 && y < 380 && x > 60 && y > -100) {
      if (movementDrift == 0 && leftDrift < 0) {
        leftDrift += 0.02;
        drift = leftDrift;
        ang -= 0.07;
      }
      if (movementDrift == 32 && leftDrift > -1.0) {
        leftDrift -= 0.02;
        drift = leftDrift;
        ang += 0.07;
      }
    }
  }
  //If responsável por arrumar o angulo do carro em relação ao drift
  if (turnLeft == 0 && leftDrift != 0) {
    if (x < 670 && y < 380 && x > 60 && y > -100) {
      if (movementDrift == 0 && drift < 0) {
        ang -= 0.07;
        leftDrift += 0.02;
        drift = leftDrift;
      }
    }
  }
  if (turnRight == 0 && rightDrift != 0) {
    if (x < 670 && y < 380 && x > 60 && y > -100) {
      if (movementDrift == 0 && rightDrift > 0) {
        ang += 0.07;
        rightDrift -= 0.02;
        drift = rightDrift;
      }
    }
  }
}, 10);

//Thread responsável por virar para a esquerda e para a direita quando o carro andar
var intervalo2 = setInterval(() => {
  if (x < 670 && y < 380 && x > 60 && y > -100) {
    if (turnRight == 39 && movement != 0) {
      ang += 0.08;
    } else if (turnLeft == 37 && movement != 0) {
      ang -= 0.08;
    }
  }
}, 10);

//Reset de ações quando der o KeyUp
document.onkeyup = function (evt) {
  if (evt.keyCode == 38 || evt.keyCode == 40) {
    movement = 0;
  }
  if (evt.keyCode == 37) {
    turnLeft = 0;
  }
  if (evt.keyCode == 39) {
    turnRight = 0;
  }
  if (evt.keyCode == 32) {
    movementDrift = 0;
  }
  if (evt.keyCode == 69) {
    audio3.pause();
    audio3.currentTime = 0;
    horn = 0;
  }
};
