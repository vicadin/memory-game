import { createElement } from '@/utils/dom.js';
import { UI_TEXT, GAME_CONFIG } from '@/constants/index.js';
import './header.css';

export function createHeader(callbacks = {}) {
  const title = createElement('h1', {
    className: 'header-title',
    text: UI_TEXT.APP_TITLE,
  });

  const newGameBtn = createElement('button', {
    className: ['btn', 'btn-primary'],
    attrs: {
      id: 'btn-new-game',
      type: 'button',
      'aria-label': 'Start new game',
    },
    text: UI_TEXT.BUTTON_NEW_GAME,
    events: {
      click: () => {
        if (callbacks.onNewGame) callbacks.onNewGame();
      },
    },
  });

  const leaderboardBtn = createElement('button', {
    className: ['btn', 'btn-secondary'],
    attrs: {
      id: 'btn-leaderboard',
      type: 'button',
      'aria-label': 'Open leaderboard',
    },
    text: UI_TEXT.BUTTON_LEADERBOARD,
    events: {
      click: () => {
        if (callbacks.onLeaderboard) callbacks.onLeaderboard();
      },
    },
  });

  const headerActions = createElement('div', {
    className: 'header-actions',
    children: [newGameBtn, leaderboardBtn],
  });

  const topBar = createElement('div', {
    className: 'header-top-bar',
    children: [title, headerActions],
  });

  const movesLabel = createElement('span', {
    className: 'stat-label',
    text: UI_TEXT.LABEL_MOVES,
  });

  const movesValueEl = createElement('span', {
    className: 'stat-value',
    attrs: { id: 'moves-counter' },
    text: '0',
  });

  const movesStat = createElement('div', {
    className: 'stat-item',
    children: [movesLabel, movesValueEl],
  });

  const pairsLabel = createElement('span', {
    className: 'stat-label',
    text: UI_TEXT.LABEL_PAIRS,
  });

  const pairsValueEl = createElement('span', {
    className: 'stat-value',
    attrs: { id: 'pairs-counter' },
    text: `0 / ${GAME_CONFIG.TOTAL_PAIRS}`,
  });

  const pairsStat = createElement('div', {
    className: 'stat-item',
    children: [pairsLabel, pairsValueEl],
  });

  const statsPanel = createElement('div', {
    className: 'stats-panel',
    children: [movesStat, pairsStat],
  });

  const headerElement = createElement('header', {
    className: 'header',
    children: [topBar, statsPanel],
  });

  return {
    headerElement,
    movesValueEl,
    pairsValueEl,
    newGameBtn,
    leaderboardBtn,
  };
}
