import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import * as Yup from 'yup';
import { db } from '../../firebase';
import Setup from '../components/Setup';
import { uploadImage } from '../utils/storage';

const validateSchema = Yup.object().shape({
  displayName: Yup.string().required().nullable(),
  surname: Yup.string().required().nullable(),
  HRN: Yup.string().min(13).required(),
  photoURL: Yup.string().required().nullable(),
  phoneNumber: Yup.string()
    .matches(
      /(?:(?<internationCode>\+[1-9]{1,4})[ -])?\(?(?<areacode>\d{2,3})\)?[ -]?(\d{3})[ -]?(\d{4})/,
      'Invalid phone number'
    )
    .required('Phone number is required!'),
  location: Yup.object().shape({
    country: Yup.string()
      .default(null)
      .test((value) => value === null || value)
      .nullable(),
    city: Yup.string()
      .default(null)
      .test((value) => value === null || value)
      .nullable(),
  }),
  sex: Yup.string().label('sex').required().nullable(),
  hospitalName: Yup.string().label('hospitalName').required().nullable(),
  dob: Yup.date()
    .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
    .required('Required')
    .nullable(),
});

function EditScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params;
  const qUser = doc(db, 'doctors', user.uid);
  const country = user.location && user.location.country;
  const city = user.location && user.location.city;
  const location = { contry: country || '', city: city || '' };

  const handleSubmit = async (userInfo) => {
    setIsLoading(true);
    try {
      let photoURL;
      if (userInfo.photoURL) {
        const { url } = await uploadImage(
          userInfo.photoURL,
          `images/${user.uid}`,
          'doctorProfile'
        );
        photoURL = url;
      }
      userInfo.photoURL = photoURL;
      const result = await updateDoc(qUser, userInfo);
      setIsLoading(false);
      ToastAndroid.showWithGravity('Saving changes', 3000, 0);
      navigation.goBack();

      if (!result) {
        setIsLoading(false);
        setError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <Setup
      initialValues={{
        photoURL: user.photoURL || '',
        displayName: user.displayName || '',
        surname: user.surname || '',
        location,
        dob: user.dob || '',
        phoneNumber: user.phoneNumber || '',
        sex: user.sex || '',
        HRN: user.HRN || '',
        hospitalName: user.hospitalName || '',
      }}
      onSubmit={handleSubmit}
      validateSchema={validateSchema}
      city={city}
      country={country}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default EditScreen;
