import { useNetInfo } from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import Text from './AppText';

function OffLineNotice() {
  const netinfo = useNetInfo();

  if (netinfo.type !== 'unknown' && netinfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.white }}>No Internet Connection....</Text>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: Constants.statusBarHeight,
    width: '100%',
    zIndex: 1,
  },
});

export default OffLineNotice;
