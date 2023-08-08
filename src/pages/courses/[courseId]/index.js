// pages/courses/[courseId].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../../../firebase/client";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import Link from "next/link";
import styles from "@/styles/courses/index.module.css";

const CoursePage = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!courseId) return; // courseIdが存在しない場合は処理を中止

    const fetchSections = async () => {
      const courseRef = doc(db, "courses", courseId);
      const sectionsCollection = collection(courseRef, "sections");
      const sectionSnapshot = await getDocs(sectionsCollection);
      const sectionList = sectionSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setSections(sectionList);
    };

    fetchSections();
  }, [courseId]);

  return (
    <div className="pt-10">
      <div className={styles.wrap}>
        <h1>セクション一覧</h1>
        <div className={styles.courses}>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <Link href={`/courses/${courseId}/${section.id}`}>
                  {section.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
