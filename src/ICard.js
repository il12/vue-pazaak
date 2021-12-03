class Card {
    constructor(value, action = 'neutral', isChangeable = false,) {
        this.action = action;
        this.value = value;
        this.isChangeable = isChangeable;
        this.isHidden = false;
        this.isFrozen = false;
    }
}

export default Card;
