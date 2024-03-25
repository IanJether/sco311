'use client'

import { addToCart } from "@/functions/addToCart";
import { MyContext } from "@/state/context";
import Image from "next/image";

import Link from "next/link";
import { useContext } from "react";



const ProductDisplay = ({ id, image, name, price }) => {

    const { cartItems, setCartItems } = useContext(MyContext)

    const address = "/" + id

    const handleAddToCart = () => {
        addToCart(id, name, price, 1, image, cartItems, setCartItems)
    }



    return (
        <div className="mappedlist h-[360px] lg:h-[30vw] lg:h-[20vw] w-[41.5vw] lg:w-[15vw] overflow-hidden bg-white ">

            <Link className="h-[80%]" key={id} href={address} >
                <div className="h-[70%] rr overflow-hidden">
                    <Image height={500} width={500} src={image} className="object-cover w-full h-full" />
                </div>
            </Link>
            <div className=" h-[20%] flex flex-col gap-[15px] justify-between px-[3%] py-[4%]">
                <div className="flex text-center flex-col gap-[2px]">
                    <div className="font-semibod text-[13px] text-neutral-600">
                     <Link href={address} >   <p>{name}</p>  </Link>

                    </div>
                    <div className="font-semibold text-[14px]">
                        <p>Ksh {price}.00</p>
                    </div>
                </div>
                <div className="justify-self-end">
                    <button onClick={() => {handleAddToCart()}} className="border border-primary text-primary uppercase rr text-[12px] h-[40px] w-full">Add To Cart </button>
                </div>
            </div>

        </div>




    )
}

export default ProductDisplay