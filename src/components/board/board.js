import { createElement } from '../../utils/dom.js';
import './board.css';

export const CARD_EMOJIS = ['🦊', '🐼', '🐨', '🦁', '🐯', '🐵', '🦄', '🐙'];

export function createCardElement({ id, emoji, onClick }) {
  const shirtPattern = createElement('span', {
    className: 'card-shirt-icon',
    text: '✦',
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
      'aria-label': 'Hidden card',
    },
    children: [cardInner],
    events: {
      click: (e) => {
        if (typeof onClick === 'function') {
          onClick(e, cardElement, { id, emoji });
        }
      },
    },
  });

  return cardElement;
}

export function createBoard(options = {}) {
  const emojis = options.emojis || CARD_EMOJIS;
  const onCardClick = options.onCardClick;

  const cardList = [...emojis, ...emojis].map((emoji, index) => ({
    id: index,
    emoji,
  }));

  const cardElements = cardList.map((cardData) =>
    createCardElement({
      id: cardData.id,
      emoji: cardData.emoji,
      onClick: onCardClick,
    })
  );

  const boardElement = createElement('main', {
    className: 'game-board',
    attrs: {
      id: 'game-board',
      'aria-label': 'Memory game board',
    },
    children: cardElements,
  });

  return {
    boardElement,
    cardElements,
  };
}
