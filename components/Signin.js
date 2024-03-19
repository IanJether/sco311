import Image from "next/image";
import Link from "next/link";



function SigninComp() {
  return (
    <div className='SigninComp bg-teal-500 h-[90vh] relative'>

      <Image className="h-full w-full object-cover filter brightness-[50%]" height={1500} width={1500} src="/images/rug.jpg" alt="" />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">


        <div className="w-[75%] h-[320px] border border-neutral-500 rr backdrop-blur-[7px] p-[20px]">

          <div>
            <label className="labelsignin" htmlFor="">Username</label>
            <input type="text" className="inputsignin" />
          </div>
          <div className="mt-[10px]">
            <label className="labelsignin" htmlFor="">Password</label>
            <input type="password" className="inputsignin" />
          </div>
          <p className="mt-[10px] text-center text-primary hover:underline">Forgot Password</p>
          <div className="flex gap-[10px] items-center">

            <Link className="w-full" href="/dashboard"> <button className="button2 mt-[20px]">Signin</button> </Link>
            <button className="button1 mt-[20px]">Sign Up</button>

          </div>
        </div>

      </div>

    </div>
  );
}

export default SigninComp;