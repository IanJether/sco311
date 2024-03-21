'use client'


import { getLink } from "@/data/getLink";
import { navbarList } from "@/data/navbarList";

import { socialLinks } from "@/data/socialsLink";
import { faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {

    const pathname = usePathname();

    if(pathname.startsWith("/dashboard"))
        return (
            <div>
                
            </div>
        )

        const Pathname = usePathname()
    
        if ( pathname == '/checkout' ||  Pathname.startsWith('/dashboard') == true) {
            return null;
        }
    

  return (
  
    <div className='Footer'>
    <div className='Footer flex flex-col gap-[10px] pt-[40px] lg:pt-[100px] bg-neutral-800 text-white'>
        <div className="footertop pad flex flex-col lg:flex-row gap-[30px] pb-[30px] lg:pb-[80px]">

            <div className="footer1 overflow-hidden cursor-pointer flex flex-col gap-[10px] lg:gap-[15px] lg:w-[30%]">
                <div className="div flex items-center gap-[5px] mb-[15px] lg:mb-[5px] bg-teal-5 font-semibold text-primary">
                    <Image priority className="h-full w-[90px] object-contain" height={200} width={200} src="/images/logo/logosvg.svg" alt="" />
                    <h1 className="logotext text-[14px] text-[15px] text-sec font-semibold uppercase">SCO 311</h1>
                </div>
                {socialLinks.filter((items, index) => index < 3).map((items, index) => {

                    return (
                        <div key={index} className="mappedsociallinks flex gap-[10px]">
                            <div className="w-[20px] text-orange-500"><FontAwesomeIcon icon={items.icon} /></div>
                            <div className="hover:text-primary1 hover:underline underline-offset-[3px] hover:text-sec2"><p>{items.text}</p></div>
                        </div>
                    )
                })}

            </div>

            <div className="footer2 flex flex-col gap-[20px] lg:w-[20%]">
                <div className="text-[20px] font-semibold"><h3>Other Pages</h3></div>
                <div>
                    <ul className="inline-flex flex-col gap-[5px] lg:gap-[15px] text-stone-200">
                        {navbarList.map((items, index) => {

                            return (

                                <Link key={index} href={items.link}> <li className="hover:text-sec2">{items.name}</li> </Link>

                            )
                        })}
                    </ul>
                </div>

            </div>

            <div className="footer3 flex flex-col gap-[20px] lg:w-[30%]">
                <div className="text-[20px] font-semibold"><h3>Our Categories</h3></div>
                <div>
                    <ul className="inline-flex flex-col gap-[10px] lg:gap-[15px] text-stone-200">
                        {/* {servicesList.map((items, index) => {

                            const address = "/academics/" + getLink(items.name)

                            return (

                                <Link key={index} href={address}> <li className="hover:text-sec2">{items.name}</li> </Link>

                            )
                        })} */}
                           <Link href=""> <li className="hover:text-sec2">Women</li> </Link>
                           <Link href=""> <li className="hover:text-sec2">Men</li> </Link>
                           <Link href=""> <li className="hover:text-sec2">Children</li> </Link>
                    

                    </ul>
                </div>

            </div>

            <div className="footer4 flex flex-col gap-[10px] lg:w-[20%]">
                <div className="text-[20px] font-semibold"><h3>Get The Latest News</h3></div>
                <div className="flex soshobox gap-[20px] lg:gap-[30px] text-[25px] text-orange-500 ">
                    <div className="hover:text-sec cursor-pointer"><FontAwesomeIcon icon={faEnvelope} /></div>
                    <div className="hover:text-sec cursor-pointer"><FontAwesomeIcon icon={faInstagram} /></div>
                    <div className="hover:text-sec cursor-pointer"><FontAwesomeIcon icon={faTwitter} /></div>
                    <div className="hover:text-sec cursor-pointer"><FontAwesomeIcon icon={faLinkedin} /></div>
                </div>
            </div>

        </div>
        {/* <div className="linefooter border-b-[1px] border-gray-400"></div> */}
        <div className="footerbottom text-center text-[14px] py-[40px] bg-neutral-900 flex flex-col lg:flex-row lg:justify-between pad gap-[5px]">
            <div>Copyright &copy; 2024 SCO311 Ltd</div>
           <div>Engineered by Group 5</div>
        </div>

    </div>

</div>
  );
}

export default Footer;