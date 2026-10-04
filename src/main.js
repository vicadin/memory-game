import './styles/variables.css';
import './styles/global.css';

import { createElement } from './utils/dom.js';
import { createHeader } from './components/header/header.js';
import { createBoard } from './components/board/board.js';
import { GameManager } from './game/game.js';

function initApp() {
  const appContainer = createElement('div', {
    className: 'app-container',
  });

  let gameManager = null;

  const { headerElement, movesValueEl, pairsValueEl } = createHeader({
    onNewGame: () => {
      if (gameManager) {
        gameManager.startNewGame();
      }
    },
    onLeaderboard: () => {
      const content = createLeaderboardContent();

      const closeBtn = createElement('button', {
        className: ['btn', 'btn-secondary'],
        attrs: {
          type: 'button',
        },
        text: 'Close',
        events: {
          click: () => sharedModal.close(),
        },
      });

    
    },
  });

  const { boardElement, renderBoard } = createBoard();

  appContainer.appendChild(headerElement);
  appContainer.appendChild(boardElement);

  document.body.appendChild(appContainer);

  gameManager = new GameManager({
    movesValueEl,
    pairsValueEl,
    renderBoard,
  });

  gameManager.startNewGame();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
