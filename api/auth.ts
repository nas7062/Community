import { db } from "@/firebase";
import { UserProfile } from "@/types";
import { doc, getDoc } from "firebase/firestore";

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data() as UserProfile;

  return data;
}
