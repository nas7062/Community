import { Post } from "@/types";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function mapDocToPost(d: QueryDocumentSnapshot<DocumentData>): Post {
  const data = d.data() as any;

  const createdAt =
    data.createdAt?.toDate?.().toISOString?.() ?? data.createdAt ?? "";

  return {
    docId: d.id,
    id: data.id,
    userId: data.userId,
    title: data.title,
    description: data.description,
    createdAt,
    author: data.author,
    imageUris: data.imageUris ?? [],
    likes: data.likes ?? [],
    hasVote: data.hasVote ?? false,
    voteCount: data.voteCount ?? 0,
    commentCount: data.commentCount ?? 0,
    viewCount: data.viewCount ?? 0,
    votes: data.votes ?? [],
    comments: data.comments ?? [],
  };
}
