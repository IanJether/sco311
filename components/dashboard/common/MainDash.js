

'use client'


import { useContext } from "react";
import NavDashComp from "./NavDash";
import { MyContext } from "@/state/context";
import LoaderComp from "../../common/Loader";



function MainDash({children}) {

    const { globalLoading } = useContext(MyContext);

    return (
        <div className='MainDash lg:flex'>

            <div className="w-[260px] shrink-0">
                <NavDashComp />
            </div>

            <div className="w-[100%] bg-gray-100 p-[40px]">
                {children}
            </div>

            {globalLoading && <LoaderComp />}

        </div>
    );
}

export default MainDash;