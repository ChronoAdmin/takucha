// FirebaseのFirestoreから必要な関数をインポート
import { doc, setDoc, getDoc } from "firebase/firestore"; 
// プロジェクト内で設定したFirebaseの設定をインポート
import { db } from "../firebase/client";

// ユーザープロフィールをデータベースに保存する関数
// userIdはユーザー識別のための一意のID、profileはユーザープロフィールのデータ
export async function setProfile(userId, profile) {
  try {
    // setDocを使ってFirestoreのデータベースにデータを保存
    // doc(db, "users", userId)で特定のドキュメントの参照を作成し、そのドキュメントにprofileを保存
    await setDoc(doc(db, "users", userId), profile);
  } catch (e) {
    // エラーハンドリング: 何らかの理由でデータ保存に失敗した場合、エラーメッセージを出力
    console.error("Error writing document: ", e);
  }
}

// データベースからユーザープロフィールを取得する関数
// userIdはユーザー識別のための一意のID
export async function getProfile(userId) {
  // データベースからデータを取得するためのドキュメントの参照を作成
  const docRef = doc(db, "users", userId);

  // getDocを使ってデータベースからデータを取得
  const docSnap = await getDoc(docRef);

  // ドキュメントが存在する場合、そのデータを返す
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // ドキュメントが存在しない場合、エラーメッセージを出力
    console.log("No such document!");
  }
}
