import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { useGlobalContext } from '../../context/context';
import ContactItem from './ContactItem';

function ContactPreview({ contact, image }) {
  const { unFilteredRooms, rooms } = useGlobalContext();
  const [user, setUser] = useState(contact);
  const email = contact.email;

  useEffect(() => {
    const q = query(
      collection(db, 'doctors'),
      where('email', '==', contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ContactItem
      style={{ marginTop: 7 }}
      type='contacts'
      user={user}
      image={image}
      room={unFilteredRooms.find((room) =>
        room.participantsArray.includes(email)
      )}
    />
  );
}

export default ContactPreview;
