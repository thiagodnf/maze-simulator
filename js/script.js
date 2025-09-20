import CanvasUtils from "./utils/CanvasUtils.js";
import RandomMouse from "./mouse/RandomMouse.js";

const SIZE = 40;

const btnStart = document.getElementById("btn-start");
const speedRange = document.getElementById("speed");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const mouseImage = new Image(SIZE, SIZE);
const wallImage = new Image(SIZE, SIZE);

let state = 0;

const rotation = {
    "down": 0,
    "right": 90,
    "up": 180,
    "left": 270,
}

btnStart.onclick = function () {
    state = 1;
}

const maze = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

const mouse = new RandomMouse(maze);

function drawMaze(maze) {

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {

            if (maze[i][j] === 0) {
                // CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "")
            } else if (maze[i][j] === 1) {
                // CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "lightgray");
                context.drawImage(wallImage, j * SIZE, i * SIZE, SIZE, SIZE);
            } else if (maze[i][j] === 2) {
                CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "blue")
            } else if (maze[i][j] === 3) {
                CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "green")
            }
        }
    }
}

function drawMouse(mouse, degrees) {

    let angle = -1.0 * degrees * Math.PI / 180;

    context.save();
    const x = mouse.j * SIZE + SIZE / 2;
    const y = mouse.i * SIZE + SIZE / 2;
    context.translate(x, y);
    context.rotate(angle);
    context.drawImage(mouseImage, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
    context.restore();
}

function drawCanvas() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawMaze(maze)

    let angle = rotation[mouse.lookup];

    drawMouse(mouse, angle);
}

function move() {

    if(state == "1"){
        mouse.nextMove()
    }
}

let last = 0;

function animate(ts) {

    requestAnimationFrame(animate);

    let delay = speedRange.value;

    if (ts - last >= delay) { // 1s
        move();
        last = ts;
    }

    drawCanvas();
}

animate();

mouseImage.onload = animate;
wallImage.onload = animate;

// Load an image of intrinsic size 300x227 in CSS pixels
mouseImage.src = "images/mouse.png";
wallImage.src = "images/wall-3.png";

