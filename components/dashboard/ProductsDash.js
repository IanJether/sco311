'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainDash from "./common/MainDash";
import { faCheck, faPlus, faPlusCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { productList } from "@/data/productList";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/state/context";
import DetailsProduct from "./productSections.js/DetailsProduct";
import EditProduct from "./productSections.js/EditProduct";
import DeleteProductComp from "./productSections.js/DeleteProduct";
import Image from "next/image";
import { handlePostProduct } from "@/db/postProducts";
import getData from "@/db/fetchProducts";
import LoaderComp from "../common/Loader";


function ProductsDash() {

    const { isLoading, data } = getData();


    const [activeIndex, setActiveIndex] = useState(0)
    const [addProduct, setAddProduct] = useState(false)

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [imgprev, setImgprev] = useState("");
    const [file, setFile] = useState("none");


    const { sectionOnDisplay, setSectionOnDisplay, setGlobalLoading, resetValues, setResetValues } = useContext(MyContext)

    const sectionNav = [
        {
            title: "Details",
            link: ""
        },
        {
            title: "Edit",
            link: ""
        },
        {
            title: "Delete",
            link: ""
        },

    ]

    const fileChange = (event) => {

        const inp = document.getElementById("imageinput");

        const [file] = inp.files

        setFile(event.target.files[0])
        setImgprev(URL.createObjectURL(file))

    }

    const activedata = data.find((items, index) => index == activeIndex)

    const handleAddProduct = () => {
        setAddProduct(false)
        handlePostProduct(file, name, price, category, description, setGlobalLoading, resetValues, setResetValues)
    }

    useEffect(() => {

        setName("")
        setPrice("")
        setCategory("")
        setDescription("")
        setFile('none')
        setImgprev('')

    }, [resetValues])

    return (
        <MainDash>
            <div className=' lg:h-full flex flex-col lg:flex-row gap-[20px]'>

                <div className="lg:w-[30%] shrink-0">

                    <div className="h-[190px] rr shadow-md bg-white p-[20px] flex flex-col justify-between">
                        <span onClick={() => setAddProduct(true)} className="text-[27px] self-end text-primary cursor-pointer"><FontAwesomeIcon icon={faPlusCircle} /></span>
                        <div>
                            <h3 className="capitalize font-semibold text-[20px]">All Products </h3>
                            <input className="border border-neutral-400 outline-none focus:border-primary rr h-[45px] w-full p-[10px] text-[12px] mt-[10px]" type="text" placeholder="Search Products" />
                        </div>

                    </div>

                    <div className="h-[170px] lg:h-[59vh] mt-[30px] no-scrollbar overflow-scroll">
                        {isLoading ?
                            <LoaderComp />

                            :
                            <div>
                                {data.map((items, index) => {


                                    return (
                                        <div onClick={() => { setActiveIndex(index); setSectionOnDisplay('Details') }} className={`mappedcategories cursor-pointer flex gap-[10px] py-[10px] mt-[10px] rr shadow-sm p-[10px] text-[15px] 
                                        ${index == activeIndex ? 'bg-primary text-white' : 'bg-white'}`}>
                                            <p>{index + 1}.</p>
                                            <p>{items.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        }


                    </div>

                </div>

                <div className="lg:w-[70%] bg-white rr h-full shadow-md shrink-0 p-[20px]">

                    <div className="flex justify-between lg:justify-start lg:gap-[50px] border-b border-gray-300 pb-[10px] font-semibold">
                        {sectionNav.map((items, index) => {

                            return (
                                <div onClick={() => setSectionOnDisplay(items.title)} key={index} className={`mappeddetails cursor-pointer ${items.title == sectionOnDisplay ? 'underline decoration-sec decoration-[3px] underline-offset-[14px]' : ''}`}>
                                    <p>{items.title}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className=" h-[94%] w-full mt-[10px]">



                        {sectionOnDisplay == "Details" ?
                            <div> <DetailsProduct data={activedata} /></div>
                            :

                            sectionOnDisplay == "Edit" ?
                                <div><EditProduct data={activedata} /></div>

                                :
                                sectionOnDisplay == "Delete" ?
                                    <div><DeleteProductComp details={activedata} /></div>
                                    :
                                    <div></div>

                        }

                    </div>

                </div>

            </div>

            {addProduct &&


                <div className="fixed h-screen w-screen bg-black/25 top-0 left-0 z-20 flex items-center justify-center">

                    <div className="bg-white w-[90%] lg:w-[400px] h-[600px] overflow-scroll no-scrollbar rr p-[30px] relative">
                        <div className="flex flex-col gap-[5px]">
                            <label className="font-semibold text-neutral-600" htmlFor="">Image</label>
                            <div className="flex gap-[50px]">

                                <div className="overflow-hidden flex items-center justify-center h-[200px] w-[70%] bg-gray-100 rr">
                                    {imgprev !== "" ?
                                        <Image className="h-full w-full object-contain" height={200} width={200} src={imgprev} alt="" /> :
                                        <Image className=" h-[50px]" height={300} width={300} src="/images/noImage.svg" alt="" />}
                                </div>
                                <div className="text-[24px] cursor-pointer bg-white text-neutral-700 border-2 border-neutral-400 rounded-[5px] h-[50px] w-[50px] font-light mb-[10px] flex items-center justify-center">
                                    <input id="imageinput" onChange={fileChange} className="hidden" type="file" accept="image/jpeg, image/png, image/jpg" name="imageinput" />
                                    <label htmlFor="imageinput">
                                        {file !== "none" ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}
                                    </label>

                                </div>
                            </div>
                            <div className="mt-[20px] flex flex-col gap-[15px]">
                                <div className="flex flex-col w-full">
                                    <label className="font-semibold text-neutral-600" htmlFor="">Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className="inputadd" type="text" />


                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="font-semibold text-neutral-600" htmlFor="">Price</label>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} className="inputadd" type="text" />


                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="font-semibold text-neutral-600" htmlFor="">Category</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="inputadd">
                                        <option value="">Select Category</option>
                                        <option value="women">Women</option>
                                        <option value="men">Men</option>
                                        <option value="children">Children</option>
                                    </select>


                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="font-semibold text-neutral-600" htmlFor="">description</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="inputadd" type="text" />


                                </div>
                                <div className="w-[200px] mt-[10px]">

                                    <button onClick={() => handleAddProduct()} className="button2">Submit</button>
                                </div>
                            </div>

                        </div>

                        <button onClick={() => setAddProduct(false)} className="absolute top-[10px] right-[10px] bg-primary text-white h-[30px] w-[30px] rr text-[13px]">
                            <FontAwesomeIcon icon={faX} />
                        </button>

                    </div>

                </div>

            }
        </MainDash>
    );
}

export default ProductsDash;