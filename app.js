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

createCards();

function createCard(cardItem) {
    const cardElem = createElement('div');
    const cardInnerElem = createElement('div');
    const cardFrontElem = createElement('div');
    const cardBackElem = createElement('div');
    const frontImgElem = createElement('img');
    const backImgElem = createElement('img');

    addClassToElem(cardElem, 'card');
    addIdToElem(cardElem, cardItem.id);
    addClassToElem(cardInnerElem, 'card-inner');
    addClassToElem(cardFrontElem, 'card-front');
    addClassToElem(cardBackElem, 'card-back');
    addClassToElem(frontImgElem, 'card-img');
    addClassToElem(backImgElem, 'card-img');

    addSrcToImg(backImgElem, cardBackImgPath);
    addSrcToImg(frontImgElem, cardItem.imagePath);

    addChildElem(cardFrontElem, frontImgElem);
    addChildElem(cardBackElem, backImgElem);
    addChildElem(cardInnerElem, cardFrontElem);
    addChildElem(cardInnerElem, cardBackElem);
    addChildElem(cardElem, cardInnerElem);

    addCardToGridCell(cardElem);
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