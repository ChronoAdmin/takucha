import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../../../firebase/client';
import { collection, doc, getDocs } from 'firebase/firestore';

const SectionPage = () => {
  const router = useRouter();
  const { courseId, sectionId } = router.query;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!courseId || !sectionId) return;

    const fetchQuestions = async () => {
      const sectionRef = doc(db, 'courses', courseId, 'sections', sectionId);
      const questionsCollection = collection(sectionRef, 'questions');
      const questionSnapshot = await getDocs(questionsCollection);
      const questionList = questionSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      setQuestions(questionList);
    };

    fetchQuestions();
  }, [courseId, sectionId]);

  return (
    <div className='pt-10'>
      <h1>問題一覧</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.questionText}</li>
        ))}
      </ul>
    </div>
  );
};

export default SectionPage;
