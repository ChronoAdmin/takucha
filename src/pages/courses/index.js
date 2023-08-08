import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/client";
import styles from "@/styles/courses/index.module.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(coursesCollection);
      const courseList = courseSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  return (
    <div className="pt-10">
      <div className={styles.wrap}>
        <h1>コース一覧</h1>
        <div className={styles.courses}>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <a href={`/courses/${course.id}`}>{course.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Courses;
