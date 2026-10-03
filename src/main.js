import './styles/variables.css';
import './styles/global.css';

import { createElement } from './utils/dom.js';
import { createHeader } from './components/header/header.js';
import { createBoard } from './components/board/board.js';

function initApp() {
  const appContainer = createElement('div', {
    className: 'app-container',
  });

  const { headerElement } = createHeader({
    onNewGame: () => {
      // TODO
    },
    onLeaderboard: () => {
      // TODO
    },
  });

  const { boardElement } = createBoard({
    onCardClick: () => {
      // TODO
    },
  });

  appContainer.appendChild(headerElement);
  appContainer.appendChild(boardElement);

  document.body.appendChild(appContainer);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
