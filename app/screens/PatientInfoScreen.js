import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import DisplayInfo from '../components/DisplayInfo';
import ListPatient from '../components/ListPatient';
import PatientDoctor from '../components/PatientDoctor';
import colors from '../config/colors';

function PatientInfoScreen() {
  const route = useRoute();
  const patient = route.params;
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const {
    Idea,
    allergies,
    createdBy: { name, phoneNumber, photoURL, uid, hospitalName, surname },
    id,
    name: title,
    phoneNumber: phone,
    physicalAddress,
    sex: gender,
    surname: lastName,
    dob,
    employment,
    family,
    emergencyContact,
    height,
    weight,
  } = patient;
  return (
    <>
      <DisplayInfo
        onPress={() => navigation.navigate('updateInfo', patient)}
        // image={user && user.photoURL}
        username={`${title}, ${lastName}`}
        dob={dob}
        gender={gender}
        physicalAddress={physicalAddress}
        phoneNumber={phone}
        emergencyContact={emergencyContact}
        family={family}
        employment={employment}
        allergies={allergies}
        Idea={Idea}
        height={height}
        weight={weight}
        LogOutComponent={
          <>
            <AppText title='input' style={styles.text}>
              created By :
            </AppText>
            <ListPatient
              image={photoURL}
              title={name}
              onPress={() => setShowModal(true)}
            />
          </>
        }
      />
      <PatientDoctor
        name={`${name} ${surname}`}
        image={photoURL}
        onPress={() => setShowModal(false)}
        phoneNumber={phoneNumber}
        hospitalName={hospitalName}
        visible={showModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: colors.secondary,
    padding: 10,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
});

export default PatientInfoScreen;
