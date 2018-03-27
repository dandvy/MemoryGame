import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card.model';
import { GameStateService } from '../../_services/game-state.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  /** Card object, passed with databinding from game table component */
  @Input() card: Card;
  
  constructor(private gameState: GameStateService) { }

  ngOnInit() {
  }

}
