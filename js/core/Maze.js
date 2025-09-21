export default class Maze {

    constructor(pattern) {
        this.mice = [];
        this.pattern = pattern;
    }

    addMouse(mouse) {
        this.mice.push(mouse);
    }

    hasWall(i, j) {
        return this.pattern[i][j] === 1;
    }

    nextMove() {

        for (const mouse of this.mice) {
            mouse.nextMove(this);
        }
    }
}
