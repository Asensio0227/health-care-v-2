import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../../config/colors';
import AppText from '../AppText';
import EyeInput from '../EyeInput';

function CheckboxInput({ name, title }) {
  const { setFieldValue, values } = useFormikContext();
  const isChecked = values[name];

  return (
    <View style={[styles.checkboxContainer]}>
      <EyeInput
        name={isChecked ? 'checkbox' : 'square-outline'}
        onPress={() => setFieldValue(name, !isChecked)}
        style={[styles.check]}
        checkbox
        color={isChecked ? 'secondary' : 'primary'}
      />
      <AppText
        style={[
          styles.text,
          { color: isChecked ? colors.secondary : colors.primary },
        ]}
        title='input'
      >
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 10,
    marginVertical: 5,
  },
  text: {
    textTransform: 'capitalize',
    marginBottom: 0,
    paddingLeft: 5,
  },
});

export default CheckboxInput;
