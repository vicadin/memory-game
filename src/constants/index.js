export const CARD_EMOJIS = ['🦊', '🐼', '🐨', '🦁', '🐯', '🐵', '🦄', '🐙'];

export const GAME_CONFIG = {
  TOTAL_PAIRS: CARD_EMOJIS.length, // 8
  TOTAL_CARDS: CARD_EMOJIS.length * 2, // 16
  LEADERBOARD_MAX_ENTRIES: 10,
};

export const TIMING = {
  MISMATCH_FLIP_DELAY_MS: 900,
};

export const STORAGE_KEYS = {
  LEADERBOARD: 'memory_game_leaderboard',
};

export const CARD_VISUALS = {
  SHIRT_ICON: '✦',
};

export const UI_TEXT = {
  APP_TITLE: 'Memory Game',
  BUTTON_NEW_GAME: 'New Game',
  BUTTON_LEADERBOARD: 'Leaderboard',
  BUTTON_CLOSE: 'Close',
  LABEL_MOVES: 'Moves:',
  LABEL_PAIRS: 'Pairs found:',
  VICTORY_TITLE: 'Hooray!',
  VICTORY_MESSAGE: 'Memory level: Absolutely legendary 🎊',
  VICTORY_MOVES_LABEL: 'Total moves taken: ',
  LEADERBOARD_TITLE: 'Top 10 Scores',
  LEADERBOARD_EMPTY_ICON: '👻',
  LEADERBOARD_EMPTY_TITLE: 'No champions on the podium yet',
  LEADERBOARD_EMPTY_SUB: 'Finish a game and claim the №1 throne!',
  TABLE_HEADER_RANK: '#',
  TABLE_HEADER_MOVES: 'Moves',
  TABLE_HEADER_DATE: 'Date',
};
