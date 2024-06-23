import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { getLastDocs } from '../api/patient';

function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = auth;

  const Pagination = (afterDocs) => {
    return afterDocs
      ? getDocs(
          query(
            collection(db, 'doctors'),
            where('uid', '!=', currentUser.uid),
            startAfter(afterDocs),
            limit(50)
          )
        )
      : getDocs(
          query(
            collection(db, 'doctors'),
            where('uid', '!=', currentUser.uid),
            limit(30)
          )
        );
  };

  const onEndReached = async () => {
    setIsLoading(true);
    try {
      const data = await Pagination(getLastDocs(contacts));
      setIsLoading(false);
      setContacts(contacts.concat(data.docs));

      if (!data) setIsError(true);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
      console.log(error);
    }
  };

  return { contacts, error, isError, onEndReached, isLoading };
}

export function mapDoc(doc = DocumentSnapshot) {
  return {
    id: doc.id,
    contactName: `${doc.data().displayName} ${doc.data().surname}`,
    email: doc.data().email,
    image: doc.data().photoURL,
    expoToken: doc.data()?.expoToken,
  };
}

export default useContacts;
