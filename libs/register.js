// lib/register.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/client';

const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user; // ユーザーの情報を返す
    } catch (err) {
        throw err; // エラーを投げる
    }
};

export default register;
