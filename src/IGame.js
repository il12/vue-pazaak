import decisionMaker from "@/ai";
import Card from "@/ICard";

export default class Game {
    constructor(player1, player2) {
        this.isSetEnd = false;
        this.isGameEnd = false;
        this.gameWinner = null;
        this.setWinner = null;
        this.player1 = Object.assign({},player1);
        this.player2 = Object.assign({},player2);
        this.newSet();
    }

    newSet() {
        let tableDeck = [
            ...([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => new Card(item))),
            ...([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => new Card(item))),
            ...([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => new Card(item))),
            ...([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => new Card(item))),
        ]
        this.shuffledTableDeck = [...tableDeck].sort(() => (Math.random() > 0.5) ? 1 : -1)
        this.player1.sets = [...this.player1.usedCards];
        this.player1.usedCards = [];
        this.player1.score = 0;
        this.player1.isFinished = false;
        this.player2.sets = [...this.player1.usedCards];
        this.player2.usedCards = [];
        this.player2.score = 0;
        this.player2.isFinished = false;
        this.player2.isActive = false;
        this.currentPlayer = this.player1;
        this.currentPlayer.isActive = true;
        this.setWinner = null;
        this.isSetEnd = false;
        const firstCard = this.getNextCard();
        this.currentPlayer.usedCards.push(firstCard)
        this.currentPlayer.score += firstCard.value;
        console.log(this.player1,this.player2)
    }

    whoWinSet() {
        if (this.player1.score > 20) {
            this.player2.rounds += 1;
            if (this.player2.rounds === 3) {
                this.gameWinner = this.player2.name;
            }
            return this.player2.name;
        }
        else if (this.player2.score > 20) {
            this.player1.rounds += 1;
            if (this.player1.rounds === 3) {
                this.gameWinner = this.player1.name;
            }
            return this.player1.name
        }
        else if (this.player1.score === this.player2.score) {
            return `draw`
        }
        else if (this.player1.score > this.player2.score) {
            this.player1.rounds += 1;
            if (this.player1.rounds === 3) {
                this.gameWinner = this.player1.name;
            }
            return this.player1.name
        }
        else if (this.player1.score < this.player2.score) {
            this.player2.rounds += 1;
            if (this.player2.rounds === 3) {
                this.gameWinner = this.player2.name;
            }
            return this.player2.name;
        }
    }

    getNextCard() {
        return this.shuffledTableDeck.pop();
    }

    changeCurrentPlayer() {
        this.currentPlayer.isActive = false;
        if (this.currentPlayer === this.player1) {
            if (!this.player2.isFinished)
                this.currentPlayer = this.player2
        } else {
            if (!this.player1.isFinished)
                this.currentPlayer = this.player1
        }
        this.currentPlayer.isActive = true;
        this.currentPlayer.isPlayedCard = false;
    }

    nextTurn() {
        let newCard = this.getNextCard();
        if (!this.currentPlayer.isFinished) {
            this.currentPlayer.usedCards.push(newCard);
            this.currentPlayer.score += newCard.value;
            if(this.currentPlayer.isBot){
                setTimeout((state)=>{
                    let decision = decisionMaker(state,state.currentPlayer.difficulty)
                    if(decision === 'endTurn'){
                        state.endTurn();
                    } else if (decision === 'stand'){
                        state.stand();
                    } else {
                        let [index, action] = decision.split('_')
                        console.log(state.currentPlayer);
                        state.playCard(index,action);
                        state.stand();
                    }
                },750,this)
            }
        }
    }

    checkForceStand() {
        if (this.currentPlayer.score >= 20) {
            this.currentPlayer.isFinished = true;
            if (this.currentPlayer.score > 20) {
                this.isSetEnd = true;
            }
        }
    }

    endTurn() {
        this.checkForceStand()
        if (this.isSetEnd) {
            this.setWinner = this.whoWinSet();
        } else {
            this.changeCurrentPlayer();
            this.nextTurn();
        }
    }

    stand() {
        this.checkForceStand()
        this.currentPlayer.isFinished = true;
        if(this.player1.isFinished && this.player2.isFinished){
            this.isSetEnd = true;
        }
        if (this.isSetEnd) {
            this.setWinner = this.whoWinSet();
        } else {
            this.changeCurrentPlayer();
            this.nextTurn();
        }
    }

    playCard(index, action) {
        if (!this.currentPlayer.isPlayedCard) {
            let card = this.currentPlayer.hand.splice(index, 1)[0];
            card.action = action;
            this.currentPlayer.usedCards.push(card)
            if (card.action === 'plus') this.currentPlayer.score += card.value;
            else this.currentPlayer.score -= card.value
            this.currentPlayer.isPlayedCard = true
        }
    }
}


