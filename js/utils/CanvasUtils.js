import CanvasZoom from "./CanvasZoom.js";

const SIZE = 20;

export default class CanvasUtils {

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

    static drawMaze(context, maze) {

        for (let i = 0; i < maze.length; i++) {

            for (let j = 0; j < maze[i].length; j++) {

                if (maze[i][j] === 0) {
                    CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "")
                } else if (maze[i][j] === 1) {
                    CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "lightgray");
                    // context.drawImage(wallImage, j * SIZE, i * SIZE, SIZE, SIZE);
                } else if (maze[i][j] === 2) {
                    CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "blue")
                } else if (maze[i][j] === 3) {
                    CanvasUtils.drawSquare(context, j * SIZE, i * SIZE, SIZE, "green")
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
        context.translate(CanvasZoom.toScreenX(x), CanvasZoom.toScreenX(y));
        context.rotate(angle);
        // context.drawImage(mouseImage, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
        context.restore();
    }
}
