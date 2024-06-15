import { useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { db } from '../../firebase';
import { useGlobalContext } from '../context/context';

function useGetUser() {
  const { users } = useGlobalContext();
  const [user, setUser] = useState(null);
  const userId = users.uid;
  const qUser = doc(db, 'doctors', users.uid);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const user = await getDoc(qUser);
        setUser(user.data());
      })();
    }, [userId])
  );

  return user;
}

export default useGetUser;
