import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import * as Yup from 'yup';

import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Setup from '../components/Setup';
import { useGlobalContext } from '../context/context';
import usePushNotifications from '../hooks/usePushNotifications';
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

function LandingScreen() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUsers, users } = useGlobalContext();
  const { expoPushToken } = usePushNotifications();

  const handleSubmit = async (userInfo) => {
    setIsLoading(true);
    try {
      if (users.emailVerified) {
        const user = auth.currentUser;
        let photoURL;
        if (userInfo.photoURL) {
          const { url } = await uploadImage(
            userInfo.photoURL,
            `images/${user.uid}`,
            'doctorProfile'
          );
          photoURL = url;
        }

        const userData = {
          email: user.email,
          ...userInfo,
        };

        if (photoURL) userData.photoURL = photoURL;

        await Promise.all([
          updateProfile(user, userData),
          setDoc(doc(db, 'doctors', user.uid), {
            ...userData,
            uid: user.uid,
            expoToken: expoPushToken,
          }),
        ]);

        setIsLoading(false);
        setUsers(null);
        auth.signOut();
        ToastAndroid.showWithGravity(
          'Your account has been created successfully. Please login again!',
          3000,
          0
        );
      } else {
        setIsLoading(false);
        setUsers(null);
        auth.signOut();
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      {!users.emailVerified &&
        alert('Please check your email and verify your email!')}
      <Setup
        initialValues={{
          photoURL: '',
          displayName: '',
          surname: '',
          location: { country: '', city: '' },
          dob: '',
          phoneNumber: '',
          sex: '',
          HRN: '',
          hospitalName: '',
        }}
        onSubmit={handleSubmit}
        validateSchema={validateSchema}
        title='Finalizing Your Sign-up'
        isLoading={isLoading}
        error={error}
        // errors='Please verify your email '
      />
    </>
  );
}

export default LandingScreen;
