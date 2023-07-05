"use client";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { useEffect, useState } from "react";

export interface QueryData {
  id: string;
  image?: string;
  title: string;
  description?: string;
  stack?: string[];
  video?: string;
}
export const useGetProjects = () => {
  const [projects, setProjects] = useState<QueryData[]>([]);
  const q = query(collection(db, "projects"));

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as QueryData;
      });
      setProjects(documents);
    });
    return () => unsub();
  }, []);

  return { projects };
};
export const useGetUIUX = () => {
  const [uiux, setUiux] = useState<QueryData[]>([]);
  const q = query(collection(db, "uiux"));

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as QueryData;
      });
      setUiux(documents);
    });
    return () => unsub();
  }, []);

  return { uiux };
};
export const useGetBlogPosts = () => {
  const [posts, setPosts] = useState<QueryData[]>([]);
  const q = query(collection(db, "blogs"));

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as QueryData;
      });
      setPosts(documents);
    });
    return () => unsub();
  }, []);

  return { posts };
};
