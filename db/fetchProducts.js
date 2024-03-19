

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./config";


const getData = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "sco311")
    const q = query(colRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (docsSnap) => {
      let data = [];
      docsSnap.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setIsLoading(false);
      setData(data);
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);

  return { isLoading, data };
};


export default getData;