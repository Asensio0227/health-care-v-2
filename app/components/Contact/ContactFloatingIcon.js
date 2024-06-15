import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import Icons from '../Icons';

function ContactFloatingIcon() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Contact')}
      style={styles.container}
    >
      <Icons
        backgroundColor='secondary'
        name='message'
        size={40}
        color='white'
        transform={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    bottom: 20,
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 40,
  },
});

export default ContactFloatingIcon;
