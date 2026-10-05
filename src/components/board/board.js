import { createElement, clearChildren } from '../../utils/dom.js';
import { CARD_VISUALS } from '../../constants/index.js';
import './board.css';

export function createCardElement({ id, emoji, onClick }) {
  const shirtPattern = createElement('span', {
    className: 'card-shirt-icon',
    text: CARD_VISUALS.SHIRT_ICON,
  });

  const cardShirt = createElement('div', {
    className: 'card-shirt',
    children: [shirtPattern],
  });

  const cardEmoji = createElement('span', {
    className: 'card-emoji',
    text: emoji,
  });

  const cardFace = createElement('div', {
    className: 'card-face',
    children: [cardEmoji],
  });

  const cardInner = createElement('div', {
    className: 'card-inner',
    children: [cardShirt, cardFace],
  });

  const cardElement = createElement('button', {
    className: 'card',
    attrs: {
      type: 'button',
      'data-card-id': String(id),
      'data-card-emoji': emoji,
      'aria-label': 'Hidden memory card',
    },
    children: [cardInner],
    events: {
      click: (e) => {
        if (typeof onClick === 'function') {
          onClick(cardElement, { id, emoji });
        }
      },
    },
  });

  return cardElement;
}

export function createBoard() {
  const boardElement = createElement('main', {
    className: 'game-board',
    attrs: {
      id: 'game-board',
      'aria-label': 'Memory game board',
    },
  });

  function renderBoard(cardsList, onCardClick) {
    clearChildren(boardElement);
    const cardElements = cardsList.map((cardData) =>
      createCardElement({
        id: cardData.id,
        emoji: cardData.emoji,
        onClick: onCardClick,
      })
    );
    cardElements.forEach((el) => boardElement.appendChild(el));
    return cardElements;
  }

  return {
    boardElement,
    renderBoard,
  };
}
