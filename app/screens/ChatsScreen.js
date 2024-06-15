import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../firebase';
import ContactFloatingIcon from '../components/Contact/ContactFloatingIcon';
import ContactItem from '../components/Contact/ContactItem';
import colors from '../config/colors';
import { useGlobalContext } from '../context/context';
import useContacts from '../hooks/useContacts';

function ChatsScreen() {
  const currentUser = auth.currentUser;
  const { rooms, setRooms, setUnFilteredRooms } = useGlobalContext();
  const { contacts } = useContacts();

  const chatsQuery = query(
    collection(db, 'rooms'),
    where('participantsArray', 'array-contains', currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnFilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <>
      {rooms.length === 0 ? (
        <View style={styles.roomCenter}>
          <Text style={styles.roomTitle}>No chats yet.</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {rooms.map((room) => (
            <ContactItem
              type='chat'
              description={room.lastMessage.text}
              style={{ marginTop: 7 }}
              key={room.id}
              room={room}
              time={room.lastMessage.createdAt}
              user={getUserB(room.userB, contacts)}
            />
          ))}
        </View>
      )}
      <ContactFloatingIcon />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
  },
  roomCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  roomTitle: { color: colors.room, fontSize: 20, fontWeight: 'bold' },
});

export default ChatsScreen;
