export const themeColorsInit = (theme) => {
  const colors = {
    "--font-light-color": theme.palette.font.primary,
    "--font-primary-color": theme.palette.font.primary,
    "--font-darked-color": theme.palette.font.dark,
    "--font-transparent-color": theme.palette.font.transparent,
    "--bg-light-color": theme.palette.background.light,
    "--bg-primary-color": theme.palette.background.primary,
    "--bg-darked-color": theme.palette.background.darked,
    "--bg-dark-color": theme.palette.background.dark,
  };

  for (const key in colors) {
    const value = colors[key];
    document.documentElement.style.setProperty(key, value);
  }
};