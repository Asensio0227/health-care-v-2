import React from 'react';
import { Text } from 'react-native';
import defaultStyles from '../config/styles';

function AppText({ style, children, title = 'text', ...otherProps }) {
  return (
    <Text style={[defaultStyles[title], style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
