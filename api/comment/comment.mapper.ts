import { Comment } from "@/types";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// Firestore 문서 -> Comment 매핑
export function mapCommentDoc(d: QueryDocumentSnapshot<DocumentData>): Comment {
  const data = d.data() as any;

  const createdAtString =
    data.createdAt?.toDate?.().toISOString() ?? new Date().toISOString();

  return {
    docId: d.id,
    id: data.id,
    content: data.content,
    createdAt: createdAtString,
    user: data.user,
    isDeleted: data.isDeleted ?? false,
    parentId: data.parentId ?? null,
    replies: [], // 일단 비워두고 나중에 트리에서 채움
  };
}

// 평탄한 댓글 배열을 부모/자식 트리 구조로 변환
export function buildCommentTree(rawComments: Comment[]): Comment[] {
  const commentMap = new Map<number, Comment>();
  const rootComments: Comment[] = [];

  // 부모 댓글 먼저 map에 넣고 root 구성
  rawComments.forEach((comment) => {
    if (!comment.parentId) {
      const clone = { ...comment, replies: [] };
      commentMap.set(comment.id, clone);
      rootComments.push(clone);
    }
  });

  // 대댓글을 부모의 replies에 붙이기
  rawComments.forEach((c) => {
    if (c.parentId) {
      const parent = commentMap.get(c.parentId);
      if (parent) {
        parent.replies.push({ ...c, replies: [] });
      } else {
        // 부모가 없는 이상 데이터면 root로 넣어버림 (fallback)
        rootComments.push(c);
      }
    }
  });

  return rootComments;
}
