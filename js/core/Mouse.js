import Direction from "../constants/Direction.js";
import MOVE from "../constants/Move.js";

export default class Mouse {

    constructor(maze, strategy) {
        this.i = 1;
        this.j = 1;
        this.lookup = Direction.UP;
        this.lookupAngle = 90;
        this.maze = maze;
        this.strategy = strategy;
    }

    hasWall(i, j) {
        return this.maze.hasWall(i, j);
    }

    hasWallInTheBack() {

        switch (this.lookup) {
            case Direction.DOWN: return this.hasWall(this.i - 1, this.j);
            case Direction.UP: return this.hasWall(this.i + 1, this.j);
            case Direction.LEFT: return this.hasWall(this.i, this.j + 1);
            case Direction.RIGHT: return this.hasWall(this.i, this.j - 1);
            default: return false;
        }
    }

    hasWallInTheFront() {

        switch (this.lookup) {
            case Direction.DOWN: return this.hasWall(this.i + 1, this.j);
            case Direction.UP: return this.hasWall(this.i - 1, this.j);
            case Direction.LEFT: return this.hasWall(this.i, this.j - 1);
            case Direction.RIGHT: return this.hasWall(this.i, this.j + 1);
            default: return false;
        }
    }

    hasWallInTheLeft() {

        switch (this.lookup) {
            case Direction.DOWN: return this.hasWall(this.i, this.j + 1);
            case Direction.UP: return this.hasWall(this.i, this.j - 1);
            case Direction.LEFT: return this.hasWall(this.i + 1, this.j);
            case Direction.RIGHT: return this.hasWall(this.i - 1, this.j);
            default: return false;
        }
    }

    hasWallInTheRight() {

        switch (this.lookup) {
            case Direction.DOWN: return this.hasWall(this.i, this.j - 1);
            case Direction.UP: return this.hasWall(this.i, this.j + 1);
            case Direction.LEFT: return this.hasWall(this.i - 1, this.j);
            case Direction.RIGHT: return this.hasWall(this.i + 1, this.j);
            default: return false;
        }
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

        if (next === MOVE.MOVE_FORWARD) {
            this.moveForward()
        } else if (next === MOVE.TURN_UP) {
            this.lookup = Direction.UP;
        } else if (next === MOVE.TURN_DOWN) {
            this.lookup = Direction.DOWN;
        } else if (next === MOVE.TURN_LEFT) {
            this.lookup = Direction.LEFT;
        } else if (next === MOVE.TURN_RIGHT) {
            this.lookup = Direction.RIGHT;
        } else if (next === MOVE.TURN_LEFT_2) {

            if (this.lookup == Direction.DOWN) {
                this.lookup = Direction.RIGHT;
            } else if (this.lookup == Direction.RIGHT) {
                this.lookup = Direction.UP;
            } else if (this.lookup == Direction.UP) {
                this.lookup = Direction.LEFT;
            } else if (this.lookup == Direction.LEFT) {
                this.lookup = Direction.DOWN;
            }
        } else if (next === MOVE.TURN_RIGHT_2) {

            if (this.lookup == Direction.DOWN) {
                this.lookup = Direction.LEFT;
            } else if (this.lookup == Direction.LEFT) {
                this.lookup = Direction.UP;
            } else if (this.lookup == Direction.UP) {
                this.lookup = Direction.RIGHT;
            } else if (this.lookup == Direction.RIGHT) {
                this.lookup = Direction.DOWN;
            }
        }
    }
}
