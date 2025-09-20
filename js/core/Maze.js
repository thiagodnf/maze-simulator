export default class Maze {

    constructor() {
        this.mice = [];

        this.pattern = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 2, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
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
