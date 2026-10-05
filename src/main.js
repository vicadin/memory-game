import './styles/variables.css';
import './styles/global.css';

import { createElement } from './utils/dom.js';
import { createHeader } from './components/header/header.js';
import { createBoard } from './components/board/board.js';
import { Modal } from './components/modal/modal.js';
import { GameManager } from './game/game.js';
import { createLeaderboardContent } from './components/leaderboard/leaderboard.js';
import { UI_TEXT } from './constants/index.js';

function initApp() {
  const appContainer = createElement('div', {
    className: 'app-container',
  });

  const sharedModal = new Modal();

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
        text: UI_TEXT.BUTTON_CLOSE,
        events: {
          click: () => sharedModal.close(),
        },
      });

      sharedModal.open({
        title: UI_TEXT.BUTTON_LEADERBOARD,
        body: content,
        actions: [closeBtn],
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
    modal: sharedModal,
  });

  gameManager.startNewGame();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
