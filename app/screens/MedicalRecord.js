import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FieldArray, Formik } from 'formik';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import * as Yup from 'yup';
import { db } from '../../firebase';
import { getLastUpdate, mapDocs } from '../api/patient';
import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import AppFormField from '../components/Forms/AppFormField';
import FormImagePicker from '../components/Forms/AppFormImagePicker';
import Submit from '../components/Forms/AppSubmitButton';
import CheckboxInput from '../components/Forms/CheckboxInput';
import Screen from '../components/Screen';
import colors from '../config/colors';
import useGetUser from '../hooks/useGetUser';
import { uploadImage } from '../utils/storage';

const randomId = nanoid();

const validateSchema = Yup.object().shape({
  insured: Yup.array(),
  isInsured: Yup.boolean(),
  organDonor: Yup.boolean(),
  isOperation: Yup.boolean(),
  operation: Yup.array(),
  laboratoryReport: Yup.array(),
  isLaboratory: Yup.boolean(),
  xRay: Yup.array(),
  allergy: Yup.string(),
  isScanned: Yup.boolean(),
  bloodGroup: Yup.string().required('Please provide bloold type'),
  isAdmitted: Yup.boolean(),
  discharge: Yup.string(),
  pathology: Yup.string(),
  isDiagnosed: Yup.boolean(),
  diagnosticResult: Yup.array(),
  doctorOrders: Yup.string().required(`Please provide doctor's orders`),
  progressReport: Yup.string(),
  physicalEx: Yup.string().required(`Please provide physical report`),
  anesthesiologyReport: Yup.string(),
  prescription: Yup.string(),
  chronic: Yup.array(),
  isInfected: Yup.boolean(),
  isVaccinated: Yup.boolean(),
  isPregnant: Yup.boolean(),
  pregnancy: Yup.number(),
});

function MedicalRecord() {
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { patient, appointment } = route.params;
  const user = useGetUser();
  const patientId = patient && patient.id;
  const patientCheckRef = collection(db, 'patient', patientId, 'appointment');
  const navigation = useNavigation();
  const item = appointment?.map(mapDocs);
  const arr = getLastUpdate(
    item.map((item) => ({
      vacc: item.vacc,
      isInsured: item.isInsured,
      bloodType: item.bloodType,
      insured: item.insured,
      organDonor: item.organDonor,
      infected: item.infected,
      chronic: item.chronic,
      isPregnant: item.isPregnant,
      pregnancy: item.pregnancy,
    }))
  );

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const {
        phoneNumber,
        displayName,
        photoURL,
        surname,
        location,
        hospitalName,
      } = user;
      const patientDoctor = {
        phoneNumber,
        displayName,
        photoURL,
        surname,
        hospitalName,
        location,
      };
      let uris = [];

      for (let i = 0; i < data.xRay.length; i++) {
        const file = data.xRay[i];
        const { url, fileName } = await uploadImage(
          file,
          `images/${user.uid}`,
          'patientPictures'
        );
        uris.push(url);
      }
      data.xRay = uris;
      const patientInfo = {
        patientDoctor,
        createdAt: serverTimestamp(),
        ...data,
      };

      await addDoc(patientCheckRef, patientInfo);
      setLoading(false);
      navigation.goBack('Details');
    } catch (error) {
      console.log(error);
    }
  };

  const brokerName = arr?.insured[0].brokerName;
  const policy = arr?.insured[0].policy;
  const policyNumber = arr?.insured[0].policyNumber;
  const insurancePhone = arr?.insured[0].insurancePhone;

  const insured = [
    {
      brokerName: brokerName || '',
      policy: policy || '',
      policyNumber: policyNumber || '',
      insurancePhone: insurancePhone || '',
    },
  ];

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <ScrollView>
          <Formik
            initialValues={{
              organDonor: arr?.organDonor || false,
              isInsured: arr?.isInsured || false,
              isVaccinated: arr?.vacc || false,
              isInfected: false,
              isOperation: false,
              isLaboratory: false,
              isDiagnosed: false,
              isScanned: false,
              chronic: [{ title: '', status: '' }],
              insured,
              operation: [{ name: '', date: '', description: '' }],
              laboratoryReport: [{ title: '', result: '', method: '' }],
              xRay: [], // images
              bloodGroup: arr?.bloodType || '',
              discharge: '',
              pathology: '',
              diagnosticResult: [{ title: '', result: '' }],
              doctorOrders: '',
              progressReport: '',
              physicalEx: '',
              anesthesiologyReport: '',
              prescription: '',
              allergy: '',
              isPregnant: arr.pregnancy >= 38 ? false : arr.isPregnant,
              pregnancy: '',
            }}
            validationSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Screen>
                <CheckboxInput title='Vaccination status' name='isVaccinated' />
                <CheckboxInput title=' chronic diseases' name='isInfected' />
                {values.isInfected && (
                  <FieldArray name='chronic'>
                    {({ push, remove }) => (
                      <>
                        {values.chronic.map((_, index) => (
                          <View key={index}>
                            <AppFormField
                              name={`chronic.[${index}].title`}
                              placeholder=' name of the disease'
                              icon='hospital'
                              multiline
                              trash
                              onPress={() => remove(index)}
                            />
                            <AppFormField
                              name={`chronic[${index}].status`}
                              placeholder='status e.g positive or negative '
                              icon='hospital'
                              multiline
                              trash
                              onPress={() => remove(index)}
                            />
                          </View>
                        ))}
                        <AppButton
                          title='add '
                          onPress={() => push({ title: '', status: '' })}
                        />
                      </>
                    )}
                  </FieldArray>
                )}
                {patient?.sex.trim() === 'Female' && (
                  <CheckboxInput title=' Pregnant' name='isPregnant' />
                )}
                {values.isPregnant && (
                  <AppFormField
                    name='pregnancy'
                    placeholder={`${
                      arr?.pregnancy ? arr.pregnancy : 'Your pregnancy in weeks'
                    } `}
                    icon='view-week-outline'
                    keyboardType='phone-pad'
                  />
                )}
                <AppFormField
                  name='physicalEx'
                  placeholder=' physical examination'
                  multiline
                  icon='check'
                />
                <AppFormField
                  name='allergy'
                  placeholder='Allergies'
                  icon='allergy'
                />
                <AppFormField
                  name='bloodGroup'
                  placeholder='Blood Type'
                  icon='blood-bag'
                />
                <AppFormField
                  name='doctorOrders'
                  placeholder={`doctor's suggestion`}
                  multiline
                  icon='doctor'
                />
                <AppFormField
                  name='prescription'
                  placeholder='prescription'
                  multiline
                  icon='prescription'
                />
                <AppFormField
                  name='progressReport'
                  multiline
                  placeholder={`patient's progress report`}
                  icon='progress-star'
                />
                <CheckboxInput title='Organ Donor' name='organDonor' />
                <CheckboxInput title='Insured' name='isInsured' />
                {values.isInsured && (
                  <FieldArray name='insured'>
                    {() => (
                      <>
                        {!insured[0].brokerName
                          ? values.insured.map((_, index) => (
                              <View key={index}>
                                <AppFormField
                                  name={`insured[${index}].brokerName`}
                                  placeholder='insurance name'
                                  icon='security'
                                  multiline
                                />
                                <AppFormField
                                  name={`insured[${index}].insurancePhone`}
                                  placeholder='insurance contact'
                                  icon='security'
                                  multiline
                                />
                                <AppFormField
                                  name={`insured[${index}].policy`}
                                  placeholder='insurance policy'
                                  icon='security'
                                  multiline
                                />
                                <AppFormField
                                  name={`insured[${index}].policyNumber`}
                                  placeholder='insurance policy number'
                                  icon='security'
                                  multiline
                                />
                              </View>
                            ))
                          : null}
                      </>
                    )}
                  </FieldArray>
                )}
                <CheckboxInput title='Scan / X-ray' name='isScanned' />
                {values.isScanned && (
                  <>
                    <FormImagePicker
                      name='xRay'
                      title='upload scan or x-ray images'
                    />
                  </>
                )}
                <CheckboxInput title='surgical Procedures' name='isOperation' />
                {values.isOperation && (
                  <FieldArray name='operation'>
                    {() => (
                      <>
                        {values.operation.map((_, index) => (
                          <View key={index}>
                            <AppFormField
                              name={`operation[${index}].name`}
                              placeholder='surgical name'
                              icon='hospital'
                              multiline
                            />
                            <AppFormField
                              name={`operation[${index}].date`}
                              placeholder=' date of surgery'
                              multiline
                              icon='hospital'
                            />
                            <AppFormField
                              name={`operation[${index}].description`}
                              placeholder='Description'
                              multiline
                              numberOfLines={5}
                            />
                          </View>
                        ))}
                      </>
                    )}
                  </FieldArray>
                )}
                <CheckboxInput title='Laboratory Reports' name='isLaboratory' />
                {values.isLaboratory && (
                  <FieldArray name='laboratoryReport'>
                    {() => (
                      <>
                        {values.laboratoryReport.map((_, index) => (
                          <View key={index}>
                            <AppFormField
                              name={`laboratoryReport[${index}].title`}
                              placeholder='Laboratory title report'
                              multiline
                              icon='hospital'
                            />
                            <AppFormField
                              name={`laboratoryReport[${index}].result`}
                              placeholder='Laboratory result'
                              multiline
                              icon='hospital'
                            />
                            <AppFormField
                              name={`laboratoryReport[${index}].method`}
                              placeholder='Method'
                              maxLength={255}
                              multiline
                              numberOfLines={5}
                            />
                          </View>
                        ))}
                      </>
                    )}
                  </FieldArray>
                )}
                <CheckboxInput
                  title='Test done on Patient'
                  name='isDiagnosed'
                />
                {values.isDiagnosed && (
                  <FieldArray name='diagnosticResult'>
                    {() => (
                      <>
                        {values.diagnosticResult.map((_, index) => (
                          <View key={index}>
                            <AppFormField
                              name={`diagnosticResult[${index}].title`}
                              multiline
                              placeholder='Name'
                              icon='hospital'
                            />
                            <AppFormField
                              name={`diagnosticResult[${index}].result`}
                              placeholder=' result'
                              multiline
                              icon='hospital'
                            />
                          </View>
                        ))}
                      </>
                    )}
                  </FieldArray>
                )}
                <AppFormField
                  name='pathology'
                  icon='stackpath'
                  multiline
                  placeholder='Pathology'
                />
                <AppFormField
                  name='anesthesiologyReport'
                  placeholder='anesthesia Report'
                  icon='sort-reverse-variant'
                  multiline
                />
                <CheckboxInput
                  name='isAdmitted'
                  title='Check here if patient admittted'
                  multiline
                />
                {values.isAdmitted && (
                  <AppFormField
                    name='discharge'
                    icon='hospital-box-outline'
                    placeholder='Disacharge / admission summary'
                    maxLength={255}
                    multiline
                    numberOfLines={5}
                  />
                )}

                <Submit title='send' style={{ marginTop: 30 }} />
              </Screen>
            )}
          </Formik>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 25,
  },
});

export default MedicalRecord;
