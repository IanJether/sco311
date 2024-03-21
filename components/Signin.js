'use client'

import { auth } from "@/db/config";
import { MyContext } from "@/state/context";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";



function SigninComp() {


  const router = useRouter()

  const { setGlobalLoading } = useContext(MyContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const submitUser = () => {

    if (username == '' || password == '') {
      alert('')
    } else {

      setGlobalLoading(true)

      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          setGlobalLoading(false)

          alert('You have signed in')

          if (username === 'admin001@gmail.com') {

            router.push('/dashboard/products')
          } else {
            router.back()
          }


        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setGlobalLoading(false)

          alert(errorMessage)
        });

    }

  }


  return (
    <div className='SigninComp h-[93vh] relative topmargin'>

      <Image className="h-full w-full object-cover filter brightness-[50%]" height={1500} width={1500} src="/images/rug.jpg" alt="" />

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">


        <div className="w-[75%] lg:w-[340px] h-[320px] border border-neutral-500 rr backdrop-blur-[7px] p-[20px]">

          <div>
            <label className="labelsignin" htmlFor="">Email</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="inputsignin" />
          </div>
          <div className="mt-[10px]">
            <label className="labelsignin" htmlFor="">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="inputsignin" />
          </div>
          <p className="mt-[10px] text-center text-primary hover:underline">Forgot Password</p>
          <div className="flex gap-[10px] items-center">

            <button onClick={() => submitUser()} className="button2 mt-[20px]">Signin</button>
            <Link className="w-full" href="/signup"> <button className="button1 mt-[20px]">Sign Up</button>  </Link>

          </div>
        </div>

      </div>

    </div>
  );
}

export default SigninComp;