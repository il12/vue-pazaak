import Card from "@/ICard";

const getPlayerDeck = ()=>{
    return [
        ...([1, 2, 3, 4, 5, 6].map((item) => new Card(item, 'plus'))),
        ...([1, 2, 3, 4, 5, 6].map((item) => new Card(item, 'plus'))),
        ...([1, 2, 3, 4, 5, 6].map((item) => new Card(item, 'minus'))),
        ...([1, 2, 3, 4, 5, 6].map((item) => new Card(item, 'minus'))),
        ...([1, 2, 3, 4, 5, 6].map((item) => new Card(item, 'plus', true))),
    ]
}

export default getPlayerDeck;
