import { M_FORWARD, T_RIGHT, T_LEFT, T_UP, T_DOWN } from "../constants/Move.js";
import Direction from "../constants/Direction.js";

export default class FollowWall {

    constructor() {
        this.pending = [];
    }

    next(mouse, maze) {

        if (this.pending.length !== 0) {
            return this.pending.shift();
        }

        console.log(mouse.hasRightWall2())
        let posPos = [];

        if (mouse.hasRightWall2()) {
            // if (!mouse.hasUpWall2()) {
            //     this.pending = [T_UP, M_FORWARD];
            // } else {
                this.pending.push(M_FORWARD);
            // }

        } else {
            this.pending = [T_RIGHT, M_FORWARD];
        }

        // if (mouse.hasRightWall2()) {

        // }

        // console.log(posPos)
        // if (mouse.hasRightWall2)

        // else {
        //     this.pending.push(M_FORWARD);
        //     return T_RIGHT;
        // }

        // return pending.shift()
    }
}
