import { Field, FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppText from '../AppText';
import AppTextInput from '../AppTextInput';

function AppFieldArray({ name }) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();
  const family = values[name];
  console.log(typeof family);

  return (
    <View key={index}>
      <AppFormField
        name={`family[${index}].firstName`}
        placeholder='Name and lastName'
      />

      <TouchableWithoutFeedback onPress={() => remove(index)}>
        <MaterialCommunityIcons
          name='trash-can'
          size={25}
          color={colors.secondary}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFieldArray;
