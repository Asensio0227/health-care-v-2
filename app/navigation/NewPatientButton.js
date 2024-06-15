import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import AppText from '../components/AppText';
import colors from '../config/colors';
import { useGlobalContext } from '../context/context';

function NewPatientButton() {
  const navigation = useNavigation();
  const { users } = useGlobalContext();
  const preview = {
    uri: '../assets/project/user-icon.png',
  };
  const uri = users.photoURL
    ? users.photoURL
    : '../assets/project/user-icon.png';

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
        <View style={styles.create}>
          <MaterialCommunityIcons
            name='plus-circle'
            color={colors.white}
            size={15}
          />
          <AppText style={styles.text} title='input'>
            create
          </AppText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
        <MaterialCommunityIcons
          name='account-search-outline'
          size={20}
          color={colors.black}
          style={styles.icon}
        />
      </TouchableWithoutFeedback>
      <TouchableHighlight
        onPress={() => navigation.navigate('Profile')}
        style={{ width: 50, height: 50, borderRadius: 25, overflow: 'hidden' }}
      >
        <Image style={styles.img} {...{ preview, uri }} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  create: {
    alignItems: 'center',
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 40,
    padding: 10,
  },
  icon: {
    margin: 20,
  },
  img: { height: '100%', width: '100%' },
  text: {
    color: colors.white,
    fontSize: 15,
    textTransform: 'capitalize',
    marginLeft: 5,
  },
});

export default NewPatientButton;
