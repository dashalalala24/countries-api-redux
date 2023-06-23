export const TOGGLE_THEME = '@@theme/TOGGLE_THEME';

export const toggleTheme = (theme) => ({
  type: TOGGLE_THEME,
  payload: theme,
});
