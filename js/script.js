import CanvasUtils from "./utils/CanvasUtils.js";
import Random from "./strategies/Random.js";
import FollowWall from "./strategies/FollowWall.js";
import Maze from "./core/Maze.js";
import Mouse from "./core/Mouse.js";
import MazeUtils from "./utils/MazeUtils.js";

const btnStartStop = document.getElementById("btn-start-stop");
const btnShowHideVisitedCells = document.getElementById("show-hide-visited-cells");
const btnShowHideToolbar = document.getElementById("show-hide-toolbar");
const btnZoomActualSize = document.getElementById("zoom-actual-size");
const btnZoomIn = document.getElementById("zoom-in");
const btnZoomOut = document.getElementById("zoom-out");
const toolbar = document.getElementById("toolbar");
const speeds = document.querySelectorAll("input[name=speed]");
const modalNewMaze = document.getElementById("modal-new-maze");
const formNewMaze = document.getElementById("form-new-maze");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let running = false;
let speed = 100;
let last = 0;
let maze = new Maze(MazeUtils.pattern1());

let showToolbar = true;

speeds.forEach(radio => {
    radio.addEventListener('change', function () {
        speed = parseInt(this.value);
    });
});

btnStartStop.addEventListener('click', function () {

    running = !running;

    if (running) {
        btnStartStop.innerHTML = '<i class="bi bi-stop-circle me-3"></i>Stop';
        btnStartStop.classList.replace("btn-warning", "btn-secondary")
    } else {
        btnStartStop.innerHTML = '<i class="bi bi-play-circle me-3"></i>Play';
        btnStartStop.classList.replace("btn-secondary", "btn-warning")
    }
});

btnShowHideToolbar.addEventListener('click', function () {

    showToolbar = !showToolbar;

    if (showToolbar) {
        this.querySelector("span").textContent = "Hide Toolbar";
        toolbar.classList.remove("d-none");
    } else {
        this.querySelector("span").textContent = "Show Toolbar";
        toolbar.classList.add("d-none");
    }
});

btnShowHideVisitedCells.addEventListener('click', function () {

    maze.showVisited = !maze.showVisited;

    if (maze.showVisited) {
        this.innerHTML = '<i class="bi bi-eye-slash me-3"></i>Hide Visited Cells';
    } else {
        this.innerHTML = '<i class="bi bi-eye me-3"></i>Show Visited Cells';
    }
});

btnZoomActualSize.addEventListener('click', function () {
    CanvasUtils.zoomActualSize();
});

btnZoomIn.addEventListener('click', function () {
    CanvasUtils.zoomIn();
});

btnZoomOut.addEventListener('click', function () {
    CanvasUtils.zoomOut();
});


function resizeWindow() {

    const rect = canvas.getBoundingClientRect();

    const offsetTop = rect.top + window.scrollY;
    const offsetLeft = rect.left + window.scrollX;

    canvas.width = window.innerWidth - 2 * offsetLeft;
    canvas.height = window.innerHeight - offsetTop - 15;
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

    CanvasUtils.update(context, maze);
}

modalNewMaze.addEventListener('shown.bs.modal', () => {
    const el = modalNewMaze.querySelector('[autofocus]');
    if (el) el.focus();
});

animate();

window.addEventListener('resize', resizeWindow);

resizeWindow();

// disable right clicking
canvas.addEventListener('contextmenu', e => e.preventDefault())

CanvasUtils.init(canvas);
