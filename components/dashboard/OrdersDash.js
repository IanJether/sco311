

'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainDash from "./common/MainDash";
import { faEnvelope, faLocation, faLocationPin, faPhone, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoaderComp from "../common/Loader";
import getOrders from "@/db/fetchOrders";
import Image from "next/image";


function OrdersDash() {

    const { isLoading, data } = getOrders();

    const [activeIndex, setActiveIndex] = useState(0)

    const activedata = data.find((items, index) => index == activeIndex)



    if(isLoading)return(
        <div>
            <MainDash>
                <LoaderComp/>
            </MainDash>
        </div>
    )

    return (
        <MainDash>
            <div className=' lg:h-full flex flex-col lg:flex-row gap-[20px]'>

                <div className="lg:w-[30%] shrink-0">

                    <div className="h-[190px] rr shadow-md bg-white p-[20px] flex flex-col justify-between">
                        <span></span>
                        <div>
                            <h3 className="capitalize font-semibold text-[20px]">All Orders </h3>
                            <input className="border border-neutral-400 outline-none focus:border-primary rr h-[45px] w-full p-[10px] text-[12px] mt-[10px]" type="text" placeholder="Search Orders" />
                        </div>

                    </div>

                    <div className="h-[170px] lg:h-[59vh] mt-[30px] no-scrollbar overflow-scroll">
                        {isLoading ?
                            <LoaderComp />
                            :
                            <div>
                                {data.map((items, index) => {


                                    return (
                                        <div onClick={() => { setActiveIndex(index) }} className={`mappedcategories cursor-pointer flex gap-[10px] py-[10px] mt-[10px] rr shadow-sm p-[10px] text-[15px] 
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

                <div className="lg:w-[70%] overflow-scroll  no-scrollbar bg-white rr h-[88vh] shadow-md shrink-0 p-[20px]">

                  

                      
                            <div className="bg-white w-full mb-[20px] border rr shadow-md">
                                <div className="bg-stone-50 px-[10px] shadow-md text-center font-semibold flex items-center h-[50px]">
                                    <div className="w-[30%]"><h4>Product</h4></div>
                                    <div className="w-[30%]"><h4>Name</h4></div>
                                    <div className="w-[15%]"><h4>Qty</h4></div>
                                    <div className="w-[25%]"><h4>Total</h4></div>
                                </div>
                                <div className="px-[2%] py-[20px] flex flex-col gap-[10px]">
                                    {activedata &&
                                        <div className="flex flex-col gap-[10px]">
                                            {activedata.items.map((items, index) => {

                                                return (
                                                    <div key={index} className="mappedorderdetals text-[12px]  flex text-center items-center">
                                                        <div className="w-[30%] h-[100px] flex items-center justify-center">
                                                            <div className="h-full w-full lg:w-[100px] rr overflow-hidden">
                                                                <Image className="w-full h-full object-cover" height={300} width={300} src={items.imageURL} alt="" />
                                                            </div>


                                                        </div>
                                                        <div className="w-[30%] text-[12px] font-semibold"><h4>{items.name}</h4></div>
                                                        <div className="w-[15%] font-semibold"><h4>{items.quantity}</h4></div>
                                                        <div className="w-[25%] text-green-600"><h4>{items.price * items.quantity}</h4></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                                <div className="px-[2%] pb-[25px] font-semibold flex flex-col gap-[10px] items-end">
                                    {/* <div className="flex gap-[15px]">
                            <div className="text-[14px] font-semibold"><p>Subtotal:</p></div>
                            <div className="w-[64px]"><p>{od.}</p></div>
                        </div> */}

                                    <div className="flex gap-[15px]">
                                        <div className="text-[14px] font-semibold"><p>Delivery:</p></div>
                                        <div className="w-[64px]"><p>0.00</p></div>
                                    </div>
                                    <div className="flex gap-[15px]">
                                        <div className="text-[14px] font-semibold"><p>Total:</p></div>
                                        <div className="w-[64px]"><p>{activedata.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</p></div>
                                    </div>

                                    {/* <p>Subtotal: <span>1,200</span></p>
                        <p>VAT: <span>250</span></p>
                        <p>Shipping: <span>100</span></p>
                        <p>Discount: <span>50</span></p>
                        <p>Total: <span>1,500</span></p> */}
                                </div>

                            </div>

                            <div className="contactinformation mt-[30px] flex flex-col gap-[15px] bg-white shadow-md border rr p-[15px] lg:w-[20vw] text-neutral-700 font-semibold text-[15px]">
                                <div className="text-[18px] font-semibold text-black"><h2>Customer details</h2></div>
                                <div><p>{activedata.name}</p></div>
                                <div className="flex items-center gap-[10px]">
                                    <div className="w-[20px] text-[16px]"><FontAwesomeIcon icon={faLocationPin} /></div>
                                    <div className="mt-[-3px]"><p>{activedata.delivery}</p></div>
                                </div>
                                <div className="flex items-center gap-[10px] mt-[-5px]">
                                    <div className="w-[20px] text-[16px]"><FontAwesomeIcon icon={faPhone} /></div>
                                    <div className="mt-[-3px]"><p>{activedata.phone}</p></div>
                                </div>


                            </div>
                        </div>
                        
                        
                    

                 

            

            </div>


        </MainDash>
    );
}

export default OrdersDash;