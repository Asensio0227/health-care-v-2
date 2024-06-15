import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../config/colors';
import Text from '../AppText';
function Form({
  initialValues,
  onSubmit,
  validateSchema,
  children,
  style,
  title,
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.tagline}>{title || 'Welcome to HealthCare'}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
        style={styles.form}
      >
        {() => <>{children}</>}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 25,
  },
  form: {
    overflow: 'scroll',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: colors.secondary,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
  },
});

export default Form;
