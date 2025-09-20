export default class Mouse {

    constructor(maze, strategy) {
        this.i = 1;
        this.j = 1;
        this.speed = 100;
        this.lookup = "down";
        this.maze = maze;
        this.strategy = strategy;
    }

    moveUp() {

        if (this.maze.hasWall(this.i - 1, this.j)) {
            return;
        }

        this.i -= 1;
    }

    moveDown() {

        if (this.maze.hasWall(this.i + 1, this.j)) {
            return;
        }

        this.i += 1;
    }

    moveLeft() {

        if (this.maze.hasWall(this.i, this.j - 1)) {
            return;
        }

        this.j -= 1;
    }

    moveRight() {

        if (this.maze.hasWall(this.i, this.j + 1)) {
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

    nextMove(maze) {

        const next = this.strategy.next(this, maze);

        if (next === "MF") {
            this.moveForward()
        } else if (next === "RU") {
            this.lookup = "up"
        } else if (next === "RD") {
            this.lookup = "down"
        } else if (next === "RL") {
            this.lookup = "left"
        } else if (next === "RR") {
            this.lookup = "right"
        }
    }
}
