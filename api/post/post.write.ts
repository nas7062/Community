import { db } from "@/firebase";
import { CreatePostDto, Post, UserProfile } from "@/types";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export async function CreatePost(body: CreatePostDto): Promise<Post> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  const author: UserProfile = {
    id: currentUser.uid,
    displayName: body.profile.displayName ?? currentUser.displayName,
    imageUri: body.profile.imageUri ?? "",
  };

  const NumberId = Date.now();

  const docRef = await addDoc(collection(db, "posts"), {
    id: NumberId,
    userId: currentUser.uid,
    title: body.title,
    description: body.description,
    createdAt: serverTimestamp(),
    author,
    imageUris: body.imageUris ?? [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 0,
    votes: [],
    comments: [],
  });

  const snap = await getDoc(docRef);
  const data = snap.data();

  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  return {
    docId: docRef.id,
    id: NumberId,
    userId: currentUser.uid,
    title: body.title,
    description: body.description,
    createdAt: createdAtString,
    author,
    imageUris: body.imageUris ?? [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 0,
    votes: [],
    comments: [],
  };
}

export async function updatePost({
  docId,
  body,
}: {
  docId: string;
  body: CreatePostDto;
}): Promise<Post> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  const author: UserProfile = {
    id: currentUser.uid,
    displayName: body.profile.displayName ?? currentUser.displayName,
    imageUri: currentUser.photoURL ?? "",
  };

  const ref = doc(db, "posts", docId);
  await updateDoc(ref, {
    title: body.title,
    description: body.description,
    imageUris: body.imageUris ?? [],
    author,
    updatedAt: serverTimestamp(),
  });

  const snap = await getDoc(ref);
  const data = snap.data();

  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  return {
    docId: snap.id,
    id: data?.id,
    userId: currentUser.uid,
    title: body.title,
    description: body.description,
    createdAt: createdAtString,
    author,
    imageUris: body.imageUris ?? [],
    likes: data?.likes ?? [],
    hasVote: data?.hasVote ?? false,
    voteCount: data?.voteCount ?? 0,
    commentCount: data?.commentCount ?? 0,
    viewCount: data?.viewCount ?? 0,
    votes: data?.votes ?? [],
    comments: data?.comments ?? [],
  };
}

export async function deletePost(docId: string): Promise<void> {
  await deleteDoc(doc(db, "posts", docId));
}

export async function toggleLike(docId: string, userId: string) {
  const postRef = doc(db, "posts", docId);

  const toggle = async (isLiked: boolean) => {
    if (isLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      });
    }
  };

  return { toggle };
}
