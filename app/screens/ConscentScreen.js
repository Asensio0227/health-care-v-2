import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import * as Yup from 'yup';
import { db } from '../../firebase';
import Mould from '../components/Mould';

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
  employment: Yup.string(),
});

function ConscentScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const patient = route.params;
  const qPatient = doc(db, 'patient', patient.id);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await updateDoc(qPatient, data);
      setIsLoading(false);
      if (!result) {
        setIsLoading(false);
        setError(true);
      }
      ToastAndroid.showWithGravity('Saving changes', 3000, 0);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <Mould
      initialValues={{
        name: patient.name || '',
        surname: patient.surname || '',
        height: `${patient.height}` || '',
        Idea: patient.Idea || '',
        phoneNumber: patient.phoneNumber || '',
        physicalAddress: patient.physicalAddress || '',
        emergencyContact: [{ firstName: '', contact: '' }],
        family: [{ fullName: '', idea: '', contact: '' }],
        employment: patient.employment || '',
        allergies: patient.allergies || '',
        dob: patient.dob || '',
        sex: patient.sex || '',
        weight: `${patient.weight}` || '',
      }}
      validationSchema={validateSchema}
      onSubmit={handleSubmit}
      item
      error={error}
      isLoading={isLoading}
    />
  );
}

export default ConscentScreen;
