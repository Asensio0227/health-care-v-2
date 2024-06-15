import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function SearchField({ name, ...otherProps }) {
  const { setTouched, setFieldValue, values, errors, touched, handleSubmit } =
    useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        onLongPress={handleSubmit}
        search
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
  },
  container: {
    position: 'relative',
  },
});

export default SearchField;
