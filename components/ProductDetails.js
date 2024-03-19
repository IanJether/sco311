'use client'

import { productList } from "@/data/productList";
import getData from "@/db/fetchProducts";
import { addToCart } from "@/functions/addToCart";
import { MyContext } from "@/state/context";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import LoaderComp from "./common/Loader";



function ProductDetails() {

    const { cartItems, setCartItems } = useContext(MyContext)

    const params = useParams()

    const { isLoading, data } = getData();

    const productDetails = data.find((items,index)=>items.id == params.id)

    const reduceQuantity = () => {
        if (quantity == 1) {

        } else {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        addToCart(productDetails.id, productDetails.name, productDetails.price, quantity, productDetails.imageURL, cartItems, setCartItems)
    }


    const [quantity, setQuantity] = useState(1);

    if(isLoading){
        return(
            <LoaderComp/>
        )
    }


    return (
        <div className='ProductDetails topmargin'>

            <div className="sectionone relative flex flex-col lg:flex-row lg:items-center gap-[20px] pad py-[30px] navmt">
                <div data-aos="fade-right" data-aos-duration="500" className="flex items-center justify-center h-[370px] lg:h-[60vh] lg:w-[50%] rr bg-[#efefef]">
                    <Image className=" w-full h-full rr  object-cover" height={500} width={500} src={productDetails.imageURL} alt="" />
                </div>
                <div data-aos-duration="500" className="flex flex-col gap-[10px] lg:w-[50%]">
                    <div className="text-[27px] text-neutral-500"><h2>{productDetails.name}</h2></div>
                    <div className="text-[18px]"><p>ksh {productDetails.price}.00</p></div>
                    <div className="flex items-center gap-[25px] my-[20px]">
                        <div className="cursor-pointer" onClick={reduceQuantity}><FontAwesomeIcon icon={faMinus} /></div>
                        <div className="h-[50px] flex items-center justify-center w-[50px] rr border border-gray-400">{quantity}</div>
                        <div className="cursor-pointer" onClick={() => setQuantity(quantity + 1)}><FontAwesomeIcon icon={faPlus} /></div>
                    </div>
                  
                    <div className="flex gap-[10px] ">
                        <button onClick={() => handleAddToCart()} className="button1">Add to Cart</button>
                        <button onClick={() =>  {handleAddToCart(); router.push('/checkout') }} className="button1">Buy now</button>
                    </div>
                    <div className="py-[15px] text-[15px] flex flex-col gap-[10px] text-neutral-600">
                        <p>{productDetails.description}</p>
                    </div>


                </div>
            </div>

        </div>
    );
}

export default ProductDetails;