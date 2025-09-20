import Move from "../constants/Move.js";
import Direction from "../constants/Direction.js";

export default class FollowWall {

    constructor() {
        this.pending = [];
    }

    next(mouse, maze) {

        if (this.pending.length !== 0) {
            return this.pending.shift();
        }

        const front = mouse.hasWallInTheFront();
        const left = mouse.hasWallInTheLeft();
        const right = mouse.hasWallInTheRight();

        if (!left) {
            this.pending = [Move.TURN_LEFT_2, Move.MOVE_FORWARD];
        } else if (!front) {
            this.pending = [Move.MOVE_FORWARD];
        } else if (!right) {
            this.pending = [Move.TURN_RIGHT_2, Move.MOVE_FORWARD];
        } else {
            // Turn Back
            this.pending = [Move.TURN_LEFT_2, Move.TURN_LEFT_2];
        }

    }
}
