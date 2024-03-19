'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainDash from "./common/MainDash";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { productList } from "@/data/productList";
import { useState } from "react";


function CategoriesDash() {


    const [activeIndex, setActiveIndex] = useState(0)

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

    return (
        <MainDash>
            <div className='CategoriesDash h-full flex gap-[20px]'>

                <div className="w-[30%] shrink-0">

                    <div className="h-[24vh] rr shadow-md bg-white p-[20px] flex flex-col justify-between">
                        <span className="text-[27px] self-end"><FontAwesomeIcon icon={faPlusCircle} /></span>
                        <div>
                            <h3 className="capitalize font-semibold text-[20px]">All Categories</h3>
                            <input className="border border-neutral-400 outline-none focus:border-primary rr h-[45px] w-full p-[10px] text-[12px] mt-[10px]" type="text" placeholder="Search Categories" />
                        </div>

                    </div>

                    <div className="h-[60vh] mt-[30px] no-scrollbar overflow-scroll">
                        {productList.map((items, index) => {


                            return (
                                <div className={`mappedcategories flex gap-[10px] py-[10px] mt-[10px] rr shadow-sm p-[10px] text-[15px] bg-white
                                ${index == activeIndex ? 'bg-primary text-white' : ''}`}>
                                    <p>{index + 1}.</p>
                                    <p>{items.name}</p>
                                </div>
                            )
                        })}

                    </div>

                </div>

                <div className="w-[70%] bg-white rr h-full shadow-md shrink-0">
                    {sectionOnDisplay == "Details" ?
                        <div> <DetailsProduct data={activedata} /></div>
                        :
                        sectionOnDisplay == "Orders" ?
                            <div><OrdersProduct details={activedata} /></div>

                            :
                            sectionOnDisplay == "Edit" ?
                                <div><EditProduct details={activedata} /></div>

                                :
                                sectionOnDisplay == "Delete" ?
                                    <div><DeleteProductComp details={activedata} /></div>
                                    :
                                    <div></div>

                    }

                </div>

            </div>
        </MainDash>
    );
}

export default CategoriesDash;