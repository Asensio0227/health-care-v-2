import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import colors from '../config/colors';
function Icons({
  name,
  backgroundColor = '#000',
  size = 40,
  color = 'secondary',
  style,
  transform,
}) {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          borderRadius: size / 2,
          backgroundColor,
          height: size,
          justifyContent: 'center',
          width: size,
        },
        style,
      ]}
    >
      <MaterialIcons
        name={name}
        size={size * 0.5}
        color={colors[color]}
        style={transform}
      />
    </View>
  );
}

export default Icons;
