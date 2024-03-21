'use client'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { dashboardList } from "@/data/dashboardList";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { auth } from "@/db/config";
import { signOut } from "firebase/auth";



function NavDashComp() {

  const router = useRouter()

  const pathname = usePathname();

  const handleSignOut = ()=>{
    signOut(auth).then(()=>{
        alert("Signed Out")
        router.push('/')
    })
}



  return (
    <div className='NavDashComp hidden lg:block bg-white shadow-md relative z-20 lg:w-full bg-blac lg:h-[100vh]'>

      <div className=" w-full h-[130px] flex items-center justify-center font-semibold text-[20px] text-primary">
        {/* <Link href="/"> <Image className="h-[100px] w-[110px] object-contain " height={2000} width={2000} src="/images/logoone.png" alt="" /> </Link> */}
        SCO311
      </div>
      <div className="flex flex-col items-cente px-[10px] mt-[40px] gap-[15px]">
        {dashboardList.map((items, index) => {



          return (
            <Link href={items.link} >   <div className={`mappednavDash flex h-[40px] items-center gap-[5px]
            ${pathname.startsWith(items.link) ? 'bg-orange-100  rr text-primary shadow-md' : ''}  
            flex transition ease-in-out duration-500`}>

              <FontAwesomeIcon className="w-[35px] h-[35px] shrink-0 text-[16px]" icon={items.icon} />

              <h2 onClick={items.function} className="capitalize w-[70px] font-semibo ">{items.name}</h2>

            </div> </Link>
          )
        })}

        <div className="flex h-[40px] items-center gap-[5px]">

          <FontAwesomeIcon className="w-[35px] h-[35px] shrink-0 text-[16px]" icon={faSignOut} />

          <h2 onClick={()=>handleSignOut()} className="capitalize w-[70px] font-semibo cursor-pointer">Sign Out</h2>

        </div>



      </div>

      


    </div>
  );
}

export default NavDashComp;