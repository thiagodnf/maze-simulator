import CanvasZoom from "./CanvasZoom.js";

const SIZE = 20;

export default class CanvasUtils {

    static sprite = new Image();

    static mouseImage = document.getElementById("mouse-image");
    static wallImage = document.getElementById("wall-image");

    static init(canvas) {
        CanvasZoom.init(canvas);
        sprite.src = 'images/mouse.png'; // sprite contains 4 frames horizontally

    }

    static rotate(image) {
        // rotate 90 degrees clockwise
        image.style.transform = 'rotate(45deg)';
        // optionally, rotate around its center
        // image.style.transformOrigin = 'center center';


        return image;
    }

    static clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    static drawRect(ctx, x, y, width, height, fillStyle = "black") {

        ctx.lineWidth = 1
        ctx.fillStyle = fillStyle;

        ctx.fillRect(CanvasZoom.toScreenX(x + 0.5), CanvasZoom.toScreenY(y + 0.5), CanvasZoom.size(width), CanvasZoom.size(height));
        // ctx.fill();
    }

    static drawSquare(ctx, x, y, size = 100, fillStyle = "") {
        CanvasUtils.drawRect(ctx, x, y, size, size, fillStyle);
    }

    static drawImage(ctx, image, x, y, width, height) {
        ctx.drawImage(image, CanvasZoom.toScreenX(x + 0.5), CanvasZoom.toScreenY(y + 0.5), CanvasZoom.size(width), CanvasZoom.size(height));
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

    static drawMouse(ctx, mouse) {

        // let degrees = mouse.lookup.angle;

        // let angle = -1.0 * degrees * Math.PI / 180;

        // const x = mouse.j * SIZE + SIZE / 2;
        // const y = mouse.i * SIZE + SIZE / 2;

        // ctx.save();
        // ctx.translate(x, y);
        // ctx.rotate(angle);

        // CanvasUtils.drawImage(ctx, CanvasUtils.mouseImage, -SIZE / 2, -SIZE / 2, SIZE, SIZE);

        // // context.drawImage(CanvasUtils.mouseImage, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
        // ctx.restore();


        // const image = CanvasUtils.rotate(this.mouseImage);

        // CanvasUtils.drawImage(ctx, image, mouse.j * SIZE, mouse.i * SIZE, SIZE, SIZE);
    }

    static drawFrame(ctx, index, x = 0, y = 0, width, height) {

        const frameWidth = sprite.width / totalFrames;
        const frameHeight = sprite.height;

        // ctx.clearRect(x, y, width || frameWidth, height || frameHeight);

        ctx.drawImage(
            sprite,
            index * frameWidth, 0,           // source x, y
            frameWidth, frameHeight,         // source width, height
            x, y,                            // destination x, y
            width || frameWidth, height || frameHeight // destination width, height
        );
    }
}
