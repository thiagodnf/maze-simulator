import CanvasZoom from "./CanvasZoom.js";

const SIZE = 20;

export default class CanvasUtils {

    static mouseImage = document.getElementById("mouse-image");
    static wallImage = document.getElementById("wall-image");

    static init(canvas) {
        CanvasZoom.init(canvas);
    }

    static clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    static drawSquare(ctx, x, y, size = 100, fillStyle = "") {

        ctx.lineWidth = 1;
        ctx.strokeStyle = "lightgray";
        ctx.fillStyle = fillStyle;

        if (fillStyle === "") {
            ctx.strokeRect(x, y, size, size);
        } else {
            ctx.fillRect(x, y, size, size);
        }
    }

    static drawImage(ctx, image, x, y, width, height) {
        ctx.drawImage(image, x, y, width, height);
    }

    static drawMaze(ctx, maze) {

        let matrix = maze.pattern;

        for (let i = 0; i < matrix.length; i++) {

            for (let j = 0; j < matrix[i].length; j++) {

                if (matrix[i][j] === 0) {

                } else if (matrix[i][j] === 1) {
                    CanvasUtils.drawImage(ctx, CanvasUtils.wallImage, j * SIZE, i * SIZE, SIZE, SIZE);
                } else if (matrix[i][j] === 2) {
                    CanvasUtils.drawSquare(ctx, j * SIZE, i * SIZE, SIZE, "blue")
                } else if (matrix[i][j] === 3) {
                    CanvasUtils.drawSquare(ctx, j * SIZE, i * SIZE, SIZE, "green")
                }
            }
        }
    }

    static drawMouse(context, mouse) {

        let degrees = mouse.lookup.angle;

        let angle = -1.0 * degrees * Math.PI / 180;

        const x = mouse.j * SIZE + SIZE / 2;
        const y = mouse.i * SIZE + SIZE / 2;

        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.drawImage(CanvasUtils.mouseImage, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
        context.restore();
    }
}
