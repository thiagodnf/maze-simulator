export default class CanvasUtils {

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
}
