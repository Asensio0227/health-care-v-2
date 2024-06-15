import { useFormikContext } from 'formik';
import React from 'react';
import Button from '../AppButton';

function Submit({ style, title }) {
  const { handleSubmit } = useFormikContext();
  return <Button title={title} onPress={handleSubmit} style={style} />;
}

export default Submit;
