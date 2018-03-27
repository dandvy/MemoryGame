export class Card {
    cardID: number;
    imgPath: string = "../../assets/Cards/";
    cardBackPath: string = "../../assets/Cards/CardBack.png";
    cardName: string;
    /** For hiding card image in DOM */
    visible: boolean = false;
    /** For Kontur test purposes */
    cardtid: string = "Card";
    /** Controls card flip class and animation */
    flipped: boolean = false;
    /** Controls card disappear class and animation */
    disappear: boolean  = false;
  
    constructor(cardID: number, cardName: string) {
      this.cardID = cardID;
      this.cardName = cardName;
      this.imgPath += cardName;
      this.imgPath += ".png";
    }

    changeVisibility() {
      this.visible = !this.visible;
      if (this.cardtid == "Card") {
        this.cardtid = "Card-flipped"
      } else {
        this.cardtid = "Card"
      }     
    }

    flip() {
      this.flipped = !this.flipped;
    }
}