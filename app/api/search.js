import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export const searchPagination = async (idea) => {
  const qPatient = query(collection(db, 'patient'), where('Idea', '==', idea));

  return getDocs(qPatient);
};
