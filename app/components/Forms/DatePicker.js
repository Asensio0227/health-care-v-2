import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { formatDate } from '../../utils/formatDate';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function DatePicker({ name, ...otherprops }) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
        // setFieldValue(name, currentDate.toDateString());
        setFieldValue(name, formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <View>
      {show && (
        <>
          <DateTimePicker
            mode='date'
            value={date}
            display='spinner'
            onChange={onChange}
            // maximumDate={new Date('2006-1-1')}
            minimumDate={new Date('1900-1-1')}
            {...otherprops}
          />
        </>
      )}
      {!show && (
        <Pressable onPress={toggleDatePicker}>
          <AppTextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text) => setFieldValue(name, text)}
            value={values[name]}
            {...otherprops}
            editable={false}
          />
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </Pressable>
      )}
    </View>
  );
}

export default DatePicker;
