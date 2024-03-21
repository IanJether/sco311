

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from "./config";



const getUser = (itemId) => { 

    const [isLoading, setIsLoading] = useState(true);
    const [userdata, setUser] = useState(null); // Single blog item, thus null as default
  
    useEffect(() => {
      if (!itemId) {
        setIsLoading(false);
        return;
      }
  
      const docRef = doc(db, 'users', itemId);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setUser({ ...docSnap.data(), id: docSnap.id });
          setIsLoading(false);
        } else {
          console.log("No such document!");
          setIsLoading(false);
        }
      });
  
      return () => unsubscribe(); 
    }, [itemId]); 
  
    return { isLoading, userdata };
  };
  
  export default getUser;