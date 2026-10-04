import { shuffle } from '../utils/shuffle.js';
import { CARD_EMOJIS } from '../components/board/board.js';
import { createElement } from '../utils/dom.js';

const STORAGE_KEY = 'memory_game_leaderboard';

export function getCurrentDateFormatted() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}.${month}.${year}`;
}

export function saveScoreToLeaderboard(moves) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

    const top10 = records.slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
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
      this.pairsValueEl.textContent = `${this.matchedPairs} / 8`;
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

    if (this.matchedPairs === 8) {
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
    }, 900);
  }

  /**
   * Called when all 8 pairs have been discovered.
   */
  handleVictory() {
    this.isGameOver = true;

    // Save score to leaderboard
    saveScoreToLeaderboard(this.moves);

    // Open victory modal
    this.showVictoryModal();
  }

  /**
   * Displays the Victory Modal with the final move count and actions.
   */
  showVictoryModal() {
    const messageEl = createElement('p', {
      text: 'Congratulations! You found all 8 pairs.',
    });

    const statsEl = createElement('p', {
      children: [
        document.createTextNode('Total moves completed: '),
        createElement('span', {
          className: 'modal-highlight',
          text: String(this.moves),
        }),
      ],
    });

    const modalBody = [messageEl, statsEl];

    // "New Game" button in modal
    const modalNewGameBtn = createElement('button', {
      className: ['btn', 'btn-primary'],
      attrs: {
        type: 'button',
      },
      text: 'New Game',
      events: {
        click: () => {
          this.modal.close();
          this.startNewGame();
        },
      },
    });

    // "Close" button in modal
    const modalCloseBtn = createElement('button', {
      className: ['btn', 'btn-secondary'],
      attrs: {
        type: 'button',
      },
      text: 'Close',
      events: {
        click: () => {
          this.modal.close();
        },
      },
    });

    this.modal.open({
      title: 'Victory!',
      body: modalBody,
      actions: [modalNewGameBtn, modalCloseBtn],
    });
  }
}
