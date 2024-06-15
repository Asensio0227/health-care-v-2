import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import ListPatient from './ListPatient';
import PatientDoctor from './PatientDoctor';
import Screen from './Screen';
import ViewImage from './ViewImage';

function MedicalCard(props) {
  const {
    createdAt,
    anesthesiologyReport,
    bloodType,
    diagnosticReport,
    discharge,
    doctorOrder,
    insured,
    laboratoryReport,
    surgery,
    organDonor,
    pathology,
    patientDoctor,
    physicalEx,
    prescription,
    progressReport,
    xRay,
    vacc,
    infected,
    chronic,
    isInsured,
    isOperation,
    isLaboratory,
    isDiagnosed,
    isScanned,
    admitted,
    pregnancy,
    isPregnant,
  } = props;
  const date = moment(createdAt.toDate()).format('MMM Do YY');
  // const day = moment().startOf(date).fromNow();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  return (
    <Screen style={styles.container}>
      <View style={styles.pre}>
        <AppText title='input' style={{ textTransform: 'capitalize' }}>
          Appointment was on :
        </AppText>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.pre}>
        <AppText title='input' style={{ textTransform: 'capitalize' }}>
          Vaccination Status :
        </AppText>
        <Text style={styles.text}>
          {vacc ? 'vaccinated' : 'not vaccinated'}
        </Text>
      </View>
      {isPregnant && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            Patient is :
          </AppText>
          <Text style={styles.text}>
            {pregnancy < 10
              ? `on week 0${pregnancy} of pregnant`
              : `${pregnancy} weeks pregnant`}
          </Text>
        </View>
      )}
      <View style={styles.pre}>
        <AppText title='input' style={{ textTransform: 'capitalize' }}>
          the patient is :
        </AppText>
        <Text style={styles.text}>
          {admitted ? 'admitted' : 'not admitted'}
        </Text>
      </View>
      <>
        {infected && (
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            Chronic diseases :
          </AppText>
        )}
        {infected &&
          chronic.map((item, index) => (
            <View style={styles.pre} key={index}>
              <View style={styles.navCenter}>
                <Text style={styles.text}>{item.title} : </Text>
                <Text style={styles.textInfo}>{item.status}</Text>
              </View>
            </View>
          ))}
      </>
      {prescription && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            prescription :
          </AppText>
          <Text style={styles.text}>{prescription}</Text>
        </View>
      )}
      {bloodType && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            bloodType :
          </AppText>
          <Text style={styles.text}>{bloodType}</Text>
        </View>
      )}
      {physicalEx && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            physical Examination :{' '}
          </AppText>
          <Text style={styles.text}>{physicalEx}</Text>
        </View>
      )}
      {pathology && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            pathology :
          </AppText>
          <Text style={styles.text}>{pathology}</Text>
        </View>
      )}
      {organDonor && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            organDonor :
          </AppText>
          <Text style={styles.text}>{organDonor ? 'yes' : 'N/A'}</Text>
        </View>
      )}
      {progressReport && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            progress Report :
          </AppText>
          <Text style={styles.text}>
            {progressReport ? progressReport : 'N/A'}
          </Text>
        </View>
      )}
      {doctorOrder && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            doctor's Order :
          </AppText>
          <Text style={styles.text}>{doctorOrder}</Text>
        </View>
      )}
      {discharge && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            discharge :
          </AppText>
          <Text style={styles.text}>{discharge ? discharge : 'N/A'}</Text>
        </View>
      )}
      {anesthesiologyReport && (
        <View style={styles.pre}>
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            anesthesiologyReport :
          </AppText>
          <Text style={styles.text}>
            {anesthesiologyReport ? anesthesiologyReport : 'N/A'}
          </Text>
        </View>
      )}
      <>
        {isDiagnosed && (
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            diagnostic Report :
          </AppText>
        )}
        {isDiagnosed &&
          diagnosticReport.map((item, index) => (
            <View style={styles.pre} key={index}>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>name : </Text>
                <Text style={styles.text}>
                  {item.title ? item.title : 'N/A'}
                </Text>
              </View>
              <View>
                <Text style={styles.textInfo}>result : </Text>
                <Text style={styles.text}>
                  {item.result ? item.result : 'N/A'}
                </Text>
              </View>
            </View>
          ))}
      </>
      <>
        {isInsured && (
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            Insurance info :
          </AppText>
        )}
        {isInsured &&
          insured.map((item, index) => (
            <View style={styles.pre} key={index}>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>insurance name : </Text>
                <Text style={styles.text}>
                  {item.brokerName ? item.brokerName : 'N/A'}
                </Text>
              </View>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>contact info : </Text>
                <Text style={styles.text}>
                  {item.insurancePhone ? item.insurancePhone : 'N/A'}
                </Text>
              </View>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>policy name : </Text>
                <Text style={styles.text}>
                  {item.policy ? item.policy : 'N/A'}
                </Text>
              </View>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>policy number : </Text>
                <Text style={styles.text}>
                  {item.policyNumber ? item.policyNumber : 'N/A'}
                </Text>
              </View>
            </View>
          ))}
      </>
      <>
        {isLaboratory && <AppText title='input'>laboratory Report : </AppText>}
        {isLaboratory &&
          laboratoryReport.map((item, index) => (
            <View style={styles.pre} key={index}>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>procedure name : </Text>
                <Text style={styles.text}>
                  {item.title ? item.title : 'N/A'}
                </Text>
              </View>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>procedure result : </Text>
                <Text style={styles.text}>
                  {item.result ? item.result : 'N/A'}
                </Text>
              </View>
              <View>
                <Text style={styles.textInfo}>procedure method : </Text>
                <Text style={styles.text}>
                  {item.method ? item.method : 'N/A'}
                </Text>
              </View>
            </View>
          ))}
      </>
      <>
        {isOperation && (
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            surgical Procedures :
          </AppText>
        )}
        {isOperation &&
          surgery.map((item, index) => (
            <View style={styles.pre} key={index}>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>surgery name : </Text>
                <Text style={styles.text}>{item.name ? item.name : 'N/A'}</Text>
              </View>
              <View style={styles.navCenter}>
                <Text style={styles.textInfo}>surgery date : </Text>
                <Text style={styles.text}>{item.date ? item.date : 'N/A'}</Text>
              </View>
              <View>
                <Text style={styles.textInfo}>surgery description : </Text>
                <Text style={styles.text}>
                  {item.description ? item.description : 'N/A'}
                </Text>
              </View>
            </View>
          ))}
      </>
      <>
        {isScanned && (
          <AppText title='input' style={{ textTransform: 'capitalize' }}>
            Scan or X-rays done :
          </AppText>
        )}
        {isScanned &&
          xRay.map((item, index) => {
            return <ViewImage key={index} url={item} />;
          })}
      </>
      <AppText title='input' style={{ textTransform: 'capitalize' }}>
        Patient's Doctor :
      </AppText>
      <ListPatient
        title={patientDoctor.displayName}
        subTitle={patientDoctor.surname}
        image={patientDoctor.photoURL}
        number={patientDoctor.phoneNumber}
        color='darkGrey'
        onPress={() => setShowModal(true)}
      />
      <PatientDoctor
        name={`${patientDoctor.displayName} ${patientDoctor.surname}`}
        image={patientDoctor.photoURL}
        onPress={() => setShowModal(false)}
        phoneNumber={patientDoctor.phoneNumber}
        hospitalName={patientDoctor?.hospitalName}
        physicalAddress={`${
          patientDoctor.location && patientDoctor.location.city
        }, ${patientDoctor.location && patientDoctor.location.country}`}
        visible={showModal}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowOpacity: 1,
    backgroundColor: colors.darkGrey,
    marginTop: 20,
    padding: 10,
    borderRadius: 25,
  },
  imgContainer: {
    flexDirection: 'row',
    height: 100,
    width: 100,
    padding: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  pre: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    textTransform: 'capitalize',
    padding: 5,
  },
  navCenter: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInfo: {
    color: colors.secondary,
  },
  text: {
    marginLeft: 0,
    color: colors.secondary,
    marginLeft: 15,
    alignSelf: 'flex-end',
  },
});

export default MedicalCard;
