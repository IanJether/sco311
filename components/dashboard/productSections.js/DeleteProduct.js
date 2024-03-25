
import ConfirmationBox from "@/components/common/ConfirmBox";

// import { db, storage } from "/firebase/fbconfig";
// import { deleteDoc, doc } from "firebase/firestore";
// import { deleteObject, ref } from "firebase/storage";
import { useContext, useState } from "react";
import { MyContext } from "@/state/context";
import { db } from "@/db/config";
import { deleteDoc, doc } from "firebase/firestore";



function DeleteProductComp({details}) {

    const [showConfirmation, setShowConfirmation] = useState(false);
    // const [id, setid] = useState(null)
    const { setGlobalLoading,setSectionOnDisplay } = useContext(MyContext)


    const handleCancel = () => {

        setShowConfirmation(false);
    }

    const handleDelete = () => {

        setShowConfirmation(true);

    }

    const deleteClick = () => {

        setGlobalLoading(true)

        // const storageref = ref(storage, details.imageURL)

        // deleteObject(storageref).then(() => {
        
            deleteDoc(doc(db, "sco311", details.id)).then((() => {
                // alert("deleted")
                setShowConfirmation(false);
                setSectionOnDisplay('Details')
                setGlobalLoading(false)
            }))

        // })


    }

   

  return (
    <div className='DeleteProductComp py-[20px]'>
        <p className="mb-[20px]">This action cannot be undone</p>
        <div className="w-[200px]"><button onClick={() => handleDelete()} className="h-[50px] bg-red-600 text-white w-full rounded-[4px]">Delete</button></div>
        {showConfirmation && (
                <ConfirmationBox
                    onConfirm={deleteClick}
                    onCancel={handleCancel}
                    message="Confirm Delete of this product ?"
                />
            )}
    </div>
  );
}

export default DeleteProductComp;