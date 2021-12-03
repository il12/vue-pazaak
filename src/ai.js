const decisionMaker = (gameState, botDifficulty)=>{
    const yourHand = gameState.player2.hand;
    const yourScore = gameState.player2.score;
    if(yourScore===20){
        return "stand"
    }
    if(botDifficulty === 'easy'){
        let changeableCards = yourHand.filter((item)=>item.isChangeable)
        let minusCards = yourHand.filter((item)=>!item.isChangeable && item.action === 'minus')
        let plusCards = yourHand.filter((item)=>!item.isChangeable && item.action === 'plus')
        let predictedResults = [
            ...changeableCards.map((item)=>yourScore+item.value),
            ...plusCards.map((item)=>yourScore+item.value),
            ...changeableCards.map((item)=>yourScore-item.value),
            ...minusCards.map((item)=>yourScore-item.value)
        ]
        let bestPossibleResult = Math.max(...predictedResults.filter((item)=>item<21))
        let requiredCardIndex = yourHand.indexOf(yourHand.filter((item)=>{
            if(item.isChangeable){
                return bestPossibleResult === yourScore + item.value || bestPossibleResult === yourScore - item.value
            } else {
                if(item.action === 'plus') {
                    return bestPossibleResult === yourScore + item.value;
                }
                else{
                    return bestPossibleResult === yourScore - item.value;
                }
            }
        })[0]);
        if(bestPossibleResult>16){
            if(yourHand[requiredCardIndex].isChangeable){
                if(yourHand[requiredCardIndex].action === 'plus') {
                    if (bestPossibleResult === yourScore + yourHand[requiredCardIndex].value) {
                        return `${requiredCardIndex}_plus`
                    } else {
                        return `${requiredCardIndex}_minus`
                    }
                } else if(yourHand[requiredCardIndex].action === 'minus') {
                    if (bestPossibleResult === yourScore - yourHand[requiredCardIndex].value) {
                        return `${requiredCardIndex}_minus`
                    } else {
                        return `${requiredCardIndex}_plus`
                    }
                }
            }
            return `${requiredCardIndex}_${yourHand[requiredCardIndex].action}`
        } else if(yourScore>16) {
            return 'stand'
        } else {
            return 'endTurn'
        }
    }
}

export default decisionMaker;
