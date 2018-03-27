import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Card } from './card.model';
import { GameStateService } from '../_services/game-state.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {
  cardValues: Array<string> = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "K", "Q"];
  cardSuits: Array<string> = ["C", "D", "H", "S"];
  /** Container of cards that will be displayed and manipulated during the game */
  tableCards: Array<Card>;
  /** Container of cards, which shouldn't take part in the game anymore */
  deletedCardNames: Array<string> = [];
  firstChosenCard: Card;
  secondChosenCard: Card;
  score: number = 0;
  pairsFound: number = 0;
  canRestart: boolean = true;

  /** 
   * Function creates a selection of cards for the game table,
   * sequentially selecting 9 pairs from the complete set and mixing the resulting collection.
  */
  shuffleCards() {
    var allCards = [];
    for (let cv of this.cardValues)
      for (let cs of this.cardSuits)
        allCards.push(cv + cs);
    var chosenCards = [];
    for (var i = 0; i < 9; i++) {
      var rand = Math.floor(Math.random() * allCards.length);
      var randChoice = allCards[rand];
      chosenCards.push(new Card(2*i, randChoice));
      chosenCards.push(new Card(2*i+1, randChoice));
      var indexToDel = allCards.indexOf(randChoice);
      allCards.splice(indexToDel, 1);
    }
    chosenCards.sort(function(a, b) {
      return Math.random() - 0.5;
    });
    this.tableCards = chosenCards;
  }

  /** Activating visual flip effect for each card on the table. */
  flipAllCards() {
    for (let card of this.tableCards)
      card.flip();
  }

  /** 
    * Main function that controls the user's click on an arbitrary map.
    * Verifies that the order of card selection is correct and handles user's choice,
    * also checking if the game should be stopped.
  */
  cardClick(cardEl: Card) {
    let success = this.setFirstOrSecondClickedCards(cardEl);
    if (!success) {
      return;
    }
    if (this.firstChosenCard && this.secondChosenCard) {
       this.handleTwoChosenCards();
    }
    if (this.pairsFound == 9) {
      this.gameState.gameScreenEnable = false;
      this.gameState.endScreenEnable = true;
      this.router.navigate(['/end']);
    }
  }

  /**
   * Update local score field and similar one in the shared service.
   * 
   * @param amount - amount of scores to add. Can be either positive or negative.
   */
  updateScore(amount: number) {
    this.gameState.score += amount;
    this.score = this.gameState.score;
  }

  /**
   * Updates card fields for the next handling actions, checking click order and rejecting same/empty card clicks.
   * @
   * @param cardEl - card object that was chosen with user's click.
   * @returns boolean value indicating whether user's choice was correct or not.
   */
  setFirstOrSecondClickedCards(cardEl: Card) {
    if (this.gameState.tableLocked || this.deletedCardNames.indexOf(cardEl.cardName) != -1) {
      return false;
    }
    if (!this.firstChosenCard) {
      this.firstChosenCard = cardEl;
      this.firstChosenCard.flip();
      this.firstChosenCard.changeVisibility();
    } else if (!this.secondChosenCard && this.firstChosenCard.cardID != cardEl.cardID) {
      this.secondChosenCard = cardEl;
      this.secondChosenCard.flip(); 
      this.secondChosenCard.changeVisibility();
      this.gameState.tableLocked = true;
    } else {
      return false;
    }
    return true;
  }

  /** Function processes situation with 2 correctly chosen cards, updating scores and handling animations. */
  handleTwoChosenCards() {
    if (this.firstChosenCard.cardName == this.secondChosenCard.cardName) {
      this.firstChosenCard.disappear = true;
      this.secondChosenCard.disappear = true;
      this.deletedCardNames.push(this.firstChosenCard.cardName);
      this.pairsFound++;
      this.updateScore(42 * (9 - this.pairsFound));
    } else {
      setTimeout(()=>{
        this.firstChosenCard.flip();
        this.secondChosenCard.flip();
      }, 500);
      this.updateScore(-42 * this.pairsFound)
    }

    setTimeout(()=>{
      this.firstChosenCard.changeVisibility();
      this.secondChosenCard.changeVisibility();
      this.firstChosenCard = null;
      this.secondChosenCard = null;
      this.gameState.tableLocked = false;
    }, 700);
  }

  /** Clears fields, prepares cards for new game, sets start-game animations, prevents "new-game-button-spamming" */
  restartGame() {
    if (!this.canRestart) {
      return;
    }
    this.canRestart = false;
    this.gameState.restart();
    this.shuffleCards();
    this.deletedCardNames = [];
    this.firstChosenCard = null;
    this.secondChosenCard = null;
    this.score = 0;
    this.pairsFound = 0;
    this.changeCardsVisibility();
    setTimeout(() => {     
      this.flipAllCards();
    }, 1200);
    setTimeout(() => {
      this.flipAllCards();
      setTimeout(() => {this.changeCardsVisibility();}, 400);
      this.gameState.tableLocked = false;
      this.canRestart = true;
    }, 6000);
  }

  /** Inverts visibility of significant <img> tag making it harder to crack the game (e.g. with browser dev tools) */
  changeCardsVisibility() {
    for (let c of this.tableCards) {
      c.changeVisibility();
    }
  }

  constructor (private gameState: GameStateService, private router: Router) { }

  ngOnInit() {
    this.restartGame();
  }

}
