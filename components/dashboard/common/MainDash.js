

'use client'


import { useContext, useState } from "react";
import NavDashComp from "./NavDash";
import { MyContext } from "@/state/context";
import LoaderComp from "../../common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { dashboardList } from "@/data/dashboardList";
import Link from "next/link";



function MainDash({ children }) {

    const { globalLoading } = useContext(MyContext);
    const [menu, setMenu] = useState(false)

    return (
        <div className='MainDash lg:flex'>

            <div className="w-[260px] shrink-0">
                <NavDashComp />
            </div>

            <div className="lg:hidden bg-white h-[50px] shadow-md pad flex justify-between items-center relative">
                <div className="font-semibold text-orange-700">SCO11</div>
                <div onClick={() => setMenu(!menu)} className="text-[17px]"><span><FontAwesomeIcon icon={faBars} /></span></div>

                {menu &&

                    <div className="absolute pad py-[20px] w-full top-[50px] left-0 h-[120px] bg-neutral-700 shadow-md">
                        <ul className="flex flex-col gap-[15px] text-[17px] capitalize font-semibold text-primary">
                            {dashboardList.map((items, index) => {

                                return (
                                    <li key={index}>
                                        <Link href={items.link}>
                                            {items.name}
                                        </Link>
                                    </li>
                                )
                            })}

                            <p>Sign Out</p>

                        </ul>

                    </div>

                }


            </div>

            <div className="w-[100%] bg-gray-100 p-[20px] lg:p-[40px]">

                {children}
            </div>

            {globalLoading && <LoaderComp />}

        </div>
    );
}

export default MainDash;