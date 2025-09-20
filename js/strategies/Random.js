import RandomUtils from "../utils/RandomUtils.js";
import MOVE from "../constants/Move.js";

export default class Random {

    next(mouse, maze) {

        let posPos = [MOVE.MOVE_FORWARD];

        if (!maze.hasWall(mouse.i - 1, mouse.j)) {
            posPos.push(MOVE.TURN_UP);
        }
        if (!maze.hasWall(mouse.i + 1, mouse.j)) {
            posPos.push(MOVE.TURN_DOWN);
        }
        if (!maze.hasWall(mouse.i, mouse.j - 1)) {
            posPos.push(MOVE.TURN_LEFT);
        }
        if (!maze.hasWall(mouse.i, mouse.j + 1)) {
            posPos.push(MOVE.TURN_RIGHT);
        }

        return RandomUtils.el(posPos);
    }
}
