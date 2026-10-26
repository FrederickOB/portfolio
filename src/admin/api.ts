import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore/lite";
import { app, db } from "@/config/firebase";
import { sortByOrder } from "@/content/selectors";
import { COLLECTIONS } from "@/content/types";

export const auth = getAuth(app);

export type CollectionName = keyof typeof COLLECTIONS;

/** A Firestore document with its id, as the admin forms edit it. */
export type Entry = { id: string; order?: number } & Record<string, unknown>;

export function watchUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function signIn() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOutOfAdmin() {
  return signOut(auth);
}

/** Only admins may read config/admins (see firestore.rules), so being able to read it is the check. */
export async function checkAdmin() {
  try {
    await getDoc(doc(db, "config", "admins"));
    return true;
  } catch {
    return false;
  }
}

export async function loadEntries(name: CollectionName): Promise<Entry[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS[name]));
  return sortByOrder(snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as Entry));
}

/** Firestore rejects undefined fields, and empty ones are better left out. */
function withoutEmpty(data: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== "" && !(typeof value === "number" && Number.isNaN(value)),
    ),
  );
}

/** Creates or replaces a document, so fields cleared in the form are removed. */
export async function saveEntry(name: CollectionName, { id, ...data }: Entry) {
  await setDoc(doc(db, COLLECTIONS[name], id), withoutEmpty(data));
}

export async function deleteEntry(name: CollectionName, id: string) {
  await deleteDoc(doc(db, COLLECTIONS[name], id));
}

/** Uploads an image to Cloudinary, signed by /api/sign-upload, and returns its URL. */
export async function uploadImage(file: File): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Sign in first.");

  const signing = await fetch("/api/sign-upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${await user.getIdToken()}` },
  });
  const signed = await signing.json().catch(() => ({}));
  if (!signing.ok) throw new Error(signed.error ?? "Couldn't get permission to upload.");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signed.apiKey);
  form.append("timestamp", String(signed.timestamp));
  form.append("folder", signed.folder);
  form.append("signature", signed.signature);

  const upload = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const result = await upload.json().catch(() => ({}));
  if (!upload.ok) throw new Error(result.error?.message ?? "The upload failed.");
  return result.secure_url as string;
}
