import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import AppText from '../AppText';
import ImageInput from '../ImageInput';
import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

function FormImagePicker({ photoUrl, name, title }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const removeFile = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      {title && <AppText style={styles.container}>{title}</AppText>}
      {photoUrl ? (
        <>
          <ImageInput
            imageUri={imageUris}
            onChangeImage={(uri) => setFieldValue(name, uri)}
          />
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
      ) : (
        <>
          <ImageInputList
            imageUris={imageUris}
            onAddImage={handleAdd}
            onRemoveImage={removeFile}
          />
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    textTransform: 'capitalize',
    color: colors.secondary,
  },
});

export default FormImagePicker;
