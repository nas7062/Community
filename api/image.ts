import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function useUploadImage() {
  const uploadImage = async (uri: string) => {
    // uri -> Blob 변환
    const response = await fetch(uri);
    const blob = await response.blob();

    // 업로드할 때마다 새 ref 생성
    const storageRef = ref(storage, `files/${uuidv4()}`);

    // 업로드
    const snapshot = await uploadBytes(storageRef, blob);

    // 다운로드 URL 가져오기
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  };

  return uploadImage;
}
