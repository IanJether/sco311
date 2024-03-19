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
        <div className="mappedlist h-[300px] w-[41.5vw] overflow-hidden bg-white ">

            <Link key={id} href={address} >
                <div className="h-[60%] rr overflow-hidden">
                    <Image priority height={500} width={500} src={image} className="object-cover w-full h-full" />
                </div>
            </Link>
            <div className="h-[40%] flex flex-col justify-between px-[3%] py-[4%]">
                <div className="flex text-center flex-col gap-[2px]">
                    <div className="font-semibod text-[13px] text-neutral-600">
                        <p>{name}</p>

                    </div>
                    <div className="font-semibold text-[14px]">
                        <p>Ksh {price}.00</p>
                    </div>
                </div>
                <div className="justify-self-end">
                    <button onClick={() => handleAddToCart()} className="border border-primary text-primary uppercase rr text-[12px] h-[40px] w-full">Add To Cart </button>
                </div>
            </div>

        </div>




    )
}

export default ProductDisplay