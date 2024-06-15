import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { auth } from '../../firebase';
import DisplayInfo from '../components/DisplayInfo';
import Icons from '../components/Icons';
import ListPatient from '../components/ListPatient';
import colors from '../config/colors';
import { useGlobalContext } from '../context/context';
import useGetUser from '../hooks/useGetUser';

function ProfileScreen() {
  const { setUsers } = useGlobalContext();
  const user = useGetUser();
  const navigation = useNavigation();

  return (
    <>
      <DisplayInfo
        onPress={() => navigation.navigate('Edit', user)}
        image={user && user.photoURL}
        username={`${user && user.displayName}, ${user && user.surname}`}
        dob={user && user.dob}
        gender={user && user.sex}
        email={user && user.email}
        physicalAddress={`${user.location && user.location.city}, ${
          user.location && user.location?.country
        }`}
        hospital={user && user.hospitalName}
        phoneNumber={user && user.phoneNumber}
        LogOutComponent={
          <ListPatient
            title='log out'
            color='lightGrey'
            IconComponent={
              <Icons name='logout' backgroundColor={colors.logout} />
            }
            onPress={() => {
              setUsers(null);
              auth.signOut();
              ToastAndroid.showWithGravity(`logging Out!`, 3000, 0);
            }}
            style={styles.logout}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    color: colors.secondary,
    backgroundColor: colors.danger,
  },
  logout: {
    marginVertical: 10,
    borderRadius: 15,
  },
});

export default ProfileScreen;
