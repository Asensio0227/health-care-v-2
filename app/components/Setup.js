import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import Form from './Forms/AppForm';
import AppFormField from './Forms/AppFormField';
import FormImagePicker from './Forms/AppFormImagePicker';
import Submit from './Forms/AppSubmitButton';
import DatePicker from './Forms/DatePicker';
import ErrorMessage from './Forms/ErrorMessage';
import Screen from './Screen';

function Setup({
  isLoading,
  error,
  errors = 'Invalid credentials',
  initialValues,
  validateSchema,
  onSubmit,
  city,
  country,
  title,
}) {
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ScrollView>
        <Screen style={styles.container}>
          <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateSchema={validateSchema}
            title={title}
            style={styles.form}
          >
            <ErrorMessage
              error={city && country ? `Couldn't save changes` : errors}
              visible={error}
            />
            <FormImagePicker name='photoURL' photoUrl />
            <AppFormField
              name='displayName'
              placeholder='Your Name'
              icon='account'
            />
            <AppFormField
              name='surname'
              placeholder='Your surname'
              icon='account'
            />
            <AppFormField
              name='sex'
              placeholder='Your gender'
              icon='gender-male-female'
            />
            <AppFormField
              name='HRN'
              placeholder='hospital registration number'
              icon='registered-trademark'
              keyboardType='phone-pad'
            />
            <AppFormField
              name='hospitalName'
              placeholder='hospital name'
              icon='hospital-building'
            />
            <AppFormField
              name='phoneNumber'
              placeholder='Your phone number'
              icon='phone'
              keyboardType='phone-pad'
            />
            <DatePicker
              name='dob'
              placeholder='Your date of birth'
              autoCapitalize='none'
              icon='account'
            />
            <AppFormField
              name='location.city'
              placeholder={`${city ? city : 'your city'}`}
              icon='city'
              autoCapitalize='none'
            />
            <AppFormField
              name='location.country'
              placeholder={`${country ? country : 'your country'}`}
              icon='earth'
            />
            <Submit title='save' />
          </Form>
        </Screen>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  form: {
    padding: 10,
  },
});

export default Setup;
