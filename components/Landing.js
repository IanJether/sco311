import Link from "next/link";
import Navbar from "./common/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { productList } from "@/data/productList";
import ProductDisplay from "./common/ProductDisplay";


function Landing() {
    return (
        <div className='Landing'>

           

            {/* section one  */}

            <div className="sectionone  pad py-[30px] rounded-[6px]">

                <div className="rr overflow-hidden shadow-md">
                    <div className="bg-plight h-[200px] flex">

                        <div className="w-[50%] flex flex-col pl-[3%] justify-between py-[4%]">
                            <div>
                                <button className="bg-white h-[23px] w-[68px] text-[8px] font-semibold rounded-full uppercase">Affordable</button>
                            </div>
                            <div className="">
                                <h2 className="font-semibold text-[12px]">Thrifted</h2>
                                <h1 className="font-semibold text-[26px]">Tote Bags</h1>
                                <h2 className="text-[14px] font-semibold text-neutral-600">You'll Love Forever</h2>
                            </div>

                            <div className="font-semibold text-[11px] ">
                                <Link href="/available"> <h3>Shop Now <span className="text-primary text-[15px]"> <FontAwesomeIcon icon={faAngleRight} /></span></h3> </Link>
                            </div>

                        </div>
                        <div className="w-[50%]  py-[4%]">
                            {/* <DisplaySlide/> */}
                        </div>

                    </div>
                    <div className="flex h-[150px]">
                        <div className="bg-tet2 w-[50%]">
                            <div className="h-[70%] flex justify-center items-center">
                                <Image className="h-[70%] w-full object-contain" height={600} width={600} src="/images/clock.png" />
                            </div>
                            <div className="h-[30%] text-center text-[13px] ">
                                <h2>Immediate Pick-up</h2>
                            </div>

                        </div>
                        <div className="bg-tet w-[50%]">
                            <div className="h-[70%] flex justify-center items-center">
                                <Image className="h-[65%] w-full object-contain" height={600} width={600} src="/images/trophy.png" />
                            </div>
                            <div className="h-[30%] text-center text-[13px] ">
                                <h2>Great Quality</h2>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* section two  */}

            <div className="flex justify-between pt-[10px] pad pb-[25px]">
                <div className="text-[18px] ">
                    <h3>Available Bags</h3>
                </div>
                <div className="text-[15px]">
                   <Link href="/available"> <h3>View All Bags <span className="text-primary"><FontAwesomeIcon icon={faArrowRight} /></span></h3> </Link>
                </div>
            </div>
            <div className="sectiontwo pb-[50px] flex flex-wrap pad gap-[20px] mx-auto">
                {productList.map((items, index) => {

                    return (
                        <div key={items.id}>
                            <ProductDisplay id={items.id} image={items.image} name={items.name} price={items.price} />
                        </div>


                    )

                })}



            </div>


        </div>
    );
}

export default Landing;