import CanvasZoom from "./CanvasZoom.js";
import direction from "../constants/Direction.js";
import Settings from "../core/Settings.js";

const SIZE = 20;

export default class CanvasUtils {

    static mouseSprite = {}
    static wallImage = null;

    static init(canvas) {

        CanvasZoom.init(canvas);

        CanvasUtils.mouseSprite = {
            [direction.UP.angle]: CanvasUtils.loadImage('images/mouse-up.png'),
            [direction.DOWN.angle]: CanvasUtils.loadImage('images/mouse-down.png'),
            [direction.LEFT.angle]: CanvasUtils.loadImage('images/mouse-left.png'),
            [direction.RIGHT.angle]: CanvasUtils.loadImage('images/mouse-right.png')
        }

        CanvasUtils.wallImage = CanvasUtils.loadImage('images/wall-3.png')
    }

    static loadImage(src) {

        const image = new Image();

        image.src = src;

        return image;
    }

    static clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    static drawRect(ctx, x, y, width, height, fillStyle = "black") {

        ctx.lineWidth = 1
        ctx.fillStyle = fillStyle;

        CanvasZoom.fillRect(ctx, x, y, width, height);
    }

    static drawSquare(ctx, x, y, size = 100, fillStyle = "") {
        CanvasUtils.drawRect(ctx, x, y, size, size, fillStyle);
    }

    static drawImage(ctx, image, x, y, width, height) {
        CanvasZoom.drawImage(ctx, image, x, y, width, height);
    }

    static update(ctx, maze) {

        CanvasUtils.clear(ctx);

        CanvasUtils.drawMaze(ctx, maze)

        for (const mouse of maze.mice) {
            CanvasUtils.drawMouse(ctx, mouse);
        }
    }

    static drawMaze(ctx, maze) {

        let matrix = maze.pattern;

        for (let i = 0; i < matrix.length; i++) {

            for (let j = 0; j < matrix[i].length; j++) {

                if (Settings.showVisibleCells && maze.isVisited(i, j)) {
                    CanvasUtils.drawSquare(ctx, j * SIZE, i * SIZE, SIZE, "pink")
                }

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

    static drawMouse(ctx, mouse) {

        let angle = mouse.lookup.angle;

        const image = CanvasUtils.mouseSprite[angle];

        CanvasUtils.drawImage(ctx, image, mouse.j * SIZE, mouse.i * SIZE, SIZE, SIZE);
    }

    static zoomActualSize() {
        CanvasZoom.zoomActualSize();
    }

    static zoomIn() {
        CanvasZoom.zoomIn();
    }

    static zoomOut() {
        CanvasZoom.zoomOut();
    }
}
