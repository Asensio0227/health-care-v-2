import { FieldArray, Formik } from 'formik';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import ActivityIndicator from './ActivityIndicator';
import AppButton from './AppButton';
import AppFormField from './Forms/AppFormField';
import Submit from './Forms/AppSubmitButton';
import DatePicker from './Forms/DatePicker';
import ErrorMessage from './Forms/ErrorMessage';
import Screen from './Screen';

function Mould({
  initialValues,
  onSubmit,
  validationSchema,
  isLoading,
  error,
  item,
}) {
  return (
    <Screen style={styles.section}>
      <ActivityIndicator visible={isLoading} />
      <ScrollView style={styles.container}>
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <>
                <ErrorMessage
                  error={
                    item
                      ? 'Failed to save changes'
                      : 'Failed to create a account'
                  }
                  visible={error}
                />
                <AppFormField name='name' placeholder='Name' icon='account' />
                <AppFormField
                  name='surname'
                  placeholder='Surname'
                  icon='account'
                />
                <AppFormField
                  name='physicalAddress'
                  placeholder='Physical Address'
                  icon='home'
                  multiline
                />
                <AppFormField
                  name='Idea'
                  placeholder='ID number '
                  icon='passport'
                />
                <AppFormField
                  name='sex'
                  placeholder='Your gender'
                  icon='gender-male-female'
                />
                <AppFormField
                  name='phoneNumber'
                  placeholder='Your phone number'
                  icon='phone'
                  keyboardType='phone-pad'
                />
                <AppFormField
                  name='height'
                  placeholder='Your height in centimetres'
                  icon='human-male-height'
                  keyboardType='phone-pad'
                />
                <AppFormField
                  name='weight'
                  placeholder='Your weight in kg'
                  icon='weight-kilogram'
                  keyboardType='phone-pad'
                />
                <DatePicker
                  name='dob'
                  placeholder='Your date of birth'
                  autoCapitalize='none'
                  icon='account'
                />
                <AppFormField
                  name='allergies'
                  placeholder='Allergies'
                  icon='allergy'
                />

                <FieldArray name='emergencyContact'>
                  {({ push, remove }) => (
                    <>
                      <Text
                        style={{
                          color: colors.secondary,
                          fontSize: 14,
                          textAlign: 'center',
                          textTransform: 'capitalize',
                        }}
                      >
                        Emergency Contact
                      </Text>
                      {values.emergencyContact.map((_, index) => (
                        <View key={index} style={styles.member}>
                          <AppFormField
                            name={`emergencyContact[${index}].firstName`}
                            placeholder='Emergency relative fullname'
                            icon='car-emergency'
                            trash
                            onPress={() => remove(index)}
                          />
                          <AppFormField
                            name={`emergencyContact[${index}].contact`}
                            placeholder='phone number'
                            icon='phone'
                            keyboardType='phone-pad'
                            trash
                            onPress={() => remove(index)}
                          />
                        </View>
                      ))}
                      <AppButton
                        title='add emergency contact'
                        onPress={() => push({ firstName: '', contact: '' })}
                      />
                    </>
                  )}
                </FieldArray>
                <FieldArray name='family'>
                  {({ push, remove }) => (
                    <>
                      <Text
                        style={{
                          color: colors.secondary,
                          fontSize: 14,
                          textAlign: 'center',
                          textTransform: 'capitalize',
                        }}
                      >
                        family / children
                      </Text>
                      {values.family.map((_, index) => (
                        <View key={index} style={styles.member}>
                          <AppFormField
                            name={`family[${index}].fullName`}
                            placeholder='full name'
                            icon='family-tree'
                            trash
                            onPress={() => remove(index)}
                          />
                          <AppFormField
                            name={`family[${index}].idea`}
                            placeholder='ID number'
                            icon='family-tree'
                            trash
                            onPress={() => remove(index)}
                          />
                          <AppFormField
                            name={`family[${index}].contact`}
                            placeholder='phone number'
                            icon='phone'
                            keyboardType='phone-pad'
                            trash
                            onPress={() => remove(index)}
                          />
                        </View>
                      ))}
                      <AppButton
                        title='add family member'
                        onPress={() =>
                          push({ fullName: '', idea: '', contact: '' })
                        }
                      />
                    </>
                  )}
                </FieldArray>
                <AppFormField
                  name='employment'
                  placeholder='Place of work'
                  icon='table-network'
                />
                <Submit title='save patient' />
              </>
            )}
          </Formik>
        </>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  section: {
    margtinBottom: 20,
  },
  text: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 20,
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
});

export default Mould;
