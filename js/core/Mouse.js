import Direction from "../constants/Direction.js";
import { M_FORWARD, T_RIGHT, T_LEFT, T_UP, T_DOWN } from "../constants/Move.js";

export default class Mouse {

    constructor(maze, strategy) {
        this.i = 1;
        this.j = 1;
        this.speed = 100;
        this.lookup = Direction.DOWN;
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

        if (this.lookup === Direction.RIGHT) {
            this.moveRight();
        }
        if (this.lookup === Direction.LEFT) {
            this.moveLeft();
        }
        if (this.lookup === Direction.UP) {
            this.moveUp();
        }
        if (this.lookup === Direction.DOWN) {
            this.moveDown();
        }
    }

    nextMove(maze) {

        const next = this.strategy.next(this, maze);

        if (next === M_FORWARD) {
            this.moveForward()
        } else if (next === T_UP) {
            this.lookup = Direction.UP;
        } else if (next === T_DOWN) {
            this.lookup = Direction.DOWN;
        } else if (next === T_LEFT) {
            this.lookup = Direction.LEFT;
        } else if (next === T_RIGHT) {
            this.lookup = Direction.RIGHT;
        }
    }

    hasLeftWall() {

        // const dirMap = {
        //     DOWN: [0, 1],
        //     UP: [0, -1],
        //     RIGHT: [-1, 0],
        //     LEFT: [1, 0]
        // };

        // const [di, dj] = dirMap[this.lookup] || [0, 0];

        // console.log(this.lookup.toString());

        // return this.maze.hasWall(this.i + di, this.j + dj);

        if (this.lookup == Direction.DOWN) {
            if (this.maze.hasWall(this.i, this.j + 1)) {
                return true;
            }
        }
        if (this.lookup == Direction.UP) {
            if (this.maze.hasWall(this.i, this.j - 1)) {
                return true;
            }
        }
        if (this.lookup == Direction.RIGHT) {
            if (this.maze.hasWall(this.i - 1, this.j)) {
                return true;
            }
        }
        if (this.lookup == Direction.LEFT) {
            if (this.maze.hasWall(this.i + 1, this.j)) {
                return true;
            }
        }

        return false;
    }

    hasRightWall() {

        if (this.lookup == Direction.DOWN) {
            if (this.maze.hasWall(this.i, this.j - 1)) {
                return true;
            }
        }
        if (this.lookup == Direction.UP) {
            if (this.maze.hasWall(this.i, this.j + 1)) {
                return true;
            }
        }
        if (this.lookup == Direction.RIGHT) {
            if (this.maze.hasWall(this.i + 1, this.j)) {
                return true;
            }
        }
        if (this.lookup == Direction.LEFT) {
            if (this.maze.hasWall(this.i - 1, this.j)) {
                return true;
            }
        }

        return false;
    }
}
