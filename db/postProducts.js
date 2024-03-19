

import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Assuming you're using Firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { compressImage } from "./imageCompressor";
import { db, storage } from "./config";


export const handlePostProduct = (file, name, price, category, description,setGlobalLoading, resetValues, setResetValues) => {

 
    if (file === "none" || name === "" || price === ""|| category === ""|| description === "" ) {

        alert("Kindly fill all necessary details");// change this to a toast message or something of the sort

    } else {
        
        setGlobalLoading(true)

        const fileName = name + '-' + category

        const colRef = collection(db, 'sco311')

        const imageRef = ref(storage, "sco311/" + fileName);

        compressImage(file).then((compressedFile) => {
            uploadBytes(imageRef, compressedFile).then(() => {
                return getDownloadURL(imageRef);
            }).then((url) => {
                return addDoc(colRef, {
                    imageURL: url,
                    name: name,
                    price: price,
                    category: category,
                    description: description,
                    createdAt: serverTimestamp(),
                });
            }).then(() => {
                setGlobalLoading(false)
                setResetValues(!resetValues)
            }).catch((error) => {
                console.log(error);
            });
        });
    }
};