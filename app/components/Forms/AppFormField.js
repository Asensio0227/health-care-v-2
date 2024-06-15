import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import colors from '../../config/colors';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

const AppFormField = ({ name, width, ...otherProp }) => {
  const { setFieldTouched, errors, setFieldValue, touched, values } =
    useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProp}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;

const styles = StyleSheet.create({});
