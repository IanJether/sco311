'use client'

import { navbarList } from "@/data/navbarList";
import { MyContext } from "@/state/context";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";


function Navbar() {

    const [nav,setNav] = useState(false)

    const { cartItems,setCartItems } = useContext(MyContext)

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
          setCartItems(storedCart);
        }
      }, []);

      const Pathname = usePathname()
    
      if (Pathname === '/signin' || Pathname === '/signup' || Pathname.startsWith('/dashboard') == true) {
          return null;
      }
  
    



    return (
        <div className='Navbar z-50 fixed top-0 left-0 w-full h-[60px] shadow-sm flex pad justify-between items-center bg-white'>
            <div className="font-semibold text-orange-700 text-[20px]">
              <Link href="/"> SCO 311 </Link>
            </div>
            <div className="flex gap-[5px] text-[20px]">
                <Link className="w-[50px]" href='/cart'>  <span className=""><FontAwesomeIcon icon={faCartShopping} /></span> {cartItems.length == 0 ? '' : cartItems.length} </Link>
                <span onClick={()=>setNav(!nav)}><FontAwesomeIcon icon={faBars} /></span>
            </div>

            {nav &&

            <div className="absolute pad py-[20px] w-full top-[60px] left-0 h-[250px] bg-neutral-700 shadow-md">
                <ul className="flex flex-col gap-[15px] text-[17px] capitalize font-semibold text-primary">
                    {navbarList.map((items, index) => {

                        return (
                            <li key={index}>
                                <Link href={items.link}>
                                    {items.name}
                                </Link>
                            </li>
                        )
                    })}

                </ul>

            </div>

}

        </div>
    );
}

export default Navbar;