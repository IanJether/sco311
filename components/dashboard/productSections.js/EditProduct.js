



import LoaderComp from "@/components/common/Loader";
import { db } from "@/db/config";
import { MyContext } from "@/state/context";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";

import { useContext, useEffect, useState } from "react";
import ConfirmationBox from "@/components/common/ConfirmBox";



function EditProduct({ data }) {


    const [showConfirmation, setShowConfirmation] = useState(false);
    const { sectionOnDisplay, setSectionOnDisplay, setGlobalLoading } = useContext(MyContext)



    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")




    const router = useRouter()


    useEffect(() => {

        if (data.length !== 0) {
            setName(data.name)
            setPrice(data.price)
            setCategory(data.category)
            setDescription(data.description)
        }
    }, [data])


    const handleCancel = () => {

        setShowConfirmation(false);
    }

    const handleUploadClick = () => {

        setShowConfirmation(true);

    }

    const handleUpload = () => {

        setGlobalLoading(true)

        const docRef = doc(db, "sco311", data.id);

        updateDoc(docRef, {
            name: name,
            price: price,
            category: category,
            description: description,
        }).then(() => {
           
           setSectionOnDisplay("Details")
           setGlobalLoading(false)
        })

        setShowConfirmation(false);

    }

    return (
        <div className='EditProduct'>

            {!data ?
                <div>
                    <LoaderComp />
                </div>
                :
                <div className="editcompdetails w-full flex flex-col gap-[20px] py-[40px] px-[5px] ">

                    <div><input value={name} onChange={(e) => setName(e.target.value)} className="inputadd" type="text" placeholder="Title" /></div>
                    <div><input value={price} onChange={(e) => setPrice(e.target.value)} className="inputadd" type="number" placeholder="Price" /></div>

                    

                    <div>
                        <label className="labellogin" htmlFor="">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} name="size" id="" className="inputadd mt-[4px] text-[15px]">
                            <option value="">Select Category</option>
                            <option value="women">Women</option>
                            <option value="men">Men</option>
                            <option value="children">Children</option>
                        </select>
                    </div>
                    <div>
                        <label className="labellogin" htmlFor="">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border w-full h-[120px] rounded-[3px] mt-[5px] rr p-[10px]  outline-none focus:border-primary" />
                    </div>

                    <div className="w-[150px]">
                        <button onClick={handleUploadClick} className="button2 ">Update</button>
                    </div>


                </div>
            }

            {showConfirmation && (
                <ConfirmationBox
                    onConfirm={handleUpload}
                    onCancel={handleCancel}
                    message="Confirm Update of this product ?"
                />
            )}

        </div>
    );
}

export default EditProduct;