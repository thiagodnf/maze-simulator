import CanvasUtils from "./utils/CanvasUtils.js";
import Random from "./strategies/Random.js";
import FollowWall from "./strategies/FollowWall.js";
import Maze from "./core/Maze.js";
import Mouse from "./core/Mouse.js";

const SIZE = 40;

const btnStartStop = document.getElementById("btn-start-stop");
const speeds = document.querySelectorAll("input[name=speed]");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let running = false;
let speed = 100;
let last = 0;

speeds.forEach(radio => {
    radio.addEventListener('change', function () {
        speed = parseInt(this.value);
    });
});

const mouseImage = new Image(SIZE, SIZE);
const wallImage = new Image(SIZE, SIZE);

btnStartStop.addEventListener('click', function () {

    running = !running;

    if (running) {
        btnStartStop.innerHTML = '<i class="bi bi-stop-circle me-3"></i>Stop';
        btnStartStop.classList.replace("btn-primary", "btn-secondary")
    } else {
        btnStartStop.innerHTML = '<i class="bi bi-play-circle me-3"></i>Play';
        btnStartStop.classList.replace("btn-secondary", "btn-primary")
    }
});

const maze = new Maze();

maze.addMouse(new Mouse(maze, new Random()));
maze.addMouse(new Mouse(maze, new FollowWall()));

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

function drawMouse(mouse) {

    let degrees = mouse.lookup.angle;

    let angle = -1.0 * degrees * Math.PI / 180;

    const x = mouse.j * SIZE + SIZE / 2;
    const y = mouse.i * SIZE + SIZE / 2;

    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.drawImage(mouseImage, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
    context.restore();
}

function drawCanvas() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawMaze(maze.pattern)

    for (const mouse of maze.mice) {
        drawMouse(mouse);
    }
}

function move() {

    if (running) {
        maze.nextMove();
    }
}

function animate(ts) {

    requestAnimationFrame(animate);

    if (ts - last >= speed) { // 1s
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

