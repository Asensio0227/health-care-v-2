import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { signIn } from '../api/auth';
import ActivityIndicator from '../components/ActivityIndicator';
import Form from '../components/Forms/AppForm';
import AppFormField from '../components/Forms/AppFormField';
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
function SignScreen() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isPasswordShown } = useGlobalContext();

  const handleSubmit = async (userInfo) => {
    setIsLoading(true);
    try {
      const { email, password } = userInfo;
      const result = await signIn(email, password);
      setIsLoading(false);

      if (!result) setError(true);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <ActivityIndicator visible={isLoading} />
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
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
          />
          <AppFormField
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
    marginTop: 50,
  },
  input: {
    color: colors.medium,
    // backgroundColor: colors.medium,
  },
});

export default SignScreen;
