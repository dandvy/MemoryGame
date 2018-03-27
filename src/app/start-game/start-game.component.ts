import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameStateService } from '../_services/game-state.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  
  navigateToGame() {
    this.gameState.gameScreenEnable = true;
    this.router.navigate(['/game']);
  }
  
  constructor (private gameState: GameStateService, private router: Router) { }

  ngOnInit() {
  }

}
