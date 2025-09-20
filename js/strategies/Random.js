import RandomUtils from "../utils/RandomUtils.js";

export default class Random {

    next(mouse, maze) {

        let posPos = ["MF"];

        if (!maze.hasWall(mouse.i - 1, mouse.j)) {
            posPos.push("RU");
        }
        if (!maze.hasWall(mouse.i + 1, mouse.j)) {
            posPos.push("RD");
        }
        if (!maze.hasWall(mouse.i, mouse.j - 1)) {
            posPos.push("RL");
        }
        if (!maze.hasWall(mouse.i, mouse.j + 1)) {
            posPos.push("RR");
        }

        return RandomUtils.el(posPos);
    }
}
