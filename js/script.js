import CanvasUtils from "./utils/CanvasUtils.js";
import Random from "./strategies/Random.js";
import FollowWall from "./strategies/FollowWall.js";
import Maze from "./core/Maze.js";
import Mouse from "./core/Mouse.js";
import MazeUtils from "./utils/MazeUtils.js";

const SIZE = 20;

const btnStartStop = document.getElementById("btn-start-stop");
const speeds = document.querySelectorAll("input[name=speed]");
const modalNewMaze = document.getElementById("modal-new-maze");
const formNewMaze = document.getElementById("form-new-maze");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let running = false;
let speed = 100;
let last = 0;
let maze = new Maze(MazeUtils.pattern1());

speeds.forEach(radio => {
    radio.addEventListener('change', function () {
        speed = parseInt(this.value);
    });
});

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

function resizeWindow() {

    const rect = canvas.getBoundingClientRect();

    const offsetTop = rect.top + window.scrollY;
    const offsetLeft = rect.left + window.scrollX;

    canvas.width = window.innerWidth - 2 * offsetLeft;
    canvas.height = window.innerHeight - offsetTop - 50;
}

formNewMaze.addEventListener('submit', function (e) {

    e.preventDefault();

    const formData = new FormData(this);

    const rows = parseInt(formData.get('rows'), 10);
    const cols = parseInt(formData.get('columns'), 10);

    maze = new Maze(MazeUtils.generate(rows, cols));
    maze.addMouse(new Mouse(maze, new Random()));
    maze.addMouse(new Mouse(maze, new FollowWall()));

    bootstrap.Modal.getInstance(modalNewMaze).hide();
});

maze.addMouse(new Mouse(maze, new Random()));
maze.addMouse(new Mouse(maze, new FollowWall()));

function drawCanvas() {

    CanvasUtils.clear(context);

    CanvasUtils.drawMaze(context, maze)

    for (const mouse of maze.mice) {
        CanvasUtils.drawMouse(context, mouse);
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

window.addEventListener('resize', resizeWindow);

resizeWindow();

// disable right clicking
canvas.addEventListener('contextmenu', e => e.preventDefault())

// CanvasUtils.init(canvas);
