import { createElement } from '../../utils/dom.js';
import { STORAGE_KEYS, GAME_CONFIG, UI_TEXT } from '../../constants/index.js';
import './leaderboard.css';

export function getLeaderboardRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function createLeaderboardContent() {
  const records = getLeaderboardRecords();

  if (records.length === 0) {
    return createElement('div', {
      className: 'leaderboard-empty',
      children: [
        createElement('div', {
          className: 'leaderboard-empty-icon',
          text: UI_TEXT.LEADERBOARD_EMPTY_ICON,
        }),
        createElement('div', {
          className: 'leaderboard-empty-title',
          text: UI_TEXT.LEADERBOARD_EMPTY_TITLE,
        }),
        createElement('div', {
          className: 'leaderboard-empty-sub',
          text: UI_TEXT.LEADERBOARD_EMPTY_SUB,
        }),
      ],
    });
  }

  const thRank = createElement('th', { text: UI_TEXT.TABLE_HEADER_RANK });
  const thMoves = createElement('th', { text: UI_TEXT.TABLE_HEADER_MOVES });
  const thDate = createElement('th', { text: UI_TEXT.TABLE_HEADER_DATE });

  const trHead = createElement('tr', {
    children: [thRank, thMoves, thDate],
  });

  const thead = createElement('thead', {
    children: [trHead],
  });

  const rows = records.slice(0, GAME_CONFIG.LEADERBOARD_MAX_ENTRIES).map((record, index) => {
    const tdRank = createElement('td', {
      className: 'leaderboard-rank',
      text: String(index + 1),
    });

    const tdMoves = createElement('td', {
      className: 'leaderboard-moves',
      text: String(record.moves),
    });

    const tdDate = createElement('td', {
      className: 'leaderboard-date',
      text: record.date || '—',
    });

    return createElement('tr', {
      children: [tdRank, tdMoves, tdDate],
    });
  });

  const tbody = createElement('tbody', {
    children: rows,
  });

  const table = createElement('table', {
    className: 'leaderboard-table',
    attrs: {
      'aria-label': `${UI_TEXT.LEADERBOARD_TITLE} leaderboard`,
    },
    children: [thead, tbody],
  });

  return table;
}
