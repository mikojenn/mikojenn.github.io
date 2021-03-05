const suits = ['♠', '♥', '♦', '♣']
const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
]

const cards = [];
//loop suits one by one then put value--------
//suit + value (concat)
//then push to empty array
suits.forEach((suit) => {
    values.forEach((value) => {
        cards.push(suit.concat(value));
    })
})
//----------------------SHUFFLE--------------------//
//declare value t and i (30)
function shuffle(cards) {
    var m = cards.length, t, i;

    // While there remain elements to shuffle…
    //(m)lenght of cards
    while (m) {

        // Pick a remaining element…
        //pick index of array (what position)
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        //t-temporary variable to be swap by dealts cards
        t = cards[m];//to be saved
        cards[m] = cards[i]; //i=replace
        cards[i] = t; //swap i to m
    }

    return cards;
}
//--------------------GROUP BY SUIT-------------------//
function groupBySuit(cards) {
    const clubs = [], //declaring per suit to be replaced any value
        diamonds = [], //declaring per suit to be replaced any value
        spades = [], //declaring per suit to be replaced any value
        hearts = []; //declaring per suit to be replaced any value

    //loop for Each every card check for suit
    //use to push card for every suit
    cards.forEach((card) => {
        if (card.includes('♠')) {
            spades.push(card)
        }
        if (card.includes('♥')) {
            hearts.push(card)
        }
        if (card.includes('♦')) {
            diamonds.push(card)
        }
        if (card.includes('♣')) {
            clubs.push(card)
        }
    });
    //declared as object 
    return {
        clubs,
        diamonds,
        spades,
        hearts
    }
}
//--------------------ARRANGE BY SUIT-----------------//

function arrangeBySuit(cards) {
    const { clubs, diamonds, hearts, spades } = groupBySuit(cards) //object destructuring (will get all properties of an object---then will be declared as variable)
    return [...clubs, ...diamonds, ...hearts, ...spades];//spread operator (spreading each value)
}


//-------------------SORTDECK-------------------------//
const compareValue = (firstValue, secondValue, direction) => {
    if (direction === 'descending') return firstValue < secondValue; //descending
    return firstValue > secondValue //ascending
}

//to make the letters a number --- this will be used for card sorting 
function getFaceValue(value) {
    let faceValue;

    if (isNaN(parseInt(value))) { //parseInt -it makes the value a number
        switch (value) {
            case 'A':
                faceValue = 1
                break;
            case 'J':
                faceValue = 11
                break;
            case 'Q':
                faceValue = 12
                break;
            case 'K':
                faceValue = 13
                break;
        }
        return parseInt(faceValue);
    }

    return parseInt(value)
}


function sortDeck(cards, direction) {
    let temp;
    //loop for checking cards within the deck
    for (let x = 0; x < cards.length - 1; x++) { //way to check the first value
        for (let y = x + 1; y < cards.length; y++) { //way to check the next value of the cards......

            let firstValue = cards[x].substring(1); //substring is used to remove the first character of a string
            let secondValue = cards[y].substring(1); //wherein the first character is the suit // value will only remain which is the number

            firstValue = getFaceValue(firstValue);
            secondValue = getFaceValue(secondValue);

            if (compareValue(firstValue, secondValue, direction)) { //if first value is greater than the second value it will be placed next to second value = ascending // descending other way around
                temp = cards[x]
                cards[x] = cards[y]
                cards[y] = temp
            }
        }
    }
    return cards;
}
//--------------------ARRANGE BY VALUE----------------//
function arrangeByValue(cards, direction) { //(direction)to determine if ascending or descending

    const { clubs, diamonds, hearts, spades } = groupBySuit(cards); //object destructuring (will get all properties of an object---then will be declared as variable)



    sortDeck(clubs, direction); //called per suit to not confuse
    sortDeck(diamonds, direction);
    sortDeck(hearts, direction);
    sortDeck(spades, direction);

    return [...clubs, ...diamonds, ...hearts, ...spades] //... to spread
}
//--------------------------DEAL--------------------//
function dealCard(deck) {
    const card = deck[0];  //get the first index of the deck/card

    let value = card.substring(1) //remove suit 
    let suit = card.charAt(0) //get the first character of the string which is (0)
    deck.shift(); //method of array that removes the first character of the string which is (0)

    const numberToWords = (num) => {
        const numberWords = ['', '', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
        if (isNaN(parseInt(num))) { // to identify if the value is letter
            switch (num) { //ex: if the num = A return Ace......
                case 'A':
                    return 'Ace';
                case 'J':
                    return 'Jack';
                case 'Q':
                    return 'Queen';
                case 'K':
                    return 'King';
            }
        };

        return numberWords[parseInt(num)] //if number , automatically it will return numberWords 
    }

    const unixToWord = (str) => {
        switch (str) {
            case '♠':
                return 'Spades';
            case '♥':
                return 'Hearts';
            case '♦':
                return 'Diamonds';
            case '♣':
                return 'clubs';
        }
    }

    return `${numberToWords(value)} of ${unixToWord(suit)}`; //to show card value number + suits
}
//-------------------------CONSOLE /RUN--------------------//
/*const shuffledDeck = shuffle(cards);

console.log('shuffled deck', shuffledDeck);
console.log('==============');

console.log('arrange by suit');
console.log(arrangeBySuit(shuffle(cards)));
console.log('==============');

console.log('arrange by value')
console.log('ascending', arrangeByValue(shuffle(cards)));
console.log('descending', arrangeByValue(shuffle(cards), 'descending'));
console.log('==============');

console.log('deal cards');
console.log(dealCard(shuffledDeck), shuffledDeck.length);
console.log(dealCard(shuffledDeck), shuffledDeck.length);
console.log(dealCard(shuffledDeck), shuffledDeck.length);
console.log(dealCard(shuffledDeck), shuffledDeck.length);
console.log(dealCard(shuffledDeck), shuffledDeck.length);
console.log(dealCard(shuffledDeck), shuffledDeck.length);
console.log('==============');
*/