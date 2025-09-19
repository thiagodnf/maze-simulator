import CanvasUtils from "./utils/CanvasUtils.js";

const SIZE = 20;

const btnStart = document.getElementById("btn-start");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const mouseImage = new Image(SIZE, SIZE);

const mouse = {
    i: 1,
    j: 1
}

btnStart.onclick = function () {
    alert("oi")
}

const maze = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

function drawMaze(maze) {

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {

            if (maze[i][j] === 0) {
                CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "")
            } else if (maze[i][j] === 1) {
                CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "lightgray")
            } else if (maze[i][j] === 2) {
                CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "blue")
            } else if (maze[i][j] === 3) {
                CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "green")
            }
        }
    }

    context.drawImage(mouseImage, mouse.j * SIZE, mouse.i * SIZE, SIZE, SIZE)
}

function animate() {

    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawMaze(maze);
}

animate();

mouseImage.onload = animate; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
mouseImage.src = "images/mouse.png";
