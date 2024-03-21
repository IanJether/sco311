


import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./config";


const getOrders = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "sco311-orders")
    const q = query(colRef, orderBy("createdAt", "desc"));
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


export default getOrders;