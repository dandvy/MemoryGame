import { Injectable } from '@angular/core';

/** Class handling intercomponent communication, contains shared data */
@Injectable()
export class GameStateService {
    /** Global table lock for situations such as game init or processing current card choice */
    tableLocked: boolean = true;
    score: number = 0;
    gameScreenEnable: boolean = false;
    endScreenEnable: boolean = false;

    restart() {
        this.tableLocked = true;
        this.score = 0;
    }

    constructor() {}
}
