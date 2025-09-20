import RandomUtils from "../utils/RandomUtils.js";
import { M_FORWARD, T_RIGHT, T_LEFT, T_UP, T_DOWN } from "../constants/Move.js";

export default class Random {

    next(mouse, maze) {

        let posPos = [M_FORWARD];

        if (!maze.hasWall(mouse.i - 1, mouse.j)) {
            posPos.push(T_UP);
        }
        if (!maze.hasWall(mouse.i + 1, mouse.j)) {
            posPos.push(T_DOWN);
        }
        if (!maze.hasWall(mouse.i, mouse.j - 1)) {
            posPos.push(T_LEFT);
        }
        if (!maze.hasWall(mouse.i, mouse.j + 1)) {
            posPos.push(T_RIGHT);
        }

        return RandomUtils.el(posPos);
    }
}
