'use client'

import { productList } from "@/data/productList";
import { MyContext } from "@/state/context";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";




const Cart = () => {


    const router = useRouter();
    const { cartItems, setCartItems } = useContext(MyContext)

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, [])

    const clearCart = () => {
        const emptyCart = []
        setCartItems(emptyCart)
        localStorage.setItem('cart', JSON.stringify(emptyCart));
    }

    const handleIncreaseQuantity = (itemIndex) => {

        const updatedCartItems = [...cartItems];


        updatedCartItems[itemIndex].quantity++;

        setCartItems(updatedCartItems);

        localStorage.setItem('cart', JSON.stringify(updatedCartItems));


    }

    const handleDecreaseQuantity = (itemIndex) => {

        const updatedCartItems = [...cartItems];


        if (updatedCartItems[itemIndex].quantity > 1) {
            updatedCartItems[itemIndex].quantity--;

            setCartItems(updatedCartItems);

            localStorage.setItem('cart', JSON.stringify(updatedCartItems));


        }
    }

    const handleRemoveItem = (itemIndex) => {

        const updatedCartItems = [...cartItems];


        updatedCartItems.splice(itemIndex, 1);

        setCartItems(updatedCartItems);

        localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    }

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);




    return (
        <div className='Cart topmargin pad'>



            <div className="py-[20px] lg:mt-[60px] uppercase text-neutral-700 text-[23px]">
                <div onClick={() => router.back()} className=" uppercase cursor-pointer  text-[13px] text-neutral-600">
                    <p>Back</p>
                </div>
                <div>
                    <h3>Shopping Cart</h3>

                </div>

            </div>

            <div className="flex flex-col gap-[5px]">
                {cartItems.map((items, index) => {

                    return (
                        <div key={index} className="mappedcart py-[20px] h-[110px] border-b border-neutral-300 flex gap-[10px] justify-between">
                            <div className="w-[19%] lg:w-[7%] bg-gray-200 rr overflow-hidden">
                                <Image className="h-full w-full object-cover" height={300} width={300} src={items.imageURL} />
                            </div>
                            <div className="w-[79%] lg:w-[93%] flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div className="uppercase w-[85%] text-[14px] text-neutral-700">
                                        <p>{items.name}</p>
                                    </div>
                                    <div onClick={()=>handleRemoveItem(index)} className="text-[11px] cursor-pointer flex justify-end w-[15%] text-neutral-600">
                                        <FontAwesomeIcon icon={faX} />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-[10px] text-[20px]">
                                        <div className="cursor-pointer" onClick={()=>handleDecreaseQuantity(index)}>-</div>
                                        <div>{items.quantity}</div>
                                        <div className="cursor-pointer" onClick={()=>handleIncreaseQuantity(index)}>+</div>

                                    </div>
                                    <div>
                                        <p>Ksh {items.price * items.quantity}.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="py-[20px] flex justify-between">
                <div>
                    <p>Subtotal</p>
                </div>
                <div className="font-semibold text-neutral-800">
                    <p>Ksh {totalPrice}</p>
                </div>
            </div>

            <div className="py-[20px] lg:mb-[50px] flex flex-col lg:flex-row lg:w-full gap-[20px]">
                <div className="lg:w-full">
                    <Link href="/checkout"> <button className="button1">Checkout</button> </Link>
                </div>
                <div className="lg:w-full" >
                    <Link href="/available"> <button className="button1">Continue shopping</button> </Link>
                </div>
                <div  className="lg:w-full">
                  <button onClick={()=>clearCart()} className="button1">Clear cart</button> 
                </div>

            </div>

        </div>
    )
}
export default Cart;