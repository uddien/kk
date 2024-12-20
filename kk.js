let c = init("canvas"),
  w = (canvas.width = window.innerWidth),
  h = (canvas.height = window.innerHeight);
//initiation

// class firefly{
//   constructor(){
//     this.x = Math.random()*w;
//     this.y = Math.random()*h;
//     this.s = Math.random()*2;
//     this.ang = Math.random()*2*Math.PI;
//     this.v = this.s*this.s/4;
//   }
//   move(){
//     this.x += this.v*Math.cos(this.ang);
//     this.y += this.v*Math.sin(this.ang);
//     this.ang += Math.random()*20*Math.PI/180-10*Math.PI/180;
//   }
//   show(){
//     c.beginPath();
//     c.arc(this.x,this.y,this.s,0,2*Math.PI);
//     c.fillStyle="#fddba3";
//     c.fill();
//   }
// }

class firefly {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.s = Math.random() * 2;
    this.ang = Math.random() * 2 * Math.PI;
    this.v = this.s * this.s / 4;
  }
  move() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let minDistance = 50; // Jarak minimum ke mouse

    if (distance < attractRadius) {
      if (distance > minDistance) {
        // Jika masih dalam radius tapi cukup jauh, mendekati mouse
        this.ang = Math.atan2(mouse.y - this.y, mouse.x - this.x)
          + (Math.random() - 0.5) * 0.5; // Variasi arah
        this.v = 1.5; // Kecepatan lebih cepat ketika dalam radius
      } else {
        // Jika terlalu dekat, bergerak acak
        this.ang += Math.random() * (20 * Math.PI / 180) - (10 * Math.PI / 180);
        this.v = this.s * this.s / 4;
      }
    } else {
      // Gerakan acak jika di luar radius
      this.v = this.s * this.s / 4;
      this.ang += Math.random() * (20 * Math.PI / 180) - (10 * Math.PI / 180);
    }

    this.x += this.v * Math.cos(this.ang);
    this.y += this.v * Math.sin(this.ang);
  }
  show() {
    c.beginPath();
    c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
    c.fillStyle = distanceToMouse(this.x, this.y) < attractRadius ? "#ffeb3b" : "#fddba3";
    c.fill();
  }
}


let f = [];

function draw() {
  if (f.length < 100) {
    for (let j = 0; j < 10; j++) {
      f.push(new firefly());
    }
  }
  //animation
  for (let i = 0; i < f.length; i++) {
    f[i].move();
    f[i].show();
    if (f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h) {
      f.splice(i, 1);
    }
  }
}

let mouse = { x: w / 2, y: h / 2 }; // Posisi awal mouse (tengah canvas)
let attractRadius = 100; // Radius area efek dari mouse


canvas.addEventListener(
  "mousemove",
  function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  },
  false
);
function init(elemid) {
  let canvas = document.getElementById(elemid),
    c = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
  c.fillStyle = "rgba(30,30,30,1)";
  c.fillRect(0, 0, w, h);
  return c;
}

function distanceToMouse(x, y) {
  let dx = x - mouse.x;
  let dy = y - mouse.y;
  return Math.sqrt(dx * dx + dy * dy);
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback);
    }
  );
});

function loop() {
  window.requestAnimFrame(loop);
  c.clearRect(0, 0, w, h);
  draw();
}

window.addEventListener("resize", function () {
  (w = canvas.width = window.innerWidth),
    (h = canvas.height = window.innerHeight);
  loop();
});

loop();
setInterval(loop, 1000 / 60);