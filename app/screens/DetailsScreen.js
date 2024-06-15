import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { nanoid } from 'nanoid';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { getLastDocs, mapDocs, onPagination } from '../api/patient';
import Loader from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import HeaderView from '../components/HeaderView';
import ListSeperator from '../components/ListSeperator';
import MedicalCard from '../components/MedicalCard';
import Screen from '../components/Screen';
import colors from '../config/colors';

const randomId = nanoid();

function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const patient = route.params;
  const patientId = patient ? patient.id : randomId();
  const [appointment, setAppointment] = useState([]);
  const [lastCheck, setLastCheck] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const onEndReached = async () => {
    setIsLoading(true);
    try {
      if (!lastCheck) {
        const data = await onPagination(getLastDocs(appointment), patientId);
        setIsLoading(false);
        setAppointment(appointment.concat(data.docs));
        data.docs.length === 0 ? setLastCheck(true) : setLastCheck(false);
      }
    } catch (error) {
      setLastCheck(false);
      console.log(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await onPagination(getLastDocs(appointment), patientId);
      setRefreshing(false);
      setAppointment(appointment.concat(data.docs));
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      onEndReached();
    }, [])
  );

  return (
    <>
      <HeaderView
        title='update record'
        subTitle={`${patient.name} ${patient.surname} `}
        onPress={() => navigation.navigate('Info', patient)}
        onLongPress={() =>
          navigation.navigate('UpdateInfo', { patient, appointment })
        }
      />
      <Loader visible={isloading} />
      <Screen style={styles.container}>
        {appointment.length > 0 ? (
          <FlatList
            data={appointment.map(mapDocs)}
            ItemSeparatorComponent={ListSeperator}
            keyExtractor={(appointment) => appointment.id}
            renderItem={({ item }) => (
              <MedicalCard
                createdAt={item.createdAt}
                anesthesiologyReport={item.anesthesiologyReport}
                bloodType={item.bloodType}
                diagnosticReport={item.diagnosticReport}
                discharge={item.discharge}
                doctorOrder={item.doctorOrder}
                insured={item.insured}
                laboratoryReport={item.laboratoryReport}
                surgery={item.operation}
                organDonor={item.organDonor}
                pathology={item.pathology}
                patientDoctor={item.patientDoctor}
                physicalEx={item.physicalEx}
                prescription={item.prescription}
                progressReport={item.progressReport}
                xRay={item.xRay}
                vacc={item.vacc}
                infected={item.infected}
                chronic={item.chronic}
                isInsured={item.isInsured}
                isOperation={item.isOperation}
                isLaboratory={item.isLaboratory}
                isDiagnosed={item.isDiagnosed}
                isScanned={item.isScanned}
                admitted={item.admitted}
                pregnancy={item.pregnancy}
                isPregnant={item.isPregnant}
              />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={() => onEndReached()}
            scrollEventThrottle={150}
            onEndReachedThreshold={0}
            ListEmptyComponent={() =>
              !lastCheck && (
                <ActivityIndicator size='large' color={colors.primary} />
              )
            }
          />
        ) : (
          <View style={styles.length}>
            <AppText style={styles.text}>
              Sorry! we don't have patient's medical history
            </AppText>
            <AppButton
              title='add record'
              onPress={() =>
                navigation.navigate('UpdateInfo', { patient, appointment })
              }
            />
          </View>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.white,
    padding: 5,
  },
  container: {
    padding: 5,
  },
  img: { height: '100%', width: '100%' },
  length: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  navbar: {
    backgroundColor: colors.white,
    padding: 5,
  },
  navbarCenter: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  navbarTitle: {
    color: colors.secondary,
    marginBottom: 0,
    textTransform: 'capitalize',
  },
  text: {
    color: colors.primary,
  },
});

export default DetailsScreen;
