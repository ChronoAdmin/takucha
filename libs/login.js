// libs/login.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const login = async (email, password) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default login;
