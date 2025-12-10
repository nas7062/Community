import { POST_PAGE_SIZE } from "@/constants";
import { db } from "@/firebase";
import { Post } from "@/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { mapDocToPost } from "./post.mapper";

export type GetPostsResult = {
  posts: Post[];
  nextCursor?: string;
};

export async function getInfinitePosts({
  pageParam,
}: {
  pageParam?: string;
}): Promise<GetPostsResult> {
  const baseRef = collection(db, "posts");
  let q;

  if (!pageParam) {
    q = query(baseRef, orderBy("createdAt", "desc"), limit(POST_PAGE_SIZE));
  } else {
    const cursorDoc = await getDoc(doc(db, "posts", pageParam));

    if (!cursorDoc.exists()) {
      return { posts: [], nextCursor: undefined };
    }

    q = query(
      baseRef,
      orderBy("createdAt", "desc"),
      startAfter(cursorDoc),
      limit(POST_PAGE_SIZE)
    );
  }

  const snap = await getDocs(q);
  const posts: Post[] = snap.docs.map(mapDocToPost);

  const lastDoc = snap.docs[snap.docs.length - 1];
  const nextCursor = lastDoc ? lastDoc.id : undefined;

  return { posts, nextCursor };
}

export async function getPosts(): Promise<Post[]> {
  const baseRef = collection(db, "posts");
  const q = query(baseRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map(mapDocToPost);
}

export async function getInfiniteMyPosts({
  pageParam,
  userId
}: {
  pageParam?: string;
  userId:string
}): Promise<GetPostsResult> {
 

  const baseRef = collection(db, "posts");
  let q;

  if (!pageParam) {
    q = query(baseRef, where("userId", "==", userId),  limit(POST_PAGE_SIZE));
  } else {
    const cursorDoc = await getDoc(doc(db,"posts", pageParam));
    
    if (!cursorDoc.exists()) {
      return { posts: [], nextCursor: undefined };
    }
    
    q = query(
      baseRef,
      where("userId", "==", userId),
      startAfter(cursorDoc),
      limit(POST_PAGE_SIZE)
    );
  }

  const snap = await getDocs(q);
  const posts: Post[] = snap.docs.map(mapDocToPost);
  
  const lastDoc = snap.docs[snap.docs.length - 1];
  const nextCursor = lastDoc ? lastDoc.id : undefined;

  return { posts, nextCursor };
}


export async function getInfiniteLikePosts({
  pageParam,
  userId
}: {
  pageParam?: string;
  userId:string
}): Promise<GetPostsResult> {
 

  const baseRef = collection(db, "posts");
  let q;

  if (!pageParam) {
    q = query(baseRef, where("likes", "array-contains", userId),  limit(POST_PAGE_SIZE));
  } else {
    const cursorDoc = await getDoc(doc(db,"posts", pageParam));
    
    if (!cursorDoc.exists()) {
      return { posts: [], nextCursor: undefined };
    }
    
    q = query(
      baseRef,
      where("likes", "array-contains", userId),
      startAfter(cursorDoc),
      limit(POST_PAGE_SIZE)
    );
  }

  const snap = await getDocs(q);
  const posts: Post[] = snap.docs.map(mapDocToPost);
  
  const lastDoc = snap.docs[snap.docs.length - 1];
  const nextCursor = lastDoc ? lastDoc.id : undefined;

  return { posts, nextCursor };
}


export async function getPostById(docId: string): Promise<Post | null> {
  const ref = doc(db, "posts", docId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return mapDocToPost(snap as any);
}
