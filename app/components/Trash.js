import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../config/colors';

function Trash({ onPress }) {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons
          name='trash-can'
          size={24}
          color={colors.secondary}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
    paddingRight: 10,
  },
});

export default Trash;
