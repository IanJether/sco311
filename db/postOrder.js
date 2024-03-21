import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const handlePostOrder = (name, phone, delivery, amount, items, setGlobalLoading, router) => {

    setGlobalLoading(true)

    const colRef = collection(db, 'sco311-orders')


    addDoc(colRef, {
        name: name,
        phone: phone,
        delivery: delivery,
        amount: amount,
        items: items,
        createdAt: serverTimestamp(),
    }).then(() => {
        setGlobalLoading(false)
        router.push('/')
    }).catch((error) => {
        console.log(error);
    });


}

