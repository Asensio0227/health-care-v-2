import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
function AppButton({
  color = 'secondary',
  style,
  onPress,
  title,
  width = '100%',
}) {
  return (
    <TouchableOpacity
      style={[styles.Btn, style, { backgroundColor: colors[color], width }]}
      onPress={onPress}
    >
      <Text style={defaultStyles.btn}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Btn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 25,
    fontSize: 14,
    justifyContent: 'center',
    padding: 15,
    marginVertical: 10,
  },
});

export default AppButton;
