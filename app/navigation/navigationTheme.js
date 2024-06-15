import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import colors from '../config/colors';

export default MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: colors.mode,
    primary: colors.secondary,
    background: '#282c35',
  },
};
