import RandomUtils from "../utils/RandomUtils.js";

export default class RandomMouse {

    constructor(maze) {
        this.i = 1;
        this.j = 1;
        this.lookup = "right";
        this.maze = maze;
    }

    hasWall(i, j) {
        return this.maze[i][j] === 1;
    }

    moveUp() {

        if (this.hasWall(this.i - 1, this.j)) {
            return;
        }

        this.i -= 1;
    }

    moveDown() {

        if (this.hasWall(this.i + 1, this.j)) {
            return;
        }

        this.i += 1;
    }

    moveLeft() {

        if (this.hasWall(this.i, this.j - 1)) {
            return;
        }

        this.j -= 1;
    }

    moveRight() {

        if (this.hasWall(this.i, this.j + 1)) {
            return;
        }

        this.j += 1;
    }

    moveForward() {

        if (this.lookup === "right") {
            this.moveRight();
        }
        if (this.lookup === "left") {
            this.moveLeft();
        }
        if (this.lookup === "up") {
            this.moveUp();
        }
        if (this.lookup === "down") {
            this.moveDown();
        }
    }

    nextMove() {

        let posPos = ["MF"];

        if (!this.hasWall(this.i - 1, this.j)) {
            posPos.push("RU");
        }
        if (!this.hasWall(this.i + 1, this.j)) {
            posPos.push("RD");
        }
        if (!this.hasWall(this.i, this.j - 1)) {
            posPos.push("RL");
        }
        if (!this.hasWall(this.i, this.j + 1)) {
            posPos.push("RR");
        }

        let nextPos = RandomUtils.el(posPos);

        if (nextPos === "MF") {
            this.moveForward()
        } else if (nextPos === "RU") {
            this.lookup = "up"
        } else if (nextPos === "RD") {
            this.lookup = "down"
        } else if (nextPos === "RL") {
            this.lookup = "left"
        } else if (nextPos === "RR") {
            this.lookup = "right"
        }
    }
}
