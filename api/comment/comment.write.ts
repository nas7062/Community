// src/api/comment/comment.write.ts
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  increment,
  deleteDoc,
  query,
  getDocs,
  where,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Comment, CreateCommentDto, User } from "@/types";
import { getAuth } from "firebase/auth";

export async function CreateComment(body: CreateCommentDto): Promise<Comment> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  const user: User = {
    id: currentUser.uid,
    displayName:
      body.profile.displayName ??
      currentUser.displayName ??
      "알 수 없는 사용자",
    imageUri: body.profile.imageUri ?? currentUser.photoURL ?? "",
  };

  const numberId = Date.now();

  // posts/{docId}/comments 서브컬렉션에 댓글 추가
  const commentDocRef = await addDoc(
    collection(db, "posts", body.docId, "comments"),
    {
      id: numberId,
      content: body.content,
      createdAt: serverTimestamp(),
      user,
      isDeleted: false,
      parentId: body.parentId ?? null,
    }
  );

  const snap = await getDoc(commentDocRef);
  const data = snap.data();

  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  const newComment: Comment = {
    docId: commentDocRef.id,
    id: numberId,
    content: body.content,
    createdAt: createdAtString,
    user,
    isDeleted: false,
    parentId: body.parentId ?? null,
    replies: [],
  };

  // posts 문서에 들어갈 요약 정보
  const commentSummary = {
    id: numberId,
    content: body.content,
    createdAt: createdAtString,
    userId: user.id,
    userDisplayName: user.displayName,
    userImageUri: user.imageUri,
  };

  const postRef = doc(db, "posts", body.docId);
  await updateDoc(postRef, {
    commentCount: increment(1),
    comments: arrayUnion(commentSummary),
  });

  return newComment;
}

export async function deleteComment({
  postDocId,
  commentDocId,
  commentId,
}: {
  postDocId: string;
  commentDocId: string;
  commentId: number;
}): Promise<void> {
  const commentsRef = collection(db, "posts", postDocId, "comments");

  // 부모 댓글의 답글 조회
  const q = query(commentsRef, where("parentId", "==", commentId));
  const snap = await getDocs(q);

  // 답글 전부 삭제
  const repliesCount = snap.docs.length;
  for (const d of snap.docs) {
    await deleteDoc(doc(db, "posts", postDocId, "comments", d.id));
  }

  // 부모 댓글 삭제
  await deleteDoc(doc(db, "posts", postDocId, "comments", commentDocId));

  // 부모 + 대댓글 개수만큼 commentCount 감소
  const postRef = doc(db, "posts", postDocId);
  await updateDoc(postRef, {
    commentCount: increment(-(1 + repliesCount)),
  });

  // posts 문서의 comments 배열(commentSummary)도 정리할 거면,
  // 여기서 post 문서를 읽어서 필터 후 set/update 하는 로직을 추가해도 됨
}
