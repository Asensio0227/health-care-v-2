import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';

function ListSeperator() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    height: 1,
    width: '70%',
  },
});

export default ListSeperator;
