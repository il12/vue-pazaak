class Player {
    constructor(name = `player`, playerDeck, isBot=false) {
        this.name = name;
        this.score = 0;
        this.rounds = 0;
        this.isFinished = false;
        this.isPlayedCard = false;
        this.usedCards = [];
        this.sets = [];
        this.hand = this.getHand(playerDeck);
        this.isActive = false;
        this.isBot = isBot;
        this.difficulty = 'easy';
    }

    getHand(playerDeck) {
        let hand = []
        for (let i = 0; i < 4; i++) {
            let index = Math.round(Math.random() * playerDeck.length - 1)
            hand.push(...playerDeck.splice(index, 1))
        }
        return hand;
    }
}

export default Player;
