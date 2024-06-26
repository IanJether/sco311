'use client'

import { navbarList } from "@/data/navbarList";
import { MyContext } from "@/state/context";
import { faBars, faCartShopping, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import LoaderComp from "./Loader";
import { auth } from "@/db/config";
import { signOut } from "firebase/auth";


function Navbar() {

    const [nav, setNav] = useState(false)

    const { cartItems, setCartItems, globalLoading } = useContext(MyContext)

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, []);

    const Pathname = usePathname()

    if (Pathname.startsWith('/dashboard') == true) {
        return null;
    }

    const user = auth.currentUser



    const handleSignOut = () => {
        signOut(auth).then(() => {
            alert("Signed Out")
            window.location.reload()
        })
    }







    return (
        <div className='Navbar z-50 fixed top-0 left-0 w-full h-[60px] shadow-sm flex pad justify-between items-center bg-white'>
            <div className="font-semibold text-orange-700 text-[20px]">
                <Link href="/"> SCO 311 </Link>
            </div>
            <div className="hidden lg:flex">
                <ul className="flex gap-[40px] font-semibold capitalize">

                    {navbarList.map((items, index) => {

                        return (
                            <li key={index} className="mapped">
                                <Link href={items.link}>
                                    {items.name}
                                </Link>
                            </li>
                        )
                    })}

                    {user ?
                        <li className="cursor-pointer" onClick={() => handleSignOut()}>
                            Sign Out
                        </li>
                        :
                        <Link href="/signin"> <li>
                            Sign in
                        </li> </Link>
                    }



                </ul>

            </div>
            <div className="flex gap-[5px] text-[20px]">
                <Link className="w-[50px]" href='/cart'>  <span className=""><FontAwesomeIcon icon={faCartShopping} /></span> {cartItems.length == 0 ? '' : cartItems.length} </Link>
                <span className="lg:hidden w-[20px]" onClick={() => setNav(!nav)}><FontAwesomeIcon icon={nav ? faX : faBars} /></span>
            </div>

            {nav &&

                <div className="absolute pad py-[20px] w-full top-[60px] left-0 h-[120px] bg-neutral-700 shadow-md">
                    <ul onClick={()=>setNav(!nav)} className="flex flex-col gap-[15px] text-[17px] capitalize font-semibold text-primary">
                        {navbarList.map((items, index) => {

                            return (
                                <li key={index}>
                                    <Link href={items.link}>
                                        {items.name}
                                    </Link>
                                </li>
                            )
                        })}

                        {user ?
                            <li className="cursor-pointer" onClick={() => handleSignOut()}>
                                Sign Out
                            </li>
                            :
                            <Link href="/signin"> <li>
                                Sign in
                            </li> </Link>
                        }


                    </ul>

                </div>

            }

            {globalLoading && <LoaderComp />}


        </div>
    );
}

export default Navbar;