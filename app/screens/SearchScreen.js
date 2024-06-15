import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import { searchPagination } from '../api/search';
import ActivityIndicator from '../components/ActivityIndicator';
import AppText from '../components/AppText';
import Form from '../components/Forms/AppForm';
import ErrorMessage from '../components/Forms/ErrorMessage';
import SearchField from '../components/Forms/SearchField';
import ListPatient from '../components/ListPatient';
import ListSeperator from '../components/ListSeperator';
import colors from '../config/colors';

const validateSchema = Yup.object().shape({
  seacrh: Yup.string().required('enter person idea'),
});

function SearchScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sequel, setSequel] = useState([]);
  const navigation = useNavigation();

  const handleSubmit = async (idea) => {
    setLoading(true);
    try {
      const { search } = idea;
      const data = await searchPagination(search);
      setLoading(false);
      setSequel(data.docs.map((item) => item.data()));

      if (!data) setError(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Form
        initialValues={{ seacrh: '' }}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
        title='Search for Patient'
      >
        <ErrorMessage error='No such ID' visible={error} />
        <SearchField name='search' icon='account-search' search />
      </Form>
      <View style={styles.container}>
        <View style={styles.result}>
          <AppText style={styles.text}>result</AppText>
          <AppText style={styles.title}>{sequel.length}</AppText>
        </View>
        <FlatList
          data={sequel}
          ItemSeparatorComponent={ListSeperator}
          keyExtractor={(_, id) => id}
          renderItem={({ item }) => (
            <ListPatient
              patient={item.name?.charAt(0).toUpperCase()}
              title={item.name}
              subTitle={item.surname}
              onPress={() => navigation.navigate('Details', item)}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  result: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textDecorationLine: 'underline',
    color: colors.secondary,
    textTransform: 'capitalize',
  },
  title: {
    color: colors.secondary,
    textDecorationStyle: 'dotted',
  },
});

export default SearchScreen;
