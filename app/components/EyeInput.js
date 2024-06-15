import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
import { useGlobalContext } from '../context/context';
function EyeInput({ name, onPress, style, checkbox, color = 'danger' }) {
  const { isPasswordShown } = useGlobalContext();
  return (
    <>
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Ionicons
          name={name}
          size={24}
          color={checkbox ? colors[color] : defaultStyles.colors.secondarylight}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});

export default EyeInput;
