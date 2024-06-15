import {
  DocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../firebase';

export const onPagination = async (afterDocs, id) => {
  const pQuery = query(
    collection(db, 'patient', id, 'appointment'),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  return afterDocs
    ? getDocs(
        query(
          collection(db, 'patient', id, 'appointment'),
          orderBy('createdAt', 'desc'),
          startAfter(afterDocs),
          limit(10)
        )
      )
    : getDocs(pQuery);
};

export const getLastDocs = (arr = []) => arr.slice(-1)[0];

export const getLastUpdate = (arr = []) => arr.slice(0)[0];

export function mapDocs(doc = DocumentSnapshot) {
  return {
    id: doc.id,
    createdAt: doc.data().createdAt,
    anesthesiologyReport: doc.data().anesthesiologyReport,
    bloodType: doc.data().bloodGroup,
    diagnosticReport: doc.data().diagnosticResult,
    discharge: doc.data().discharge,
    doctorOrder: doc.data().doctorOrders,
    insured: doc.data().insured,
    laboratoryReport: doc.data().laboratoryReport,
    operation: doc.data().operation,
    organDonor: doc.data().organDonor,
    pathology: doc.data().pathology,
    patientDoctor: doc.data().patientDoctor,
    physicalEx: doc.data().physicalEx,
    prescription: doc.data().prescription,
    progressReport: doc.data().progressReport,
    xRay: doc.data().xRay,
    vacc: doc.data().isVaccinated,
    infected: doc.data().isInfected,
    chronic: doc.data().chronic,
    isInsured: doc.data().isInsured,
    isOperation: doc.data().isOperation,
    isLaboratory: doc.data().isLaboratory,
    isDiagnosed: doc.data().isDiagnosed,
    isScanned: doc.data().isScanned,
    admitted: doc.data().isAdmitted,
    isPregnant: doc.data().isPregnant,
    pregnancy: doc.data().pregnancy,
  };
}
