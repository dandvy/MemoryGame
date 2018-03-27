import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { GameStateService } from '../_services/game-state.service';

@Injectable()
export class GameScreenGuard implements CanActivate {

    constructor(
        private router: Router,
        private gameState: GameStateService
    ) { }

    canActivate() {
        if (this.gameState.gameScreenEnable) {       
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}