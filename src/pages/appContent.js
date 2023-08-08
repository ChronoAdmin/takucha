import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/client";

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");

  // コースの読み込み
  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(coursesCollection);
      setCourses(courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchCourses();
  }, []);

  const handleAddData = async () => {
    let courseId = selectedCourse;
    
    // 新しいコースの場合、追加
    if (!courses.find(course => course.id === selectedCourse) && newCourse) {
      const courseRef = collection(db, 'courses');
      const newCourseRef = await addDoc(courseRef, { name: newCourse });
      courseId = newCourseRef.id;
    }

    const sectionRef = collection(db, `courses/${courseId}/sections`);
    const newSectionRef = await addDoc(sectionRef, { name: sectionName });

    const questionRef = collection(db, `courses/${courseId}/sections/${newSectionRef.id}/questions`);
    await addDoc(questionRef, { questionText, answer });

    window.location.reload();

  };

  return (
    <div className='pt-10'>
      <div>
        <label>コース選択</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">コースを選択...</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>新しいコース名</label>
        <input type="text" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} />
      </div>
      <div>
        <label>セクション名</label>
        <input type="text" value={sectionName} onChange={(e) => setSectionName(e.target.value)} />
      </div>
      <div>
        <label>問題文</label>
        <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
      </div>
      <div>
        <label>答え</label>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </div>
      <button onClick={handleAddData}>データ追加</button>
    </div>
  );
};

export default AdminPanel;
