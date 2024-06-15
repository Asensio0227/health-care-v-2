import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/project/welcom.jpg')}
      resizeMode='cover'
      style={styles.background}
      blurRadius={5}
    >
      <View style={styles.container}>
        <AppText style={styles.text}>
          Wherever the art of medicine is loved, there is also a love of
          humanity, Only a life lived for others is a life.
        </AppText>
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          title='sign-in'
          onPress={() => navigation.navigate('Sign')}
        />
        <AppButton
          color='gold'
          title='sign-up'
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  btnContainer: {
    padding: 20,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    position: 'absolute',
    top: 70,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'capitalize',
    paddingVertical: 20,
    color: colors.gold,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
