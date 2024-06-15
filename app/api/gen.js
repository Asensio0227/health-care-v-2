import {
  DocumentSnapshot,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../firebase';

export const Pagination = (afterDocs, arr) => {
  return afterDocs
    ? getDocs(
        query(
          collection(db, arr),
          orderBy('createdAt', 'desc'),
          startAfter(afterDocs),
          limit(20)
        )
      )
    : getDocs(
        query(collection(db, arr), orderBy('createdAt', 'desc'), limit(10))
      );
};

export function mapPatient(doc = DocumentSnapshot) {
  return {
    id: doc.id,
    Idea: doc.data().Idea,
    emergencyContact: doc.data().emergencyContact,
    allergies: doc.data().allergies,
    createdBy: doc.data().createdBy,
    dob: doc.data().dob,
    employment: doc.data().employment,
    family: doc.data().family,
    name: doc.data().name,
    phoneNumber: doc.data().phoneNumber,
    physicalAddress: doc.data().physicalAddress,
    sex: doc.data().sex,
    surname: doc.data().surname,
    createdAt: doc.data().createdAt,
    height: doc.data().height,
    weight: doc.data().weight,
  };
}
