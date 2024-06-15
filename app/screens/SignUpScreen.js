import React, { useState } from 'react';
import { ScrollView, StyleSheet, ToastAndroid } from 'react-native';
import * as Yup from 'yup';

import { auth, signUp } from '../api/auth';
import ActivityIndicator from '../components/ActivityIndicator';
import Form from '../components/Forms/AppForm';
import FormField from '../components/Forms/AppFormField';
import SubmitButton from '../components/Forms/AppSubmitButton';
import ErrorMessage from '../components/Forms/ErrorMessage';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { useGlobalContext } from '../context/context';

const validateSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum'),
});
function SignUpScreen() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isPasswordShown, setUsers } = useGlobalContext();

  const handleSubmit = async (userInfo) => {
    setLoading(true);
    try {
      const { email, password } = userInfo;
      const result = await signUp(email, password);
      setLoading(false);

      setUsers(null);
      auth.signOut();
      ToastAndroid.showWithGravity('Email Verification sent!', 3000, 0);
      if (!result) setError(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validateSchema={validateSchema}
        >
          <ErrorMessage error='Invalid credentials.' visible={error} />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Email'
            icon='email'
            keyboardType='email-address'
            name='email'
            textContentType='emailAddress'
          />
          <FormField
            name='password'
            icon='lock'
            keyBoardType='email-address'
            textContent='password'
            autoCorrect={false}
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry={isPasswordShown}
            password
          />
          <SubmitButton title='submit' />
        </Form>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  input: {
    color: colors.medium,
    // backgroundColor: colors.medium,
  },
});

export default SignUpScreen;
