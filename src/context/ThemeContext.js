import React from 'react';

export const theme = {
  dark: {
    primary: '#BB86FC',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#000000',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: '#2C2C2C',
    accent: '#03DAC6',
    elevation: {
      0: '#121212',
      1: '#1E1E1E',
      2: '#222222',
      3: '#242424',
      4: '#272727',
      5: '#2C2C2C',
      6: '#2F2F2F',
      7: '#323232',
      8: '#353535',
      9: '#373737',
      10: '#3A3A3A',
    },
  },
};

export const ThemeContext = React.createContext(theme.dark);

export const useTheme = () => React.useContext(ThemeContext);
