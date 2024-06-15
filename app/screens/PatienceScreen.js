import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Pagination, mapPatient } from '../api/gen';
import { getLastDocs } from '../api/patient';
import ListPatient from '../components/ListPatient';
import ListSeperator from '../components/ListSeperator';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { useGlobalContext } from '../context/context';
import useGetUser from '../hooks/useGetUser';

function PatienceScreen() {
  const user = useGetUser();
  const [isloading, setIsloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { patient, setPatient } = useGlobalContext();
  const navigation = useNavigation();
  const [lastCheck, setLastCheck] = useState(false);

  const onEndReached = async () => {
    setIsloading(true);
    try {
      if (!lastCheck) {
        const data = await Pagination(getLastDocs(patient), 'patient');
        setIsloading(false);
        setPatient(patient.concat(data.docs));
        data.docs.length === 0 ? setLastCheck(true) : setLastCheck(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await Pagination(getLastDocs(patient), 'patient');
      setRefreshing(false);
      setPatient(patient.concat(data.docs));
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };

  return (
    <>
      <FlatList
        data={patient.map(mapPatient)}
        ItemSeparatorComponent={ListSeperator}
        keyExtractor={(patient) => patient.id}
        renderItem={({ item }) => (
          <ListPatient
            patient={item.name.charAt(0).toUpperCase()}
            title={item.name}
            subTitle={item.surname}
            onPress={() => navigation.navigate('Details', item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={() => onEndReached()}
        scrollEventThrottle={150}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() =>
          !lastCheck && (
            <Screen style={styles.container}>
              <ActivityIndicator size='large' color={colors.primary} />
            </Screen>
          )
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  loader: {
    bottom: 5,
    height: 100,
    position: 'absolute',
    right: 0,
    width: 100,
  },
  text: {
    fontSize: 20,
  },
});

export default PatienceScreen;
