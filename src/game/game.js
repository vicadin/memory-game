import { shuffle } from '@/utils/shuffle.js';
import { createElement } from '@/utils/dom.js';
import {
  CARD_EMOJIS,
  GAME_CONFIG,
  TIMING,
  STORAGE_KEYS,
  UI_TEXT,
} from '@/constants/index.js';

export function getCurrentDateFormatted() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}.${month}.${year}`;
}

export function saveScoreToLeaderboard(moves) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    const records = raw ? JSON.parse(raw) : [];

    const newRecord = {
      moves,
      date: getCurrentDateFormatted(),
      timestamp: Date.now(),
    };

    records.push(newRecord);

    records.sort((a, b) => {
      if (a.moves !== b.moves) {
        return a.moves - b.moves;
      }
      return a.timestamp - b.timestamp;
    });

    const topRecords = records.slice(0, GAME_CONFIG.LEADERBOARD_MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(topRecords));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export class GameManager {

  constructor({ movesValueEl, pairsValueEl, renderBoard, modal }) {
    this.movesValueEl = movesValueEl;
    this.pairsValueEl = pairsValueEl;
    this.renderBoard = renderBoard;
    this.modal = modal;

    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
    this.moves = 0;
    this.matchedPairs = 0;
    this.isGameOver = false;
    this.mismatchTimeoutId = null;

    this.handleCardClick = this.handleCardClick.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame() {
    if (this.mismatchTimeoutId !== null) {
      clearTimeout(this.mismatchTimeoutId);
      this.mismatchTimeoutId = null;
    }

    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
    this.isGameOver = false;

    this.moves = 0;
    this.matchedPairs = 0;
    this.updateCounters();

    const rawPairs = [...CARD_EMOJIS, ...CARD_EMOJIS].map((emoji, index) => ({
      id: index,
      emoji,
    }));
    const shuffledCards = shuffle(rawPairs);

    this.renderBoard(shuffledCards, this.handleCardClick);
  }

  updateCounters() {
    if (this.movesValueEl) {
      this.movesValueEl.textContent = String(this.moves);
    }
    if (this.pairsValueEl) {
      this.pairsValueEl.textContent = `${this.matchedPairs} / ${GAME_CONFIG.TOTAL_PAIRS}`;
    }
  }

  handleCardClick(cardEl, cardData) {
    if (this.isLocked || this.isGameOver) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (this.firstCard && this.firstCard.element === cardEl) return;

    cardEl.classList.add('flipped');

    if (!this.firstCard) {
      this.firstCard = { element: cardEl, emoji: cardData.emoji };
    } else {
      this.secondCard = { element: cardEl, emoji: cardData.emoji };
      this.moves += 1;
      this.updateCounters();

      if (this.firstCard.emoji === this.secondCard.emoji) {
        this.handleMatch();
      } else {
        this.handleMismatch();
      }
    }
  }

  handleMatch() {
    const card1 = this.firstCard.element;
    const card2 = this.secondCard.element;

    card1.classList.add('matched');
    card2.classList.add('matched');

    this.matchedPairs += 1;
    this.updateCounters();

    this.firstCard = null;
    this.secondCard = null;

    if (this.matchedPairs === GAME_CONFIG.TOTAL_PAIRS) {
      this.handleVictory();
    }
  }

  handleMismatch() {
    this.isLocked = true;
    const card1 = this.firstCard.element;
    const card2 = this.secondCard.element;

    this.mismatchTimeoutId = setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');

      this.firstCard = null;
      this.secondCard = null;
      this.isLocked = false;
      this.mismatchTimeoutId = null;
    }, TIMING.MISMATCH_FLIP_DELAY_MS);
  }

  handleVictory() {
    this.isGameOver = true;

    saveScoreToLeaderboard(this.moves);

    this.showVictoryModal();
  }

  showVictoryModal() {
    const messageEl = createElement('p', {
      text: UI_TEXT.VICTORY_MESSAGE,
    });

    const statsEl = createElement('p', {
      children: [
        document.createTextNode(UI_TEXT.VICTORY_MOVES_LABEL),
        createElement('span', {
          className: 'modal-highlight',
          text: String(this.moves),
        }),
      ],
    });

    const modalBody = [messageEl, statsEl];

    const modalNewGameBtn = createElement('button', {
      className: ['btn', 'btn-primary'],
      attrs: {
        type: 'button',
      },
      text: UI_TEXT.BUTTON_NEW_GAME,
      events: {
        click: () => {
          this.modal.close();
          this.startNewGame();
        },
      },
    });

    const modalCloseBtn = createElement('button', {
      className: ['btn', 'btn-secondary'],
      attrs: {
        type: 'button',
      },
      text: UI_TEXT.BUTTON_CLOSE,
      events: {
        click: () => {
          this.modal.close();
        },
      },
    });

    this.modal.open({
      title: UI_TEXT.VICTORY_TITLE,
      body: modalBody,
      actions: [modalNewGameBtn, modalCloseBtn],
    });
  }
}
