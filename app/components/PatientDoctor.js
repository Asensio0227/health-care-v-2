import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import ReactNativeModal from 'react-native-modal';
import colors from '../config/colors';
import AppButton from './AppButton';
import AppText from './AppText';
import Icons from './Icons';
import Screen from './Screen';

function PatientDoctor({
  image,
  name,
  phoneNumber,
  physicalAddress,
  visible = false,
  onPress,
  hospitalName,
}) {
  if (!visible) return null;
  const preview = {
    uri: '../assets/project/user-icon.png',
  };
  const uri = image;
  return (
    <ReactNativeModal isVisible={visible}>
      <Screen style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name='close-circle'
              size={25}
              color={colors.primary}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.section}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} {...{ preview, uri }} />
          </View>
          {name && (
            <View style={styles.pre}>
              <Icons
                name='verified-user'
                style={styles.info}
                backgroundColor={colors.lightGrey}
                size={30}
              />
              <AppText title='input' style={styles.text}>
                {name}
              </AppText>
            </View>
          )}
          {phoneNumber && (
            <View style={styles.pre}>
              <Icons
                name='phone-in-talk'
                style={styles.info}
                backgroundColor={colors.lightGrey}
                size={30}
              />
              <AppText title='input' style={styles.text}>
                {phoneNumber}
              </AppText>
            </View>
          )}
          {hospitalName && (
            <View style={styles.pre}>
              <Icons
                name='local-hospital'
                style={styles.info}
                backgroundColor={colors.lightGrey}
                size={30}
              />
              <AppText title='input' style={styles.text}>
                {hospitalName}
              </AppText>
            </View>
          )}
          {physicalAddress && (
            <View style={styles.pre}>
              <Icons
                name='location-on'
                style={styles.info}
                backgroundColor={colors.lightGrey}
                size={30}
              />
              <AppText title='input' style={styles.text}>
                {physicalAddress}
              </AppText>
            </View>
          )}
          <AppButton title='close' onPress={onPress} />
        </View>
      </Screen>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: -10,
    top: -20,
    zIndex: 1,
  },
  img: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  imgContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  pre: {
    alignItems: 'flex-start',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    height: '90%',
    width: '90%',
    padding: 10,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 12,
    color: colors.secondary,
    marginTop: 5,
    padding: 0,
    marginHorizontal: 10,
  },
});

export default PatientDoctor;
