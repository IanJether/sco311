
import LoaderComp from "@/components/common/Loader";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";



function DetailsProduct({ data }) {


    if (!data) return (
        <main>
            <LoaderComp />
        </main>
    )


    return (
        <div className='DetailsProduct flex flex-col gap-[20px] items-center h-full w-full  py-[10px]'>
            <div className="h-[200px] lg:h-[250px] w-full">
                <Image height={500} width={600} className="h-full rr w-full object-contain" src={data.imageURL} alt="" />
            </div>
            <div className="w-full p-[15px] lg:p-[15px] flex flex-col items-center border border-neutral-300 rr">
                <div className="flex w-[70%] w-full lg: text-[14px] justify-between py-[9px] border-b border-neutral-300">
                    <h3 className="text-neutral-600 font-semibold">Name</h3>
                    <p className="">{data.name}</p>
                </div>
                <div className="flex w-[70%] w-full text-[14px] justify-between py-[9px] border-b border-neutral-300">
                    <h3 className="text-neutral-600 font-semibold">Price</h3>
                    <p>{data.price}</p>
                </div>
                <div className="flex w-[70%] w-full text-[14px] justify-between py-[9px] border-b border-neutral-300">
                    <h3 className="text-neutral-600 font-semibold">Category</h3>
                    <p>{data.category}</p>
                </div>
                
                <div className="flex flex-col gap-[15px] w-[70%] w-full text-[14px] justify-between py-[5px] ">
                    <h3 className="text-neutral-600 font-semibold">Description</h3>
                    <p className="text-neutral-600">{data.description} </p>
                </div>
            </div>

        </div>
    );
}

export default DetailsProduct;