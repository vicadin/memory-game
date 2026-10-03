import { createEl } from '../../helpers/createEl';

export function createHeader({ onNewGame, onLeaderboard }) {
  const movesValueEl = createEl('span', { className: 'header__stat-value' }, '0');
  const pairsValueEl = createEl('span', { className: 'header__stat-value' }, '0 / 8');

  const newGameBtn = createEl(
    'button',
    {
      className: 'btn btn--primary',
      type: 'button',
      'aria-label': 'Start a new game',
      onClick: onNewGame,
    },
    'New Game'
  );

  const leaderboardBtn = createEl(
    'button',
    {
      className: 'btn btn--secondary',
      type: 'button',
      'aria-label': 'Open leaderboard',
      onClick: onLeaderboard,
    },
    'Leaderboard'
  );

  const headerElement = createEl(
    'header',
    { className: 'header' },
    createEl(
      'div',
      { className: 'header__container' },
      createEl(
        'div',
        { className: 'header__controls' },
        newGameBtn,
        leaderboardBtn
      ),
      createEl(
        'div',
        { className: 'header__stats' },
        createEl(
          'div',
          { className: 'header__stat-item' },
          createEl('span', { className: 'header__stat-label' }, 'Moves: '),
          movesValueEl
        ),
        createEl(
          'div',
          { className: 'header__stat-item' },
          createEl('span', { className: 'header__stat-label' }, 'Pairs: '),
          pairsValueEl
        )
      )
    )
  );

  const updateStats = (moves, matchedPairs) => {
    movesValueEl.textContent = String(moves);
    pairsValueEl.textContent = `${matchedPairs} / 8`;
  };

  return {
    element: headerElement,
    updateStats,
  };
}