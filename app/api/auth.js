import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';

export function signUp(email, password) {
  const result = createUserWithEmailAndPassword(auth, email, password).then(
    async (userCred) => await sendEmailVerification(userCred.user)
  );
  return result;
}
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
