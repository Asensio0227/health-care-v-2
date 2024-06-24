import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { auth, db } from '../../firebase';
import { useGlobalContext } from '../context/context';

function useRoom() {
  const currentUser = auth.currentUser;
  const { rooms, setRooms, setUnFilteredRooms } = useGlobalContext();
  if (currentUser) {
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
  } else null;

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return { rooms, getUserB };
}

export default useRoom;
