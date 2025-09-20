import { M_FORWARD, T_RIGHT, T_LEFT, T_UP, T_DOWN } from "../constants/Move.js";
import Direction from "../constants/Direction.js";

export default class FollowWall {

    constructor() {
        this.pending = [];
    }

    next(mouse, maze) {

        // console.log(Direction.DOWN == Direction.LEFT)
        if (this.pending.length !== 0) {
            return this.pending.shift();
        }

        let posPos = [];

        if (mouse.hasLeftWall(mouse, maze)) {
            return M_FORWARD;
        } else {
            this.pending.push(M_FORWARD);
            return T_RIGHT;
        }
    }
}
