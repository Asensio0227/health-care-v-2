import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import ContactPreview from '../components/Contact/ContactPreview';
import useContacts from '../hooks/useContacts';

function ContactsScreen() {
  const { contacts, error, isError, onEndReached, isLoading } = useContacts();
  const route = useRoute();
  const image = route.params && route.params;

  useFocusEffect(
    useCallback(() => {
      onEndReached();
    }, [])
  );

  return (
    <>
      {isError ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          style={{ flex: 1, padding: 10 }}
          data={contacts}
          keyExtractor={(_, i) => i}
          renderItem={({ item }) => (
            <ContactPreview
              contact={item.data()}
              image={image || item.data().photoURL}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ContactsScreen;
