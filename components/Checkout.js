'use client'

import { auth } from "@/db/config";
import getUser from "@/db/fetchUser";
import { handlePostOrder } from "@/db/postOrder";
import { MyContext } from "@/state/context";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import LoaderComp from "./common/Loader";
import { onAuthStateChanged } from "firebase/auth";




const CheckoutComp = () => {

    const { cartItems, setCartItems, setGlobalLoading } = useContext(MyContext)

    const router = useRouter()

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [delivery, setDelivery] = useState("");
    const [user, setUser] = useState(null);
    const { isLoading, userdata } = getUser(user?.uid);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, [])


    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser); // Set or clear the user
        });
    
        return () => unsubscribe(); 
      }, []);

      useEffect(() => {
        
        if (userdata) {
          setName(userdata.name);
          setPhone(userdata.phone);
          setDelivery(userdata.delivery);
          document.querySelector(".outdeldet")?.classList.remove('hidden'); 
        }
      }, [userdata]);

      if (isLoading || !userdata) {
        return <LoaderComp />;
      }
  


   
    // useEffect(() => {


    //     if (user) {
    //         setName(userdata.name)
    //         setPhone(userdata.phone)
    //         setDelivery(userdata.delivery)
    //         document.querySelector(".outdeldet").classList.remove('hidden');
    //     }

    // }, [])


    const contactButton = () => {
        if (name == '' || phone == '') {
            alert('')
        } else {
            document.querySelector(".contactinfo").classList.add('hidden');
            document.querySelector(".deliveryinfo").classList.remove('hidden');
        }
    }

    const deliveryButton = () => {
        if (delivery == '') {
            alert('')
        } else {
            document.querySelector(".paymentinfo").classList.remove('hidden');
            document.querySelector(".deliveryinfo").classList.add('hidden');
        }
    }

    const paymentButton = () => {
        window.scrollTo(0, 0);
        document.querySelector(".paymentinfo").classList.add('hidden');
        document.querySelector(".orderSummary").classList.remove('hidden');

    }

    const cbdPickUp = () => {
        document.querySelector(".cbdpickdet").classList.remove('hidden');
        document.querySelector(".paiddeldet").classList.add('hidden');
        document.querySelector(".outdeldet").classList.add('hidden');
    }

    const paiddel = () => {
        document.querySelector(".cbdpickdet").classList.add('hidden');
        document.querySelector(".paiddeldet").classList.remove('hidden');
        document.querySelector(".outdeldet").classList.add('hidden');

    }

    const outdel = () => {
        document.querySelector(".cbdpickdet").classList.add('hidden');
        document.querySelector(".paiddeldet").classList.add('hidden');
        document.querySelector(".outdeldet").classList.remove('hidden');

    }

    const handleSubmit = () => {
        const emptyCart = []
        setCartItems(emptyCart)
        localStorage.setItem('cart', JSON.stringify(emptyCart));
        handlePostOrder(name, phone, delivery, totalPrice, cartItems, setGlobalLoading, router)
    }

    
   

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  

    return (
        <div className="mt-[80px] lg:mt-[100px] pb-[80px] lg:pb-[80px] lg:flex gap-[50px] pad">
            <div className="lg:w-[50%] h-[460px] border rr shadow-md overflow-scroll no-scrollbar sticky top-[100px] hidden lg:flex">
                <div className="cfive py-[10px] flex flex-col p-[25px]  w-full">
                    <div className="text-[17px] font-semibold mb-[10px]">
                        <h4>Order Summary</h4>
                    </div>

                    {cartItems.map((items) => {

                        return <div className="oss text-sm py-[10px] flex justify-between">
                            <div className="ossleft flex gap-[10px] w-[70%]">
                                <div className="h-[60px] w-[50px] rr bg-gray-100 overflow-hidden">
                                    <Image height={500} width={500} className="h-full w-full object-cover" src={items.imageURL} alt="" />
                                </div>
                                <div className="font-semibold">
                                    <p>{items.name}</p>
                                </div>

                            </div>
                            <div className="ossright flex flex-col justify-between items-end w-[30%]">
                                <div className="font-semibold">
                                    <p>Ksh {items.price}.00</p>
                                </div>
                                <div className="flex gap-[6px]">
                                    <div className="text-[13px] text-neutral-600">
                                        <p>Qty</p>
                                    </div>
                                    <div className="border px-[15px]">
                                        <p>{items.quantity}</p>

                                    </div>
                                </div>

                            </div>

                        </div>
                    })}

                    <div className="text-[14px] h-[45px] shrink-0 flex items-center justify-between border-t mt-[20px]">
                        <div>
                            <p>Delivery</p>
                        </div>
                        <div className="font-semibold">
                            <p>{0.84 * totalPrice}</p>
                        </div>
                    </div>
                    <div className="text-[14px] h-[45px] shrink-0 flex items-center justify-between border-t">
                        <div>
                            <p>VAT</p>
                        </div>
                        <div className="font-semibold">
                            <p>{0.16 * totalPrice}</p>
                        </div>
                    </div>
                    <div className="text-[14px] h-[45px] shrink-0 flex items-center justify-between border-t">
                        <div>
                            <p>Total</p>
                        </div>
                        <div className="font-semibold">
                            <p>{totalPrice}.00</p>
                        </div>
                    </div>
                    {/* <div className="text-[14px] h-[45px] flex items-center justify-between border-t">
                        <div>
                            <p>Status</p>
                        </div>
                        <div className="font-semibold">
                            <p className="text-green-600"> Paid <FontAwesomeIcon icon={faCheck} /> </p>
                        </div>
                    </div> */}



                    <div className="hidden">
                        <Link href="/">  <button className="button2 mt-[15px]">Complete Order</button> </Link>
                    </div>

                </div>

            </div>
            <div className='CheckoutComp  lg:pb-[0] rr overflow-hidden shadow-md lg:w-[50%] '>

                <div className="coone ">
                    <div className="cod">
                        <h4>1. Your Contact Details</h4>
                        <p className="NameViewer"></p>
                        <p className="Phoneviewer"></p>
                        <p className="EmailViewer"></p>
                    </div>
                    <div className="contactinfo px-[7%] py-[30px]">
                        <form action="">

                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="rr w-full border rounded-[3px] h-[40px] text-[16px] p-[7px] outline-none focus:border-primary mb-[7px]" placeholder="Enter Name" />
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="rr w-full border rounded-[3px] h-[40px] text-[16px] p-[7px] outline-none focus:border-primary mb-[7px]" placeholder="Enter Phone Number" />
                            {/* <input type="text" className=" w-full border rounded-[3px] h-[40px] text-[16px] p-[7px] outline-none focus:border-neutral-600 mb-[2px]" placeholder="Enter Email" /> */}
                            <p className="text-[12px] mb-[20px] ml-[4px] text-neutral-600">Reciepts and Notification will come through this Contact info</p>
                            <button type="button" onClick={contactButton} className="button2">Continue</button>
                        </form>

                    </div>

                </div>
                <div className="cotwo">
                    <div className="cod">
                        <h4>2. Delivery</h4>
                    </div>

                    <div className="deliveryinfo px-[7%] py-[30px] hidden">
                        <div className="border rr h-[140px] px-[7%]">
                            <div className="cbdpickupsel py-[10px] border-b">
                                <p> <input type="radio" name="del" onClick={cbdPickUp} /> Store Pick-up  <span className="text-[13px] text-neutral-500"></span></p>
                            </div>
                            <div className="paiddel py-[10px] border-b">
                                <p> <input type="radio" name="del" onClick={paiddel} /> Pickup Mtaani <span className="text-[13px] text-neutral-500"></span></p>
                            </div>
                            <div className="outdel py-[10px]">
                                <p> <input type="radio" name="del" onClick={outdel} /> Countrywide <span className="text-[13px] text-neutral-500"></span></p>
                            </div>
                        </div>

                        <div className="cbdpickdet rr mt-[10px] border px-[7%] py-[17px] text-[14px] hidden">
                            <h4 className="mb-[6px]"> <input onChange={(e) => setDelivery('Star Mall - Pick Up')} type="radio" name="pickup" /> Star Mall, 1st floor, Shop A21</h4>
                            {/* <h4 className="mb-[6px]"> <input type="radio" name="pickup" /> Sasa Mall, 2nd floor block 10</h4>
                        <h4 className="mb-[6px]"> <input type="radio" name="pickup" /> Philadelphia house, 4th floor, suite 121</h4> */}
                        </div>
                        <div className="paiddeldet rr mt-[10px] border px-[7%] py-[20px] hidden">
                            <form action="">
                                <input type="text" value={delivery} onChange={(e) => setDelivery(e.target.value)} className=" w-full h-[40px] rr text-[14px] p-[7px] outline-none focus:border-primary rounded-[3px] border mb-[7px]" placeholder="Enter Place eg Langata" />
                                {/* <input type="text" className=" w-full h-[40px] text-[14px] p-[7px] outline-none focus:border-neutral-600 rounded-[3px] border mb-[7px]" placeholder="Enter Region eg Carnivore" /> */}
                            </form>

                        </div>
                        <div className="outdeldet rr mt-[10px] border px-[7%] py-[20px] hidden">
                            <form action="">
                                <input type="text" value={delivery} onChange={(e) => setDelivery(e.target.value)} className=" w-full h-[40px] rr text-[14px] p-[7px] outline-none focus:border-primary rounded-[3px] border mb-[7px]" placeholder="Enter County" />

                            </form>

                        </div>

                        <button onClick={deliveryButton} className="button2 mt-[15px]">Continue</button>
                    </div>

                </div>
                <div className="cothree">
                    <div className="cod">
                        <h4>3. Payment</h4>
                    </div>

                    <div className=" paymentinfo hidden py-[40px] px-[7%]">
                        <div className="border rr text-[14px] flex flex-col">
                            <div className="px-[7%]">
                                <Image height={500} width={500} className="mx-auto object-contain h-[70px]" src="/images/mpesa.png" alt="" />
                            </div>
                            <div className="px-[7%] h-[40px] flex items-center justify-between border-t">
                                <div>
                                    <p>Items </p>
                                </div>
                                <div className="font-semibold">
                                    <p>{Math.round(0.84 * totalPrice)}</p>
                                </div>

                            </div>
                            <div className="px-[7%] h-[40px] flex items-center justify-between border-t">
                                <div>
                                    <p>VAT </p>
                                </div>
                                <div className="font-semibold">
                                    <p>{Math.round(0.16 * totalPrice)}</p>
                                </div>

                            </div>
                            <div className="px-[7%] h-[40px] flex items-center justify-between border-t">
                                <div>
                                    <p>Delivery</p>
                                </div>
                                <div className="font-semibold">
                                    <p>0.00</p>
                                </div>

                            </div>
                            <div className="px-[7%] h-[40px] flex  items-center justify-between border-t">
                                <div>
                                    <p>Total</p>
                                </div>
                                <div className="font-semibold">
                                    <p>{totalPrice}</p>
                                </div>

                            </div>
                            <div className="px-[7%] border-t py-[20px]">
                                <p className="text-[13px] mb-[5px]">For Mpesa Prompt on Mobile</p>
                                <input className="w-full h-[40px] text-[14px] p-[7px] rr outline-none focus:border-primary rounded-[3px] border mb-[7px]"
                                    type="text"
                                    placeholder="Enter Mpesa Number"
                                />
                                <button className="bg-green-600 text-white text-[15px] w-full h-[45px] rr mt-[5px] mb-[10px]">Request Payment</button>

                                <p className="text-center font-semibold text-green-600 mb-[15px] mt-[15px]">OR</p>

                                <p className="text-center">Pay <span className="font-semibold text-[17px]">Ksh {totalPrice}.00 </span> To <span className="text-green-600 font-semibold"> TILL NO <span className="text-[18px]"> 653789 </span></span></p>

                                <button onClick={paymentButton} className="bg-primary text-white text-[15px] w-full h-[45px] rr mt-[30px]">Continue</button>


                            </div>
                        </div>

                    </div>

                </div>
                <div className="cofour">
                    <div className="cod">
                        <h4>4. Review</h4>
                    </div>

                </div>
                <div className="cfive orderSummary px-[7%] py-[10px] flex flex-col hidden">
                    <div className="text-[17px] font-semibold mb-[10px]">
                        <h4>Order Summary</h4>
                    </div>

                    {cartItems.map((items) => {

                        return <div className="oss text-sm py-[10px] flex justify-between">
                            <div className="ossleft flex gap-[10px] w-[70%]">
                                <div className="h-[60px] w-[50px] rr bg-gray-100 overflow-hidden">
                                    <Image height={500} width={500} className="h-full w-full object-cover" src={items.imageURL} alt="" />
                                </div>
                                <div className="font-semibold">
                                    <p>{items.name}</p>
                                </div>

                            </div>
                            <div className="ossright flex flex-col justify-between items-end w-[30%]">
                                <div className="font-semibold">
                                    <p>Ksh {items.price}.00</p>
                                </div>
                                <div className="flex gap-[6px]">
                                    <div className="text-[13px] text-neutral-600">
                                        <p>Qty</p>
                                    </div>
                                    <div className="border px-[15px]">
                                        <p>{items.quantity}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    })}

                    <div className="text-[14px] h-[45px] shrink-0 flex items-center justify-between border-t mt-[20px]">
                        <div>
                            <p>Delivery</p>
                        </div>
                        <div className="font-semibold">
                            <p>{0.84 * totalPrice}</p>
                        </div>
                    </div>
                    <div className="text-[14px] h-[45px] shrink-0 flex items-center justify-between border-t">
                        <div>
                            <p>VAT</p>
                        </div>
                        <div className="font-semibold">
                            <p>{0.16 * totalPrice}</p>
                        </div>
                    </div>
                    <div className="text-[14px] h-[45px] shrink-0 flex items-center justify-between border-t">
                        <div>
                            <p>Total</p>
                        </div>
                        <div className="font-semibold">
                            <p>{totalPrice}.00</p>
                        </div>
                    </div>




                    <div>
                        <button onClick={() => handleSubmit()} className="button2 mt-[15px]">Complete Order</button>
                    </div>

                </div>

                <div className="border-t border-neutral-400 flex justify-between font-semibold px-[7%] py-[15px] bg-white fixed left-0 bottom-px mb-[-2px] w-screen ">
                    <div>
                        <p>Total</p>
                    </div>
                    <div>
                        <p>Ksh {totalPrice}.00</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CheckoutComp;