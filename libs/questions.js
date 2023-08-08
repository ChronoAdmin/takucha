// questions.js
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase/client";

// コースの追加
export async function addCourse(courseData) {
  try {
    const courseRef = doc(collection(db, 'courses'));
    await setDoc(courseRef, courseData);
  } catch (e) {
    console.error("Error adding course: ", e);
  }
}

// セクションの追加
export async function addSection(courseId, sectionData) {
  try {
    const sectionRef = doc(collection(db, `courses/${courseId}/sections`));
    await setDoc(sectionRef, sectionData);
  } catch (e) {
    console.error("Error adding section: ", e);
  }
}

// 問題の追加
export async function addQuestion(courseId, sectionId, questionData) {
  try {
    const questionRef = doc(collection(db, `courses/${courseId}/sections/${sectionId}/questions`));
    await setDoc(questionRef, questionData);
  } catch (e) {
    console.error("Error adding question: ", e);
  }
}
