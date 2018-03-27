import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameStateService } from '../_services/game-state.service';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {
  score: number;

  retryGame() {
    this.gameState.endScreenEnable = false;
    this.gameState.gameScreenEnable = true;
    this.router.navigate(['/game']);
  }

  constructor (private gameState: GameStateService, private router: Router) { }

  ngOnInit() {
    this.score = this.gameState.score;
  }

}
