export const themeColorsInit = (theme) => {
    const colors = {
      "--font-primary-color": theme.palette.font.primary,
      "--font-darked-color": theme.palette.font.dark,
      "--bg-light-color": theme.palette.background.light,
      "--bg-primary-color": theme.palette.background.primary,
      "--bg-darked-color": theme.palette.background.dark,
    };

  for (const key in colors) {
    const value = colors[key];
    document.documentElement.style.setProperty(key, value);
  }
};