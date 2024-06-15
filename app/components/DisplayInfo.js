import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../config/colors';
import AppButton from './AppButton';
import AppText from './AppText';
import Icons from './Icons';
import Screen from './Screen';

const { width } = Dimensions.get('window');

function DisplayInfo({
  onPress,
  image,
  username,
  dob,
  gender,
  email,
  physicalAddress,
  hospital,
  phoneNumber,
  LogOutComponent,
  Idea,
  emergencyContact,
  family,
  allergies,
  employment,
  height,
  weight,
}) {
  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/project/ai.jpeg')}
        resizeMode='cover'
        style={styles.background}
        blurRadius={5}
      >
        {image && (
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Icons
                style={styles.icon}
                name='camera-alt'
                backgroundColor={colors.lightGrey}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.btn}>
            <Text style={styles.btnTitle}>edit profile</Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <Screen style={styles.section}>
        {username && (
          <View style={styles.pre}>
            <Icons
              name='verified-user'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              {username}
            </AppText>
          </View>
        )}
        {Idea && (
          <View style={styles.pre}>
            <Icons
              name='perm-identity'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              Idea : {Idea}
            </AppText>
          </View>
        )}
        {dob && (
          <View style={styles.pre}>
            <Icons
              name='verified-user'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              date of birth : {dob}
            </AppText>
          </View>
        )}
        {gender && (
          <View style={styles.pre}>
            <Icons
              name={gender === 'female' ? 'female' : 'male'}
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              sex : {gender}
            </AppText>
          </View>
        )}
        {height && (
          <View style={styles.pre}>
            <Icons
              name='height'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              height : {`${height}cm`}
            </AppText>
          </View>
        )}
        {weight && (
          <View style={styles.pre}>
            <Icons
              name='monitor-weight'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              weight : {weight}kg
            </AppText>
          </View>
        )}
        {email && (
          <View style={styles.pre}>
            <Icons
              name='email'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              email {email}
            </AppText>
          </View>
        )}
        {phoneNumber && (
          <View style={styles.pre}>
            <Icons
              name='phone-in-talk'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              contact {phoneNumber}
            </AppText>
          </View>
        )}
        {emergencyContact && (
          <View style={styles.pre}>
            <Icons
              name='contact-emergency'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              emergency contact :
            </AppText>
            {emergencyContact.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <AppText title='input' style={styles.text}>
                    {item.firstName} : {item.contact}
                  </AppText>
                </React.Fragment>
              );
            })}
          </View>
        )}
        {family && (
          <>
            <AppText title='input' style={[styles.textFam]}>
              family :
            </AppText>
            <View style={styles.Faminfo}>
              {family.map((item, index) => {
                return (
                  <View style={styles.Famtext} key={index}>
                    <Icons
                      name='contact-emergency'
                      // style={styles.info}
                      backgroundColor={colors.iconGray}
                      size={30}
                    />
                    <View style={styles.chlorine}>
                      <AppText title='input' style={styles.text}>
                        name : {item.fullName}
                      </AppText>
                      <AppText title='input' style={styles.text}>
                        idea : {item.idea}
                      </AppText>
                      <AppText title='input' style={styles.text}>
                        contact : {item.contact}
                      </AppText>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {allergies && (
          <View style={styles.pre}>
            <Icons
              name='sick'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              I"D : {allergies}
            </AppText>
          </View>
        )}
        <View style={styles.pre}>
          <Icons
            name='shopping-bag'
            style={styles.info}
            backgroundColor={colors.iconGray}
            size={30}
          />
          <AppText title='input' style={styles.text}>
            works at {hospital || employment}
          </AppText>
        </View>
        {physicalAddress && (
          <View style={styles.pre}>
            <Icons
              name='location-on'
              style={styles.info}
              backgroundColor={colors.iconGray}
              size={30}
            />
            <AppText title='input' style={styles.text}>
              Lives in {physicalAddress}
            </AppText>
          </View>
        )}
        {LogOutComponent}
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 200,
    marginBottom: 5,
    position: 'relative',
    width,
  },
  btn: {
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    bottom: 30,
    position: 'absolute',
    padding: 5,
    right: 10,
  },
  btnTitle: {
    color: colors.secondary,
    textTransform: 'capitalize',
  },
  container: {
    bottom: -20,
    position: 'absolute',
  },
  chlorine: {
    paddingLeft: 5,
  },
  Faminfo: {
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column-reverse',
    flexWrap: 'wrap',
    marginVertical: 2,
    padding: 5,
    overflow: 'hidden',
  },
  Famtext: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  icon: {
    bottom: 2,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
  info: {
    marginBottom: 0,
  },
  pre: {
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
    padding: 5,
    overflow: 'hidden',
  },
  section: {
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    color: colors.secondary,
    marginHorizontal: 10,
    textTransform: 'capitalize',
  },
  textFam: {
    color: colors.secondary,
    marginHorizontal: 10,
    textTransform: 'capitalize',
    fontSize: 20,
  },
});

export default DisplayInfo;
