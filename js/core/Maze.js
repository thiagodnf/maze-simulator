export default class Maze {

    constructor() {
        this.mice = [];

        this.pattern = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 2, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];

        this.pattern = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 3, 1, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        this.pattern = this.generateMaze(25,45);

        // console.table(this.generateMaze(15,15))
    }

    generateMaze(rows, cols) {
        if (rows < 3) rows = 3;
        if (cols < 3) cols = 3;
        if (rows % 2 === 0) rows++;
        if (cols % 2 === 0) cols++;

        // fill with walls
        const m = Array.from({ length: rows }, () => Array(cols).fill(1));

        const dirs = [
            [-2, 0], // up
            [2, 0],  // down
            [0, -2], // left
            [0, 2]   // right
        ];

        const inBounds = (r, c) => r > 0 && r < rows - 1 && c > 0 && c < cols - 1;

        const shuffle = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };

        // start at random odd cell
        const startR = 2 * Math.floor(Math.random() * Math.floor((rows - 1) / 2)) + 1;
        const startC = 2 * Math.floor(Math.random() * Math.floor((cols - 1) / 2)) + 1;
        m[startR][startC] = 0;

        const stack = [[startR, startC]];
        while (stack.length) {
            const [r, c] = stack[stack.length - 1];
            const neighbors = [];

            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                if (inBounds(nr, nc) && m[nr][nc] === 1) neighbors.push([nr, nc, dr, dc]);
            }

            if (neighbors.length === 0) {
                stack.pop();
                continue;
            }

            const [nr, nc, dr, dc] = shuffle(neighbors)[0];
            // knock down wall between current and neighbor
            m[r + dr / 2][c + dc / 2] = 0;
            m[nr][nc] = 0;
            stack.push([nr, nc]);
        }

        return m;
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
