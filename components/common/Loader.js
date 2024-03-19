import Image from "next/image";


function LoaderComp() {
    return (

        <div className="loaderdiv fixed top-0 left-0 w-screen h-screen bg-black/25 z-50 flex items-center justify-center">

            <Image className='h-[100px] w-[100px]' height={500} width={500} priority src="/images/loader.gif" alt='' />

        </div>
    );
}

export default LoaderComp;