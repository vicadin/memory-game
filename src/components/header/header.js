import { createElement } from '../../utils/dom';
import './header.css';

export function createHeader(callbacks = {}) {
  const title = createElement('h1', {
    className: 'header-title',
    text: 'Memory Game',
  });

  const newGameBtn = createElement('button', {
    className: ['btn', 'btn-primary'],
    attrs: {
      id: 'btn-new-game',
      type: 'button',
      'aria-label': 'Start new game',
    },
    text: 'New Game',
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
    text: 'Leaderboard',
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
    text: 'Moves:',
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
    text: 'Pairs found:',
  });

  const pairsValueEl = createElement('span', {
    className: 'stat-value',
    attrs: { id: 'pairs-counter' },
    text: '0 / 8',
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
