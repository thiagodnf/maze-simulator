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

        if (mouse.hasWallInTheLeft()) {
            if (mouse.hasWallInTheFront()) {
                if (mouse.hasWallInTheRight()) {
                    return Move.TURN_UP;
                }
            } else {
                return Move.MOVE_FORWARD;
            }
        } else {
            this.pending = [Move.TURN_RIGHT, Move.MOVE_FORWARD];
        }
    }
}
