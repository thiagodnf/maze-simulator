export default class Maze {

    constructor(pattern) {
        this.mice = [];
        this.pattern = pattern;
        this.visited = new Set();
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

            this.visited.add(`${mouse.i}_${mouse.j}`)
        }
    }

    isVisited(i, j) {
        return this.visited.has(`${i}_${j}`)
    }
}
