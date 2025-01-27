console.log('Script loaded');

const cardDefinitions = [
    // Each card has an id and an image property
    {id: 1, imagePath: 'cards/card-KingHearts.png'},
    {id: 2, imagePath: 'cards/card-JackClubs.png'},
    {id: 3, imagePath: 'cards/card-QueenDiamonds.png'},
    {id: 4, imagePath: 'cards/card-AceSpades.png'}
]

const cardBackImgPath = 'cards/card-back-Blue.png';
const cardStackElem = document.querySelector('.card-stack');
const collapsedGridTemp = '"a a" "a a"';
const playGameButtonElem = document.getElementById('play-game')
const cardCollectionCellClass = ".card-pos1";
const numCards = cardDefinitions.length

let cards = []
let cardPositions = []

loadGame()

function shuffleCards() {
    const id = setInterval(shuffle, 12);
    let shuffleCount = 0;
  
    function shuffle() {
      randomizeCardPosition();
  
      if (shuffleCount === 100) {
        clearInterval(id);
        dealCards(); // <--- Redistribute
      } else {
        shuffleCount++;
      }
    }
  }
  

function initializeCardPositions(card) {
    cardPositions.push(card.id)
}

function randomizeCardPosition() {
    const random1 = Math.floor(Math.random() * numCards) + 1
    const random2 = Math.floor(Math.random() * numCards) + 1

    const temp = cardPositions[random1 - 1]
    cardPositions[random1 - 1] = cardPositions[random2 - 1]  
    cardPositions[random2 - 1] = temp
}

function loadGame() { 
    createCards();

    cards = document.querySelectorAll('.card')

    playGameButtonElem.addEventListener('click', ()=>startGame())
}

function startGame() {
    initializeNewGame()
    startNewRound()
}

function initializeNewGame() {

}

function startNewRound() {
    initializeNewRound()
    collectCards()
    flipCards(true)
    shuffleCards()
}

function initializeNewRound() {

}

function flipCard(card, flipToBack) {
    const innerCardElem = card.firstChild

    // If inner card element does not have flip-it, then flip it; if it does then flip it 
    // back to front facing
    if (flipToBack && !innerCardElem.classList.contains('flip-it')) {
        innerCardElem.classList.add('flip-it')
    }
    else if (innerCardElem.classList.contains('flip-it')) {
        innerCardElem.classList.remove('flip-it')
    }
}

function flipCards(flipToBack) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            flipCard(card, flipToBack)
        }, index * 100)
    })
}

function collectCards() {
    transformGridArea('"a a" "a a"'); 
    addCardsToGridAreaCell(".card-pos1");
  }
  

function transformGridArea(areas) {
    cardStackElem.style.gridTemplateAreas = areas 
    addCardsToGridAreaCell(cardCollectionCellClass)
}

function addCardsToGridAreaCell(cellPositionClassName) {
    const cellPositionElem = document.querySelector(cellPositionClassName)

    // Remove any existing cards first
    while (cellPositionElem.firstChild) {
        cellPositionElem.removeChild(cellPositionElem.firstChild)
    }

    // Add all cards to this cell for collection
    cards.forEach((card) => {
        addChildElem(cellPositionElem, card)
    })
}

function addCardsToAppropriateCell() {
    cards.forEach((card) => {
        // Get the position from cardPositions array
        const cardIndex = card.id - 1
        const position = cardPositions[cardIndex]
        
        // Map position to the correct grid cell
        let cellClassName
        if (position === 1) cellClassName = '.card-pos1'
        else if (position === 2) cellClassName = '.card-pos2'
        else if (position === 3) cellClassName = '.card-pos3'
        else if (position === 4) cellClassName = '.card-pos4'
        
        // Get the cell element and add the card
        const cellElem = document.querySelector(cellClassName)
        if (cellElem) {
            // Remove any existing cards first
            while (cellElem.firstChild) {
                cellElem.removeChild(cellElem.firstChild)
            }
            addChildElem(cellElem, card)
        }
    })
}

function createCard(cardItem) {
    const cardElem = createElement('div')
    const cardInnerElem = createElement('div')
    const cardFrontElem = createElement('div')
    const cardBackElem = createElement('div')
    const frontImgElem = createElement('img')
    const backImgElem = createElement('img')

    addClassToElem(cardElem, 'card')
    addIdToElem(cardElem, cardItem.id)
    addClassToElem(cardInnerElem, 'card-inner')
    addClassToElem(cardFrontElem, 'card-front')
    addClassToElem(cardBackElem, 'card-back')
    addClassToElem(frontImgElem, 'card-img')
    addClassToElem(backImgElem, 'card-img')

    addSrcToImg(backImgElem, cardBackImgPath)
    addSrcToImg(frontImgElem, cardItem.imagePath)

    addChildElem(cardFrontElem, frontImgElem)
    addChildElem(cardBackElem, backImgElem)
    addChildElem(cardInnerElem, cardFrontElem)
    addChildElem(cardInnerElem, cardBackElem)
    addChildElem(cardElem, cardInnerElem)

    addCardToGridCell(cardElem)
    initializeCardPositions(cardElem)
}

function dealCards() {
    // E.g. might produce: '"b a" "d c"'
    const areasTemplate = returnGridAreaMappedToCardPos();
    transformGridArea(areasTemplate);
    addCardsToAppropriateCell();
  }
  

function addCardToAppCell() { 
    cards.forEach((card) => {
        addCardToGridCell(card)
    })
}

function returnGridAreaMappedToCardPos() {
    let firstPart = "";
    let secondPart = "";
    let areas = "";

    cards.forEach((card, index) => {
        if (cardPositions[index] == 1) {
            areas = areas + "a ";
        }
        else if (cardPositions[index] == 2) {
            areas = areas + "b ";
        }
        else if (cardPositions[index] == 3) {
            areas = areas + "c ";
        }
        else if (cardPositions[index] == 4) {
            areas = areas + "d ";
        }
        
        if (index == 1) {
            firstPart = areas.substring(0, areas.length - 1)
            areas = "";
        }
        else if (index == 3) {
            secondPart = areas.substring(0, areas.length - 1)
        }
    })
    
    return `"${firstPart}" "${secondPart}"`;
}

function createCards() {
    console.log('Creating cards');
    cardDefinitions.forEach((cardItem) => {
        createCard(cardItem);
    });
}

function createElement(elemType) {
    return document.createElement(elemType);
}

function addClassToElem(elem, className) {
    elem.classList.add(className);
}

function addIdToElem(elem, idName) {
    elem.id = idName;
}

function addSrcToImg(image, src) {
    image.src = src;
}

function addChildElem(parent, child) {
    parent.appendChild(child);
}

function addCardToGridCell(card) {
    const cardPosClassName = mapCardToGridcell(card);

    const cardPosElem = document.querySelector(cardPosClassName);

    addChildElem(cardPosElem, card);
}

function mapCardToGridcell(card) {
    if (card.id == 1) return '.card-pos1';
    else if (card.id == 2) return '.card-pos2';
    else if (card.id == 3) return '.card-pos3';
    else if (card.id == 4) return '.card-pos4'; 
}