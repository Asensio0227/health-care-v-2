import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import * as Yup from 'yup';
import { db } from '../../firebase';
import Mould from '../components/Mould';
import useGetUser from '../hooks/useGetUser';

const validateSchema = Yup.object().shape({
  name: Yup.string().label('Name').required(),
  surname: Yup.string().label('Surname').required(),
  Idea: Yup.string().required().min(9).label('National Identity Number'),
  sex: Yup.string().label('sex').required().nullable(),
  weight: Yup.number().required(),
  height: Yup.number().required(),
  dob: Yup.date()
    .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
    .required('Required')
    .nullable(),
  phoneNumber: Yup.string()
    .matches(
      /(?:(?<internationCode>\+[1-9]{1,4})[ -])?\(?(?<areacode>\d{2,3})\)?[ -]?(\d{3})[ -]?(\d{4})/,
      'Invalid phone number'
    )
    .required('Phone number is required!'),
  physicalAddress: Yup.string().required().nullable(),
  emergencyContact: Yup.array()
    .required('Emergency contact is required')
    .nullable(),
  allergies: Yup.string().required().nullable(),
  family: Yup.array(),
});

function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const user = useGetUser();
  const pQuery = collection(db, 'patient');

  const handleSubmit = async (patientInfo) => {
    setIsLoading(true);
    try {
      const createdBy = {
        uid: user?.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        hospital: user.hospitalName,
        surname: user.surname,
      };
      const data = {
        createdBy,
        createdAt: serverTimestamp(),
        ...patientInfo,
      };

      await addDoc(pQuery, data);
      setIsLoading(false);
      ToastAndroid.showWithGravity(
        'Your patient has been added successfully.',
        3000,
        0
      );
      navigation.navigate('Patient');
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <Mould
      initialValues={{
        name: '',
        surname: '',
        height: '',
        Idea: '',
        phoneNumber: '',
        physicalAddress: '',
        emergencyContact: [{ firstName: '', contact: '' }],
        family: [{ fullName: '', idea: '', contact: '' }],
        employment: '',
        allergies: '',
        dob: '',
        sex: '',
        weight: '',
      }}
      validationSchema={validateSchema}
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
}

export default Create;
