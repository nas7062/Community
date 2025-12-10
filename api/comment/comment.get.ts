import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Comment } from "@/types";
import { mapCommentDoc, buildCommentTree } from "./comment.mapper";

export async function getComments(docId: string): Promise<Comment[]> {
  const commentsRef = collection(db, "posts", docId, "comments");

  // 오래된 순(createdAt asc)으로 정렬
  const q = query(commentsRef, orderBy("createdAt", "asc"));
  const snap = await getDocs(q);

  const rawComments: Comment[] = snap.docs.map(mapCommentDoc);

  // 트리 구조로 변환
  const tree = buildCommentTree(rawComments);

  return tree;
}
