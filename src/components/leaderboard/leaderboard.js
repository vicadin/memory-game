import { createElement } from '../../utils/dom.js';
import './leaderboard.css';

const STORAGE_KEY = 'memory_game_leaderboard';

export function getLeaderboardRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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
      text: 'No results yet. Play and finish a game to set a record!',
    });
  }

  const thRank = createElement('th', { text: '#' });
  const thMoves = createElement('th', { text: 'Moves' });
  const thDate = createElement('th', { text: 'Date' });

  const trHead = createElement('tr', {
    children: [thRank, thMoves, thDate],
  });

  const thead = createElement('thead', {
    children: [trHead],
  });

  const rows = records.slice(0, 10).map((record, index) => {
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
      'aria-label': 'Top 10 scores leaderboard',
    },
    children: [thead, tbody],
  });

  return table;
}
